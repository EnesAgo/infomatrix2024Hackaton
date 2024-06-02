import React, {useEffect, useState} from 'react'
import Sidebar from "@/views/Sidebar";
import ChatRoom from "@/components/Discuss/ChatRoom";

export default function Chat() {
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        if (localStorage) {
            setUserData(JSON.parse(localStorage.jwt))
        }

    }, [])

    return (
        <div className="gridMain bg-[#f6f5f7] flex items-center justify-center py-7">
            <div className="w-[90%] h-full flex flex-col gap-6">

                <div className={"w-full h-12 flex items-center"}>
                    <h1 className={"font-medium text-xl text-black"} >Hello {userData?.username} 👋🏼</h1>
                </div>

                <ChatRoom />



            </div>
        </div>
    );
}
