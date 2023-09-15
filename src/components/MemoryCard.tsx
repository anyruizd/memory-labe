import { useState } from 'react'
import { EllipsisHorizontalIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { Memory } from '../utils/types'
import { deleteMemory } from '../utils/service'

interface MemoryCardProps extends Memory {
  onEditMemory: (memory: Memory) => void
}

export function MemoryCard({ id, description, name, imageUrl, timestamp, onEditMemory }:MemoryCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMemoryActions = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsMenuOpen(!isMenuOpen)
  }
  const handleDeleteMemory = async (memoryId: number) => {
    await deleteMemory(memoryId)
    setIsMenuOpen(false)
    location.reload()
  }
  return (
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-3  shadow rounded-lg max-w-s md:max-w-m p-4 relative">
        <img
          className="w-24 h-24 rounded-full"
          src={imageUrl ? imageUrl : 'https://placehold.co/100'}
          alt={name}
        />
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl overflow-hidden text-ellipsis whitespace-nowrap h-px-20 w-56'>{name}</h3>
          <p className=''>{timestamp}</p>
          <p className='overflow-hidden text-ellipsis whitespace-nowrap h-px-20 w-56'>{description}</p>
        </div>
        <button className='h-full' onClick={handleMemoryActions}>
          <EllipsisHorizontalIcon className='h-8 w-8 inline-block'/>
        </button>
        {isMenuOpen ? (
          <ul className='absolute right-5 bottom-10 flex flex-col gap-2 bg-white'>
            <li>
              <button
                onClick={() => onEditMemory({
                  id,
                  name,
                  description,
                  imageUrl,
                  timestamp
                })}
                className='flex items-center justify-center border rounded p-1 gap-1'
              >
                <ArrowPathIcon className='h-4 w-4 inline-block'/>
                <span className='text-xs'>Update Memory</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeleteMemory(id as number)}
                className='flex items-center justify-center border rounded p-1 gap-1'
              >
                <TrashIcon className='h-4 w-4 inline-block'/>
                <span className='text-xs'>Delete Memory</span>
              </button>
            </li>
          </ul>
        ) : null}
      </div>
    )
}
