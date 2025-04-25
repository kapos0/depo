type UnsubscribeFunction = () => void;

interface Window {
    electron: {
        logThings: (message: string) => void;
    };
}
