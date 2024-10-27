import React, { useState, useEffect } from 'react';

const InputWithDebounce = (props) => {
    const { title, documentId, userId, socket } = props;
    const [docName, setDocName] = useState(title);
    const [debouncedValue, setDebouncedValue] = useState('');  // State for debounced value

    // Function to handle input change and update the state
    const handleInputChange = (e) => {
        setDocName(e.target.value);
    };

    // Debounced function for API call
    const updateAPI = (value) => {
        console.log("API call with value: ", value);
        socket.sendMessage({
            documentId: documentId,
            change: {
                type: 'name',
                text: value
            },
            userId: userId,  
        });
    };  

    // Use effect to track changes in the input and call the debounced API function
    useEffect(() => {
        // Set a timer to trigger the API call after 2 seconds of inactivity
        const handler = setTimeout(() => {
            setDebouncedValue(docName);  
        }, 2000); 

        // Clean up the timer if inputValue changes before the delay is over
        return () => {
            clearTimeout(handler);
        };
    }, [docName]);

    useEffect(() => {
        if (debouncedValue) {
            updateAPI(debouncedValue);  // Call API only when the user has stopped typing
        }
    }, [debouncedValue]);

    return (
        <div className="document-name-container">
            <input type="text"
                value={docName}
                onChange={handleInputChange}
                placeholder="Document"
                required/>
            <p>Document: {docName}</p>
        </div>
    );
};


export default InputWithDebounce;
