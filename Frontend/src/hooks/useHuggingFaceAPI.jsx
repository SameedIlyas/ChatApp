// hooks/useHuggingFaceAPI.js
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useHuggingFaceAPI = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const queryModel = async (query) => {
        setLoading(true);
        try {
            const response = await axios.post(
                process.env.HUGGING_FACE_API_URL,
                { inputs: query },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setResponse(response.data);
        } catch (error) {
            toast.error('Error querying the model.');
        } finally {
            setLoading(false);
        }
    };

    return { queryModel, response, loading };
};

export default useHuggingFaceAPI;
