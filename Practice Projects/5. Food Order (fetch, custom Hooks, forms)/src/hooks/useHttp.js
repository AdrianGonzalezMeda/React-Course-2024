import { useState, useEffect, useCallback } from 'react';

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request');
    }

    return resData;
}

const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            console.log('resData',resData)
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }

        setIsLoading(false);
    }, [url, config])

    useEffect(() => {
        if (!config || (config && (config.method==='GET' || !config.method))) {
            sendRequest();
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}

export default useHttp