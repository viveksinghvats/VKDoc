import React, { useState, useEffect } from 'react';

const InputWithDebounce = (props) => {
    const [docName, setDocName] = useState(props.title);  // State for input value
    const [debouncedValue, setDebouncedValue] = useState('');  // State for debounced value

    // Function to handle input change and update the state
    const handleInputChange = (e) => {
        setDocName(e.target.value);
    };

    // Debounced function for API call
    const updateAPI = (value) => {
        console.log("API call with value: ", value);
        // Here you would make an API call
        // e.g., axios.post('your-api-endpoint', { value })
    };  // 2000ms = 2 seconds delay

    // Use effect to track changes in the input and call the debounced API function
    useEffect(() => {
        // Set a timer to trigger the API call after 2 seconds of inactivity
        const handler = setTimeout(() => {
            setDebouncedValue(docName);  // Update the debounced value after 2 seconds
        }, 2000);  // 2000ms = 2 seconds delay

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
        <div>
            <input type="text"
                value={docName}
                onChange={handleInputChange}
                placeholder="Document"
                required className="docName" />
            <p>Document Name: {docName}</p>
        </div>
    );
};

// Debounce utility function
function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);  // Clear the previous timer
        timer = setTimeout(() => {  // Set a new timer
            func(...args);  // Execute the function after the delay
        }, delay);
    };
}

export default InputWithDebounce;
