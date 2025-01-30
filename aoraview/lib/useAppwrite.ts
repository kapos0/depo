import { Alert } from "react-native";
import { useEffect, useState } from "react";

type UseAppwriteResult<T> = {
    data: T[];
    loading: boolean;
    refetch: () => void;
};

const useAppwrite = <T>(fn: () => Promise<T[]>): UseAppwriteResult<T> => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fn();
            setData(res);
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Error", "An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refetch = () => fetchData();

    return { data, loading, refetch };
};

export default useAppwrite;
