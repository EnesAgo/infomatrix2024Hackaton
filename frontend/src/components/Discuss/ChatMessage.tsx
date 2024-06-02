import React, {useEffect, useState} from 'react'
import Sidebar from "@/views/Sidebar";

export default function ChatMessage(props: any) {
    const { text, username, uuID } = props.message;

    const messageClass = uuID === props.userData?.uuID;

    return (
        <>
            <div className={`message flex flex-col gap-2 w-full`}>
                <span className={`${messageClass && "text-right"} text-xs font-extralight ml-1 text-gray-400`}>{username}</span>
                <div className={`${messageClass && "flex-row-reverse"} flex items-center gap-3`}>
                    <p className={`py-1 px-4 ${messageClass ? "bg-purple-700 text-white" : "bg-gray-300"}  rounded-2xl`}>{text}</p>
                </div>
            </div>
        </>
    )
}
