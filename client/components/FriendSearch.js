import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FriendSearch(props) {
    const [searchQuery, setSearchQuery] = useState("")
    const [errorLabel, setErrorLabel] = useState("")
    const [list, setList] = useState([])


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = token
            const fetchList = async () => {
                try {
                    const searchResult = await axios.post("/friends/findFriend", { searchQuery }).then(res => res.data)
                    if (!searchResult.error) {
                        setErrorLabel("")
                        setList(searchResult)
                        console.log(searchResult)
                    } else {
                        setErrorLabel(searchResult.error)
                    }
                } catch (e) {

                }
            }
            token && searchQuery && fetchList()
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [searchQuery])


    useEffect(() => {
        SearchResult()
    }, [list])


    function SearchResult() {
        if (list.length > 0) {
            const searchList = list.map(listItem => (
                <div
                    key={listItem._id}
                    className='flex flex-row px-[5%] py-[1%] bg-gray-800 text-slate-300 border-b border-slate-600 cursor-pointer'
                >
                    <div>
                        <p>Username:</p>
                        <p>Email:</p>
                    </div>
                    <div className='mx-[10%] text-violet-500'>
                        <p>{listItem.username}</p>
                        <p>{listItem.email}</p>
                    </div>
                </div >
            ))

            return (
                searchList
            )
        } else if (searchQuery && list.length == 0) {
            setErrorLabel("No matching user found.")
        }
    }


    return (
        <>
            <div className='flex flex-row items-center'>
                <p
                    className='text-violet-500 text-center text-4xl font-bold w-[10%] cursor-pointer transition-transform transform hover:scale-110 focus:outline-none active:scale-100'
                    onClick={props.friendSearch}
                >
                    &larr;
                </p>
                <input
                    className='w-[90%] mx-[5%] my-[5%] py-[1%] px-[2%] bg-gray-800 rounded-md caret-slate-300 text-slate-300'
                    placeholder='Search by username or email'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                ></input>
            </div>
            {errorLabel ? <p className='text-center text-amber-400'>{errorLabel}</p> : <SearchResult />}
        </>
    )
}