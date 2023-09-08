import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Head from 'next/head'
import Link from 'next/link'
import axios from "axios"


export default function Login() {
    const router = useRouter()
    const [errorLabel, setErrorLabel] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })


    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = token
        const fetchUser = async () => {
            try {
                await axios.get("/users/me")
                router.push("/chat")
            } catch (e) {

            }
        }
        token && fetchUser()
    }, [])


    function handleChange(e) {
        setFormData(prevData => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            })
        )
    }


    async function loginRequest(e) {
        e.preventDefault()
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (!regEx.test(formData.email)) {
            setErrorLabel("Invalid email!")
            return
        }
        try {
            const userDetails = await axios.post("/users/login", formData).then(res => res.data)
            localStorage.setItem("token", userDetails.token)
            setErrorLabel("")
            router.push('/chat')
        } catch (e) {
            setErrorLabel("Unable to login. Enter correct Email-Password.")
        }
    }


    return (
        <>
            <Head>
                <title>Chat App</title>
                {/* <Link rel="icon" href="/img/favicon.png" /> */}
            </Head>
            <section className='flex flex-col justify-center px-2 bg-gray-900 overflow-auto min-h-screen'>
                <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
                    <h1 className="flex items-center mb-10 text-5xl font-semibold text-gray-900 text-white cursor-pointer">
                        {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                        Chat App
                    </h1>
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-violet-700 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white cursor-default">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e) => loginRequest(e)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</a>
                                </div>
                                <div className='text-amber-400'>
                                    {errorLabel}
                                </div>
                                <button type='submit' className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-800 focus:ring-white">Sign in</button>
                                <p className="text-sm font-light text-gray-200 text-gray-200">
                                    Don’t have an account yet? <Link href={'/registration'} className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</Link >
                                </p>
                            </form>
                        </div>
                    </div>
                    {/* <div className="centered-form__box">
                        <h1>Join</h1>
                        <form action="/chat">
                            <label>Display Name</label>
                            <input type="text" name="username" placeholder="Display name" required />
                            <label>Room</label>
                            <input type="text" name="room" placeholder="room" required />
                            <button>Join</button>
                        </form>
                    </div> */}
                </div>
            </section>
        </>
    );
}