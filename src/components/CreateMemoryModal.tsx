import { useState } from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#root')

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '500px',
      padding: '2rem',
    },
}

interface MemoryModalProps {
    isOpen: boolean
    onRequestClose: () => void
    onSaveMemory: (memory: Memory) => void
}

interface Memory {
    id?: number
    title: string
    description: string
    date: string
    imageUrl: string
}

export function CreateMemoryModal({ isOpen, onRequestClose, onSaveMemory }: MemoryModalProps) {
    const initialMemory = {
        title: '',
        description: '',
        date: '',
        imageUrl: '',
    }
    const [memory, setMemory] = useState<Memory>(initialMemory);
    return (
        <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
            <form className='flex flex-col gap-4'>
                <h3 className='text-2xl text-center'>Let's create your new&nbsp;memory</h3>
                <label className='flex flex-col'>
                    <span className='uppercase text-xs'>Title</span>
                    <input
                        className='w-full border-solid border rounded'
                        name="title"
                        type='text'
                        onChange={(e) => setMemory({...memory, title: e.target.value})}
                        value={memory.title}
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='uppercase text-xs'>Description</span>
                    <textarea
                        rows={3}
                        className='w-full border-solid border rounded'
                        name="description"
                        onChange={(e) => setMemory({...memory, description: e.target.value})}
                        value={memory.description}
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='uppercase text-xs'>Date</span>
                    <input
                        className='w-full border-solid border rounded'
                        type='date'

                        name="date"
                        onChange={(e) => setMemory({...memory, date: e.target.value})}
                        value={memory.date}
                    />
                </label>
                <div className='flex flex-col gap-2'>
                    <button
                        className='flex items-center justify-center border rounded p-1 bg-black text-white '
                        type='button'
                        onClick={(e) => {
                        e.preventDefault()
                        onSaveMemory(memory)
                        setMemory(initialMemory)
                    }}>
                        Save
                    </button>
                    <button
                        className='flex items-center justify-center border rounded p-1'
                        type='button'
                        onClick={() => onRequestClose()}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    )
}
