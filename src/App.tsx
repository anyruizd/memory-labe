import { CubeIcon } from '@heroicons/react/20/solid'
import './App.css'
import { Memories } from './components/Memories'

function App() {
  const user = 'Jae';
  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-32'>
        <div className='overflow-hidden rounded-lg bg-white shadow  p-4'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='flex items-center'>
              <CubeIcon className='h-16 w-16 inline-block' />
              <h1 className='text-4xl font-semibold text-gray-900 mb-4 ml-4 mt-4'>
                {user}'s memory lane
              </h1>
            </div>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <Memories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
