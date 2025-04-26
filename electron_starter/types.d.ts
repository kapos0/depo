type UnsubscribeFunction = () => void;

interface Window {
    electron: {
        helloWorld: string;
        logThings: (message: string) => void;
    };
}
