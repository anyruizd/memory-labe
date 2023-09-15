import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

interface MemoryCardProps {
  description: string;
  imageUrl: string;
  title: string;
  date: string;
}

export function MemoryCard({ description, title, imageUrl, date }:MemoryCardProps) {
  return (
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-3  shadow rounded-lg max-w-s md:max-w-m p-4">
        <img
          className="w-24 h-24 rounded-full"
          src={imageUrl ? imageUrl : 'https://via.placeholder.com/100'}
          alt={title}
        />
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl'>{title}</h3>
          <p className=''>{date}</p>
          <p className='overflow-hidden text-ellipsis whitespace-nowrap h-px-20 w-56'>{description}</p>
        </div>
          <button className='h-full'>
            <EllipsisHorizontalIcon className='h-8 w-8 inline-block'/>
          </button>
      </div>
    )
}
