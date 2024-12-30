import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useState,
} from "react";

interface TimerContextProps {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextProps>({
    duration: 60,
    setDuration: () => {},
});

interface TimerProviderProps {
    children: ReactNode;
}

export default function TimerProvider({ children }: TimerProviderProps) {
    const [duration, setDuration] = useState(60);

    return (
        <TimerContext.Provider value={{ duration, setDuration }}>
            {children}
        </TimerContext.Provider>
    );
}
