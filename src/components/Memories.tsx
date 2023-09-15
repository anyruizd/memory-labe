import { useState } from 'react'
import { MemoryCard } from './MemoryCard.tsx'
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { CreateMemoryModal } from './CreateMemoryModal.tsx'
import { Memory } from '../utils/types.tsx'

const initialMemories = [
  {
    id: 1,
    title: 'My first memory',
    description: 'This is a description',
    date: '2021-05-01',
    imageUrl: 'https://picsum.photos/seed/1/300/300',
  },
  {
    id: 2,
    title: 'My second memory',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, exercitationem. Maxime harum eligendi officia architecto molestiae? Quasi fugiat, et fuga consequuntur repudiandae saepe doloribus accusantium beatae nobis ut, explicabo veniam?',
    date: '2022-05-02',
    imageUrl: 'https://picsum.photos/seed/2/300/300',
  }
]

export function Memories() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [memories, setMemories] = useState<Memory[]>(initialMemories)

    // useEffect(() => {
    //     function init() {
    //         fetch("http://localhost:4001/memories/")
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`)
    //             }
    //             return response.json()
    //         })
    //         .then((response) => {
    //             setMemories(response.memories)
    //         })
    //     }
    //     init()
    // }, [])

    return (
        <>
            <div className="flex justify-between w-full">
                <select className='flex '>
                    <option>Older to new</option>
                    <option>Older to new</option>
                </select>
                <button onClick={()=> setModalOpen(true)} className='flex border rounded p-1'>
                    <PlusSmallIcon className='inline-block h-6 w-6'/>
                    Add new memory
                </button>
            </div>
            {memories
                .sort((a,b)=> {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                })
                .map(({id, title, description, imageUrl, date}) => (
                    <MemoryCard
                        key={id}
                        title={title}
                        description={description}
                        date={date}
                        imageUrl={imageUrl}
                    />
            ))}
            <CreateMemoryModal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                onSaveMemory={(memory: Memory)=> {
                    setMemories([...memories, memory])
                    setModalOpen(false)
                }}
            />
        </>
    )
}
