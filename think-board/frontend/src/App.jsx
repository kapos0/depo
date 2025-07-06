import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "./lib/utils";
import Navbar from "./components/Navbar";
import NoNote from "./components/NoNote";

export default function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await axios.get(`${baseUrl}/notes`);
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
        <div className="relative h-full w-full">
            <Navbar />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]">
                <div className="max-w-7xl mx-auto p-4 mt-6">
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
