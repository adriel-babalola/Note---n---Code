import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from "../lib/util.js";
import api from '../lib/axios.js'
import toast, { Toaster } from 'react-hot-toast'  // Add Toaster import


const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm('Are you sure you wnat to delet this note?')) {
            return
        }
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter( note => note._id !== id) )
            toast.success('Note Deleted Sucessfully')
        } catch (error) {
            console.log(`Error in handelDelete ${error}`);
            toast.delete('Failed to Delete Note')

        }
    }

    return (
        <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-x border-b border-solid border-primary'>
            <div className="card-body">
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>

                <div className='card-actions justify-between items-center mt-4'>
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className='size-4'/>
                        <button className='btn btn-ghost btn-xs text-error' onClick={ (e) => handleDelete(e,note._id)}>
                            <Trash2Icon className='size-4'/>
                        </button>
                    </div>

                </div>

            </div>
        </Link>
    )
}

export default NoteCard