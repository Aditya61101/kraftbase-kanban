import { Loader } from 'lucide-react'
const Spinner = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <Loader className='animate-spin' size={100} />
        </div>
    )
}

export default Spinner;