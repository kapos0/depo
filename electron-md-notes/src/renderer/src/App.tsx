import { Content, LayOut, Sidebar } from "./components/LayOut";

export default function App() {
    return (
        <LayOut>
            <Sidebar className="p-2">Side Bar</Sidebar>
            <Content className="border-l bg-zinc-900/50 border-l-white/20 p-2">
                Content
            </Content>
        </LayOut>
    );
}
