import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.electron.subscribeStatistics((stats) => console.log(stats));
    }, []);
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}
