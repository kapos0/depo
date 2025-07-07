import { CiPen, CiTrash } from "react-icons/ci";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../lib/utils";

export default function NoteCard({ note, setNotes }) {
    async function handleDelete(e, id) {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?"))
            return;

        try {
            await axios.delete(`${baseUrl}/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note deleted successfully");
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    }

    return (
        <Link
            to={`/notes/${note._id}`}
            className="card hover:shadow-lg transition-all bg-black duration-200 border-t-4 border-solid border-[#00FF9D]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">
                    {note.content}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <CiPen className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, note._id)}
                        >
                            <CiTrash className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
