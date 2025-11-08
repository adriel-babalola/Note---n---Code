import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast, { Toaster } from 'react-hot-toast'  // Add Toaster import
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';


const Home = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
        console.log(res.data);

        setIsRateLimited(false)


      } catch (error) {
        console.error(`Error fetching Notes:`, error);

        if (error.response?.status === 429) {
          setIsRateLimited(true)
          toast.error('Too many requests. Please try again later.')
        } else {
          toast.error(error.response?.data?.message || 'Failed to load Notes')
        }

      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className='text-center text-primary py-10'>Loading Notes ...</div>
        ) : (
          !isRateLimited && (
            notes.length === 0 ? (
              <NotesNotFound />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )
          )
        )}
      </div>
    </div>

  )
}

export default Home