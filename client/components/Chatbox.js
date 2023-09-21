import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Title from '../components/Title'

export default function Chatbox() {
    const selectedItem = useSelector((state) => state.selectedItem)
    const [initState, setInitState] = useState(true)


    useEffect(() => {
        if (selectedItem?._id) {
            setInitState(false)
        }
    }, [selectedItem])


    function ChatBoxHeader() {
        return (
            <div className='flex flex-row h-[10%] px-[5%] py-[1%] bg-gray-700 text-slate-300 cursor-pointer'>
                <Image
                    src={'/userImage.png'}
                    width={40}
                    height={40}
                    alt=''
                    className='rounded-full bg-white  cursor-pointer'
                    priority="high"
                ></Image >
                <div className='text-xl mx-[2%] my-auto'>
                    <p>{selectedItem.username}</p>
                </div>
            </div>
        )
    }

    function InputBox() {
        return (
            <div>
                <input
                    type='text'
                    className='flex w-[90%] mx-[5%] mb-[2%] py-[0.4%] px-[1%] justify-self-end bg-gray-700 rounded outline-0 text-slate-300'
                    placeholder='Type a message'
                    autoFocus
                />
            </div>
        )
    }

    return (
        <>
            {
                initState
                    ?
                    (
                        <div className='flex min-h-[calc(100vh-40px)] justify-center'>
                            <Title />
                        </div>
                    ) :
                    (
                        <div className='flex flex-col min-h-[calc(100vh-40px)] justify-between'>
                            <ChatBoxHeader />
                            <InputBox />
                        </div>

                    )
            }
        </>
    )
}