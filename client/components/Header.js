import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Header(props) {
    const router = useRouter()
    const [visibility, setVisibility] = useState(false)

    function Menu() {
        setVisibility(prev => !prev)
    }

    function LogOut() {
        localStorage.removeItem("token")
        router.push('/login')
    }

    return (
        <>
            <div className='flex flex-row items-center justify-between mx-10 my-4'>
                <Image
                    src={'/userImage.png'}
                    width={40}
                    height={40}
                    alt=''
                    className='rounded-full bg-white  cursor-pointer'
                ></Image >
                <div className='flex flex-row items-center justify-between relative cursor-pointer text-2xl text-slate-300'>
                    <p className='w-10 px-2 text-center bg-gray-900 rounded-lg'>&#x002B;</p>
                    <span
                        onClick={Menu}
                        className='w-10 px-2 text-center cursor-pointer'
                    >&#x22EE;
                    </span>
                    {visibility &&
                        <div className='absolute bg-gray-900 block text-slate-300 right-0 z-1 w-fit'>
                            <p className='hover:bg-violet-700  px-3 py-1'>Settings</p>
                            <p className='hover:bg-violet-700  px-3 py-1' onClick={LogOut}>Logout</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}