import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaArrowCircleLeft, FaAsterisk } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../lib/utils";

export default function NoteDetailPage() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await axios.get(`${baseUrl}/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching note", error);
                toast.error("Failed to fetch the note");
            } finally {
                setLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <FaAsterisk className="animate-spin size-10" />
            </div>
        );
    }

    if (!note) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
                <div className="text-center text-gray-400">Note not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <FaArrowCircleLeft className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <Link
                            to={`/edit/${note._id}`}
                            className="btn btn-primary"
                        >
                            Edit Note
                        </Link>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl font-bold mb-4 break-words">
                                {note.title}
                            </h2>
                            <div className="prose prose-invert max-w-none whitespace-pre-line text-lg text-gray-200">
                                {note.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
