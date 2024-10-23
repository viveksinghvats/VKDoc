// src/components/Documents.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Local from '../utils/local';
import DocService from '../services/DocService';

const DocumentsPage = () => {
    const  user  = Local.getloggedInUser();
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // Fetch user's documents from the API (example API call)
        const fetchAllDocuments = async () => {
            const documents = await DocService.getAllDocuments(user.id);
            setDocuments(documents);
        }
        fetchAllDocuments();
    }, [user.id]);

    return (
        <div className="documents-container">
            <header className="documents-header">
                <h1>Welcome back, {user.name}!</h1>
                <p>Here are your documents. You can create a new one or edit existing ones.</p>
            </header>

            <div className="actions">
                <Link to="/editor/new" className="create-doc-btn">+ Create New Document</Link>
            </div>

            <div className="documents-list">
                {documents.length > 0 ? (
                    documents.map((doc) => (
                        <div key={doc._id} className="document-card">
                            <Link to={`/editor/${doc._id}`} className="document-link">
                                <h3>{doc.title}</h3>
                                <p>Last edited: {new Date(doc.updatedAt).toLocaleString()}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>You have no documents yet. Start by creating a new document!</p>
                )}
            </div>
        </div>
    );
};

export default DocumentsPage;
