import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router";
import { useSession } from "../lib/useSession";
import axios from "axios";
import { baseUrl } from "../lib/utils";

export default function EditNote() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn, isLoading } = useSession();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!isLoading && isLoggedIn === false) {
            navigate("/auth/sign-in");
        }
    }, [isLoggedIn, isLoading, navigate]);

    useEffect(() => {
        async function fetchNote() {
            try {
                const res = await axios.get(`${baseUrl}/notes/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching note", error);
                toast.error("Failed to fetch note");
                navigate("/");
            } finally {
                setFetching(false);
            }
        }
        if (id) fetchNote();
    }, [id, navigate]);

    if (isLoading || fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            await axios.put(`${baseUrl}/notes/${id}`, {
                title,
                content,
            });
            toast.success("Note updated successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error updating note", error);
            if (error.response && error.response.status === 429) {
                toast.error("Slow down! You're updating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to update note");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition mb-8"
                    >
                        <FaArrowLeft className="size-5" />
                        <span className="font-medium">Back to Notes</span>
                    </Link>

                    <div className="rounded-xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="card-body p-8">
                            <h2 className="card-title text-3xl font-bold text-white mb-6">
                                Edit Note
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control mb-6">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg text-gray-200 font-semibold">
                                            Title
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note Title"
                                        className="input input-bordered bg-white/80 focus:bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 focus:border-blue-500 transition w-full rounded-lg px-4 py-2"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-control mb-6">
                                    <label className="label mb-2">
                                        <span className="label-text text-lg text-gray-200 font-semibold">
                                            Content
                                        </span>
                                    </label>
                                    <textarea
                                        placeholder="Write your note here..."
                                        className="textarea textarea-bordered bg-white/80 focus:bg-white text-gray-900 placeholder-gray-400 border-2 border-gray-300 focus:border-blue-500 transition w-full rounded-lg px-4 py-2 h-40 resize-none"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-8 py-2 rounded-lg text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition disabled:opacity-60"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
