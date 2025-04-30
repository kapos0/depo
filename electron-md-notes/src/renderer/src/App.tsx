import { ActionButtonsRow } from "./components/Button/ActionButtonRows";
import { Content, LayOut, Sidebar } from "./components/LayOut";
import { NoteList } from "./components/NoteList";

export default function App() {
    return (
        <LayOut>
            <Sidebar className="p-2">
                <ActionButtonsRow className="flex justify-between mt-1" />
                <NoteList className="mt-3 space-y-1" />
            </Sidebar>
            <Content className="border-l bg-zinc-900/50 border-l-white/20 p-2">
                Content
            </Content>
        </LayOut>
    );
}
