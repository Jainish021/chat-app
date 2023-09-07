import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Head from 'next/head'
import axios from "axios"


export default function Registration() {
    const router = useRouter()
    const [errorLabel, setErrorLabel] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
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
        localStorage.getItem('token') && fetchUser()
    }, [])


    function handleChange(e) {
        setFormData(prevData => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            })
        )
    }


    async function processRegistration(e) {
        e.preventDefault()
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (formData.username.includes(" ")) {
            setErrorLabel("Username can not contain space.")
            return
        } else if (formData.username) {
            const username = await axios.post("/users/username", { "username": formData.username }).then(res => res.data)
            if (username.error) {
                setErrorLabel(username.error)
                return
            }
        } else if (!regEx.test(formData.email)) {
            setErrorLabel("Invalid email!")
            return
        } else if (formData.password !== formData.password2) {
            setErrorLabel("Passwords do no match.")
            return
        } else if (formData.password.includes(" ")) {
            setErrorLabel("Password can not contain space.")
            return
        } else if (formData.password.length < 7) {
            setErrorLabel("Password must be longer than 7 characters.")
            return
        }

        try {
            const userDetails = await axios.post("/users", formData).then(res => res.data)
            localStorage.setItem("token", userDetails.token)
            if (userDetails.error) {
                throw new Error()
            }
            setErrorLabel("")
            router.push('/chat')
        } catch (e) {
            setErrorLabel("User already exists! Try logging in.")
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
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-violet-700 border-gray-700 cursor-default">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                                Register your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e) => { processRegistration(e) }}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-white">Username</label>
                                    <input type="username" name="username" id="username" value={formData.username} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your username" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">Email</label>
                                    <input type="email" name="email" id="email" value={formData.email} className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">Password</label>
                                    <input type="password" name="password" id="password" value={formData.password} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 text-white">Re-enter Password</label>
                                    <input type="password" name="password2" id="password2" value={formData.password2} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required={true} onChange={(e) => handleChange(e)} />
                                </div>
                                <div>
                                    <label className='text-amber-400'>{errorLabel}</label>
                                </div>
                                <button type='submit' className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-800 focus:ring-white">Register</button>
                                <hr />
                                <button className="w-full text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-500 hover:bg-gray-800 focus:ring-white hover:text-white" onClick={() => router.push('/login')}>Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}