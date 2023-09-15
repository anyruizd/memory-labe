import { ShareIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export function ShareButton() {
  const [sharedUrl, setSharedUrl] = useState(false)
  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center border rounded p-1 ml-4'
        type="button"
        name='share' 
        onClick={() => {
          setSharedUrl(!sharedUrl)
          navigator.clipboard.writeText(window.location.href)
        }}
      >
        {sharedUrl ? (
          <CheckCircleIcon className='h-6 w-6 inline-block text-green-500' />
        ) : (
          <ShareIcon className='h-6 w-6 inline-block' />
        )}
      </button>
    </div>
  )
}
