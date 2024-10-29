const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'doc-collaboration', brokers: [process.env.KAFKA_BROKER] });
const producer = kafka.producer();

const produce = async (topic, documentId, message) => {
    await producer.connect();
    await producer.send({
        topic: `${topic}-${documentId}`,
        messages: [{ value: JSON.stringify(message) }],
    });
};

module.exports = { produce };
