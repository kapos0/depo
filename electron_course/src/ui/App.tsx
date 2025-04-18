import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) =>
            console.log(stats)
        );
        return unsub;
    }, []);
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}
