import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaArrowCircleLeft, FaAsterisk, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../lib/utils";

export default function NoteDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this note?"))
            return;

        try {
            await axios.delete(`${baseUrl}/notes/${id}`);
            toast.success("Note deleted");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error("Failed to delete note");
        }
    }

    async function handleSave() {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);

        try {
            await axios.put(`${baseUrl}/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/");
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <FaAsterisk className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <FaArrowCircleLeft className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline"
                        >
                            <FaTrash className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32"
                                    value={note.content}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            content: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
