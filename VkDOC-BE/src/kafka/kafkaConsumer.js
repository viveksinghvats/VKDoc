const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'doc-collaboration', brokers: ['kafka:9092'] });
const consumer = kafka.consumer({ groupId: 'doc-group' });

const consume = async (onMessage) => {
    await consumer.connect();
    await consumer.subscribe({ topic: /^document-updates-.*/ });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            onMessage(message);
        },
    });
};

module.exports = { consume };
