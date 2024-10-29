// src/hooks/useWebSocket.js
import { useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        // Cleanup WebSocket when component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [url]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        }
    };

    const addMessageListener = (callback) => {
        if (socketRef.current) {
            socketRef.current.onmessage = (event) => callback(JSON.parse(event.data));
        }
    };

    return {
        socket: socketRef.current,
        sendMessage,
        addMessageListener
    };
};
