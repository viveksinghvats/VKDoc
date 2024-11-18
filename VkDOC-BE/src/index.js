const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { Kafka } = require('kafkajs');
require('dotenv').config();
const app = express();
const authRoutes = require('./routes/auth.route');
const docRoutes = require('./routes/document.route');
const docShareRoutes = require('./routes/docShare.route');
const runSocket = require('./kafka/webs');
const WebSocket = require('ws');
runSocket(); 
// Kafka setup
const kafka = new Kafka({
    clientId: 'myapp',
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'doc-group' });


const runKafka = async () => {
    try {
        await producer.connect();
        await consumer.connect();
        console.log('Kafka connected');
    } catch (err) {
        console.error('Error connecting to Kafka:', err);
        process.exit(1);
    }
};


app.use(cors({
    origin: '*', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE',  // Specify allowed HTTP methods
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());



app.use('/auth', authRoutes);
app.use('/documents', docRoutes);
app.use('/document-sharing', docShareRoutes);
const port = process.env.PORT;

// Start server and services
const startServer = async () => {
    await connectDB();
    await runKafka();  // Correct place to call the Kafka connection
    const PORT = process.env.PORT || port;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
