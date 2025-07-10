import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "./lib/utils";
import NoteCard from "./components/NoteCard";
import NoNote from "./components/NoNote";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await axios.get(`${baseUrl}/notes`);
                if (
                    res.data.message === "No notes found" ||
                    res.data.message === "Unauthorized"
                ) {
                    setNotes([]);
                    return;
                }
                setNotes(res.data);
            } catch (error) {
                console.log("Error fetching notes");
                toast.error("Error fetching notes");
                console.log(error.response);
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div>
                <div className="max-w-7xl mx-auto p-4">
                    {loading && (
                        <div className="text-center text-primary py-10">
                            Loading notes...
                        </div>
                    )}

                    {notes.length === 0 && <NoNote />}

                    {notes.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note._id}
                                    note={note}
                                    setNotes={setNotes}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
