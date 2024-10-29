const WebSocket = require('ws');
const kafkaProducer = require('./kafkaProducer');
const kafkaConsumer = require('./kafkaConsumer');
const { batchSaveChanges } = require('./mongoDbOperations');

function runSocket() {
    const wss = new WebSocket.Server({ port: 8080 });
    let documentChanges = {};

    // WebSocket connection
    wss.on('connection', (ws) => {
        console.log('Socket connected on port: 8080');
        ws.on('message', (message) => {
            const { documentId, change, userId } = JSON.parse(message);

            // Produce the change to Kafka
            kafkaProducer.produce('document-updates', documentId, {documentId, change, userId });

            // Broadcast locally (Optional)
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ documentId, change, userId }));
                }
            });
        });
    });

    // Kafka Consumer
    kafkaConsumer.consume((message) => {
        const { documentId, change, userId } = JSON.parse(message.value.toString());

        // Store change in memory for batch saving
        if (!documentChanges[documentId]) {
            documentChanges[documentId] = [];
        }
        documentChanges[documentId].push(change);
    });

    // Periodically save document changes to MongoDB every 5 seconds
    setInterval(() => {
        if (Object.keys(documentChanges).length > 0) {
            batchSaveChanges(documentChanges);
            documentChanges = {};
        }
        // Reset the changes after saving
    }, 5000);
}

module.exports = runSocket;
