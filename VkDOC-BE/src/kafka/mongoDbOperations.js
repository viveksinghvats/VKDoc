const slate = require('slate');
const Document = require('../models/document.model');


const batchSaveChanges = async (documentChanges) => {
    console.log(JSON.stringify(documentChanges));

    for (let documentId in documentChanges) {
        const changes = documentChanges[documentId];

        // Retrieve existing document
        const doc = await Document.findById(documentId);

        let newContent = doc ? doc.content : [];
        let title = doc.title;

        // Apply all changes at once saves document writes
        changes.forEach(change => {
            console.log(JSON.stringify(change));
            if (change.type === 'name') {
                title = change.text;
            } else {
                newContent = applyChangeLogic(newContent, change);
            }
        });

        // Upsert document with new content
        await Document.updateOne(
            { _id: documentId },
            { $set: { content: newContent, title: title, updatedAt: new Date() } },
            { upsert: true }
        );
    }

    console.log('Changes saved to MongoDB');
};

function applyChangeLogic(currentContent, change) {
    let newContent = [...currentContent];
    const { path, offset, text, type } = change;
    const node = getNodeAtPath(newContent, path);

    if (type === 'insert_text') {
        // Insert text at the specified offset
        if (node) {
            let newtext = node.text.slice(0, offset) + text + node.text.slice(offset);
            newContent = updateNodeContent(newContent, path, newtext);
        } else {
            newContent = updateNodeContent(newContent, path, text);
        }
    }

    if (type === 'remove_text') {
        // Remove text from the specified offset
        if (node) {
            let newtext = node.text.slice(0, offset) + node.text.slice(offset + text.length);
            newContent = updateNodeContent(newContent, path, newtext);
        } else {
            newContent = updateNodeContent(newContent, path, '');
        }
    }

    return newContent;
}

const getNodeAtPath = (rootArray, path) => {
    let node = rootArray;

    for (let i = 0; i < path.length; i++) {
        const index = path[i];

        // Check if the current node is an array and has a valid child at `index`
        if (Array.isArray(node)) {
            if (!node[index]) return null;
            node = node[index];
        } else if (node.children) {
            if (!node.children[index]) return null;
            node = node.children[index];
        } else {
            return null;
        }
    }
    return node;
};

function updateNodeContent(content, path, newText) {
    let node = content;
    for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]]?.children;
    }
    if (node) {
        node[path[path.length - 1]].text = newText;
        return content;
    }
    const newParagraph = {
        type: 'paragraph',
        children: [{ text: newText }],
    };

    // Add the new paragraph to the end of the content
    return [...content, newParagraph];
}

module.exports = { batchSaveChanges };
