// src/components/Editor.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import DocService from '../services/DocService';  // Fetching/saving doc from backend
import { useParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import InputWithDebounce from './InputWithDebounce';

function EditorPage() {
    const editor = useMemo(() => withReact(createEditor()), []); // Set up Slate with history
    const [documentContent, setDocumentContent] = useState([{ type: 'paragraph', children: [{ text: 'Loading...' }] }]);
    const [docName, setDocName] = useState('name');
    const socket = useWebSocket('ws://localhost:8080');  // WebSocket server
    let { documentId } = useParams();
    const [editorKey, setEditorKey] = useState(0);

    // Fetch the document content when component mounts
    useEffect(() => {
        if (documentId !== 'new') {
            const fetchDocument = async () => {
                const doc = await DocService.getDocument(documentId);
                const content = doc.content?.length
                    ? doc.content
                    : [{ type: 'paragraph', children: [{ text: 'Some Value' }] }];

                setDocumentContent(content);
                setDocName(doc.title);
                setEditorKey(editorKey + 1);
            };
            fetchDocument();
        } else if (documentId === 'new') {
            const createDocument = async () => {
                documentId = await DocService.saveDocument(null, [{ type: 'paragraph', children: [{ text: 'Edit this line' }] }]);
            }
            createDocument();

        }
    }, [documentId]);

    const handleChange = useCallback((newValue) => {
        editor.operations.forEach(op => {
            if (op.type === 'insert_text' || op.type === 'remove_text') {
                socket.sendMessage({
                    documentId,
                    change: {
                        type: op.type,
                        path: op.path,
                        offset: op.offset,
                        text: op.text
                    },
                    userId: 'some-user-id',  // Replace with actual user ID
                });
            }
        });
        setDocumentContent(newValue);  // Update local state with the new document content
    }, [editor, socket, documentId]);


    return (
        <div>
            <InputWithDebounce title={docName} />
            <div className="editor-container">
                <Slate key={editorKey} editor={editor} initialValue={documentContent} onValueChange={handleChange}>
                    <Editable
                        placeholder="Start typing your document..."
                        className="editor-placeholder"  // Optional: apply a class to the placeholder
                    />
                </Slate>
            </div>
        </div>
    );
}

export default EditorPage;
