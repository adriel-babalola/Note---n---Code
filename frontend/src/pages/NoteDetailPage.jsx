import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content or Code");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="btn btn-ghost hover:bg-base-200 gap-2"
            >
              <ArrowLeftIcon className="size-5" />
              <span>Back to Notes</span>
            </Link>
            <button 
              onClick={handleDelete} 
              className="btn btn-error btn-outline hover:bg-error/90 gap-2"
            >
              <Trash2Icon className="size-5" />
              <span>Delete Note</span>
            </button>
          </div>

          <div className="card bg-base-100 shadow-lg border border-base-300">
            <div className="card-body space-y-6">
              <h2 className="card-title text-2xl font-bold text-base-content">Edit Note</h2>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full focus:outline-0  focus:input-primary"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  className="textarea min-h-[200px] w-full focus:textarea-primary focus:outline-0  resize-y"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Code</span>
                </label>
                <textarea
                  placeholder="Write your code here..."
                  className="textarea min-h-[100px] w-full focus:textarea-primary focus:outline-0  resize-y"
                  value={note.code}
                  onChange={(e) => setNote({ ...note, code: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end pt-4">
                <button 
                  className="btn btn-primary btn-wide" 
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="size-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;