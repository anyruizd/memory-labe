export function InputError({ error }: { error: string }) {
    return (
        <div className='text-red-500 text-xs'>{error}</div>
    )
}