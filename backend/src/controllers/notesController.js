import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await await Note.find({}).sort({ createdAt: -1 })
        res.status(200).json(notes)
    } catch (error) {
        console.error(`Error in getAllNotes controller ${error}`)

        res.status(500).json({ message: "Internal server error" })
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).json({ message: "Note Not Found" })
        }
        res.json(note)
    } catch (error) {
        console.error(`Error in getNoteById controller ${error}`)

        res.status(500).json({ message: "Internal server error" })
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, code, content } = req.body
        console.log(title, code, content);
        const note = new Note({ title, code, content })

        const savedNotes = await note.save()
        res.status(201).json(savedNotes)

    } catch (error) {
        console.error(`Error in createNote controller ${error}`)

        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, code, content } = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, code, content }, { new: true, })

        if (!updateNote) {
            return res.status(404).json({ message: "Note not Found" })
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error(`Error in updateNote controller ${error}`)

        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note Note Found' })
        }
        res.status(200).json({ message: "Note Deleted Sucessfully" })
    } catch (error) {
        console.error(`Error in deleteNote controller ${error}`)

        res.status(500).json({ message: "Internal server error" })
    }

}



