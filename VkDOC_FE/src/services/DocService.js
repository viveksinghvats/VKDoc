// src/services/DocService.js
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import Local from '../utils/local';


const getDocument = async (documentId) => {
    try {
        const response = await axios.get(`${BASEURL}/documents/${documentId}`, { ...assignHeader });
        return response.data;
    } catch (error) {
        return {};
    }
};

const saveDocument = async (documentId, content) => {
    if (!documentId) {
        const document = await axios.post(`${BASEURL}/documents/`, { title: 'New Doc', content: content }, { ...assignHeader });
        const temp = 1;
    }
    else {
        await axios.put(`${BASEURL}/documents/${documentId}`, { content }, { ...assignHeader });
    }
};

const getAllDocuments = async (userId) => {
    try {
        const response = await axios.get(`${BASEURL}/documents/all/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Local.getLoginToken()
            },
        });
        return response.data;
    } catch (error) {
        return [];
    }
}

const assignHeader = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Local.getLoginToken()
    }
}

export default { getDocument, saveDocument, getAllDocuments };
