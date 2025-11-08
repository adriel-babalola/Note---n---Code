import { ArrowLeftIcon, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'  // Add Toaster import
import api from "../lib/axios.js";

const CreatePage = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault()

  //  if (!title.trim() || !content.trim()) {
  //   toast.error('All fields Required ')
  //   return;
  //  }

    setLoading(true)
    
    try {
      await  api.post("/notes", {
        title,
        code,
        content
      })
      toast.success('Note Craeted Sucessfully ')
      navigate('/')
    } catch (error) {
      console.log(error);
      if (error.response.status === 429) {
        toast.error(`Slow Down! You're creating notes to fast`)
      } else {
      toast.error('failed to create note')

      }
    } finally {
      setLoading(false)
    }

  }


  return (

    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"></ArrowLeftIcon>

            Back to Note
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 "> Create New Note</h2>

              <form onSubmit={handelSubmit} className="space-y-6">
                <div className="form-control">
                  <label htmlFor="title" className="label mb-1">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="content" className="label mb-1">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  <textarea
                    id="content"
                    placeholder="Write your note here ..."
                    className="textarea textarea-bordered h-40 w-full resize-vertical focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="code" className="label mb-1">
                    <span className="label-text font-medium">Code</span>
                  </label>
                  <textarea
                    id="code"
                    placeholder="Write your code here ..."
                    className="textarea textarea-bordered h-20 w-full resize-vertical focus:outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage