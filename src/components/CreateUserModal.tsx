import Modal from 'react-modal'
import { User } from '../utils/types'
import { createUser } from '../utils/service'
import { useState } from 'react'

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
}

export function CreateUserModal({ isOpen, onRequestClose }: MemoryModalProps) {
  const [user, setUser] = useState<User | null>(null)
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
      <form onSubmit={async (e) => {
        e.preventDefault()
        if (user) {
          const { data } = await createUser(user.name)
          window.location.href = `${window.location.href}?userId=${data.id}&userName=${data.name}`
          setUser(null)
          onRequestClose()
        }
      }}>
        <div className='flex flex-col gap-2'>
          <label className='flex flex-col'>
            <span className='uppercase text-xs'>Please enter your name</span>
            <input
              className='w-full border-solid border rounded'
              name='name'
              type='text'
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user?.name ?? ''}
            />
          </label>
          <button
            className='flex items-center justify-center border rounded p-1 bg-black text-white '
            type='submit'
          >
            Save
          </button>
          <button
            className='flex items-center justify-center border rounded p-1'
            type='button'
            onClick={() => onRequestClose()}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
