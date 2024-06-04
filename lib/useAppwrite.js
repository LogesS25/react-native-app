//custom hook
import { useState, useEffect } from 'react';
import {Alert} from "react-native";


const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert('Error', error.message)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    //refecting the data to make it more effective
    const refetch = () => fetchData();

    //console.log(data);
    return { data,isLoading,refetch }
}

export default useAppwrite