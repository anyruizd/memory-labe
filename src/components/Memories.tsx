import { useEffect, useState } from 'react'
import { MemoryCard } from './MemoryCard.tsx'
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { CreateMemoryModal } from './CreateMemoryModal.tsx'
import { Memory } from '../utils/types.tsx'
import { getMemories } from '../utils/service.ts'

export function Memories() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [memories, setMemories] = useState<Memory[]>([])
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
    useEffect(() => {
        async function init() {
            const { data } = await getMemories()
            if (data) setMemories(data.memories)
        }
        init()
    }, [])

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
                    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                })
                .map(({id, name, description, imageUrl, timestamp}) => (
                    <MemoryCard
                        key={id}
                        id={id}
                        name={name}
                        description={description}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        onEditMemory={(memory) => {
                            setSelectedMemory(memory)
                            setModalOpen(true)}}
                    />
            ))}
            <CreateMemoryModal
                isOpen={isModalOpen}
                selectedMemory={selectedMemory as Memory}
                onRequestClose={() => setModalOpen(false)}
                onSaveMemory={() => {
                    setModalOpen(false)
                    setSelectedMemory(null)
                    location.reload()
                }}
            />
        </>
    )
}
