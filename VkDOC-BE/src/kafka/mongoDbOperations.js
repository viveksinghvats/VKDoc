const { MongoClient } = require('mongodb');
const slate = require('slate'); 

const client = new MongoClient(process.env.MONGO_URL);
const dbName = 'test';

const batchSaveChanges = async (documentChanges) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('documents');
    console.log(JSON.stringify(documentChanges));

    for (let documentId in documentChanges) {
        const changes = documentChanges[documentId];

        // Retrieve existing document
        const doc = await collection.findOne({ documentId });

        let newContent = doc ? doc.content : [];

        // Apply all changes
        changes.forEach(change => {
            console.log(JSON.stringify(change));
            newContent = applyChangeLogic(newContent, change);
        });

        // Upsert document with new content
        await collection.updateOne(
            { documentId },
            { $set: { content: newContent, updatedAt: new Date() } },
            { upsert: true }
        );
    }

    console.log('Changes saved to MongoDB');
};

function applyChangeLogic(currentContent, change) {
    let newContent = [...currentContent];
    const { path, offset, text, type } = change;
    const node = slate.Node.get(newContent, path);

    if (type === 'insert_text') {
        // Insert text at the specified offset
        const updatedNode = {
            ...node,
            text: node.text.slice(0, offset) + text + node.text.slice(offset)
        };
        newContent = slate.Transforms.setNode(newContent, updatedNode, { at: path });
    }

    if (type === 'remove_text') {
        // Remove text from the specified offset
        const updatedNode = {
            ...node,
            text: node.text.slice(0, offset) + node.text.slice(offset + text.length)
        };
        newContent = slate.Transforms.setNode(newContent, updatedNode, { at: path });
    }

    return newContent;
}


module.exports = { batchSaveChanges };
