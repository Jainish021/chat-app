import Header from "./Header"
import FriendSearch from './FriendSearch'
import { useState } from "react"

export default function Sidebar() {
    const [friendSearchVisibility, setFriendSearchVisibility] = useState(false)

    function friendSearch() {
        setFriendSearchVisibility(prev => !prev)
    }

    return (
        <>
            {
                friendSearchVisibility ?
                    <FriendSearch friendSearch={friendSearch} />
                    :
                    <>
                        <Header friendSearch={friendSearch} />
                        <div className="h-14 bg-gray-800 border-b border-slate-600 px-1"></div>
                        <div className="h-14 bg-gray-800 border-b border-slate-600"></div>
                        <div className="h-14 bg-gray-800 border-b border-slate-600"></div>
                        <div className="h-14 bg-gray-800 border-b border-slate-600"></div>
                        <div className="h-14 bg-gray-800 border-b border-slate-600"></div>
                        <div className="h-14 bg-gray-800 border-b border-slate-600"></div>
                    </>
            }
        </>
    )
}