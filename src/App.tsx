import { useEffect, useState } from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'
import { User } from './utils/types'
import { Memories } from './components/Memories'
import { CreateUserModal } from './components/CreateUserModal'
import { ShareButton } from './components/ShareButton'
import './App.css'

function App() {
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const userId = params.get('userId')
    if (!userId) {
      setOpenCreateUserModal(true)
    } else {
      setUser({
        id: parseInt(userId),
        name: params.get('userName') ?? ''
      })
    }
  }, [])
  
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='overflow-hidden rounded-lg bg-white shadow  p-4'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='flex items-center'>
              <CubeIcon className='h-16 w-16 inline-block' />
              <div className='flex justify-between items-center'>
                <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                  {user?.name ? `${user.name}'s`: ''} Memory Lane
                </h1>
                <ShareButton />
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            {user?.id ? (
              <Memories userId={user.id} />
            ): (
              <CreateUserModal 
                isOpen={openCreateUserModal} 
                onRequestClose={() => setOpenCreateUserModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
