import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Title from '../components/Title'

export default function Chatbox() {
    const [initState, setInitState] = useState(true)


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
                        <div>
                            <h1>Not init</h1>
                        </div>
                    )
            }
        </>
    )
}