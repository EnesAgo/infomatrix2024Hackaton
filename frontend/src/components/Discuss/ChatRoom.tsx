import React, {useEffect, useRef, useState} from 'react'
import {firestoreDB} from "@/firebase";
import { addDoc, collection, query, orderBy, limit, serverTimestamp } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from "@/components/Discuss/ChatMessage";
import {alertError} from "@/functions/alertFunctions";

export default function ChatRoom() {
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        if (localStorage) {
            setUserData(JSON.parse(localStorage.jwt))
        }

        dummy.current.scrollIntoView()

    }, [])




        const messageRef = useRef<any>()
    const dummy = useRef<any>();
    const chatQuery = query(collection(firestoreDB, "messages"), orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(chatQuery);

    useEffect(() => {
        dummy.current.scrollIntoView()
    }, [messages])

    async function sendMessage(e:any){
        e.preventDefault()

        if(messageRef.current.value === '') return
        if(messageRef.current.value.length > 84){
            alertError("Message can be maximum 84 characters!")
        }

        try{
            const dataToSend = {
                text: messageRef.current.value || null,
                createdAt: new Date()  || null,
                uuID: userData?.uuID  || null,
                username: userData?.username || null
            }
            console.log(dataToSend)
            const docRef = await addDoc(collection(firestoreDB, "messages"), dataToSend);
            messageRef.current.value = ''
            dummy.current.scrollIntoView({ behavior: 'smooth' });

        } catch (e) {
            console.log({error: e})
        }
    }


    useEffect(() => {
        console.log(messages)
    }, [messages])

    return (
        <div className="w-[90%] h-[450px] bg-white glassMorphism rounded-2xl flex flex-col p-6 px-12 items-start justify-between gap-8">

            <div className={"h-[340px] w-full flex flex-col gap-3 overflow-scroll"}>
                {messages && messages.map((e:any) => <ChatMessage key={JSON.stringify(e.createdAt)} message={e} userData={userData} />)}


                <span ref={dummy}></span>

            </div>

            <form onClick={sendMessage} className={"w-full flex justify-center py-2 relative"}>
                <input
                    // onChange={() => setInputErrors((prev) => ({ ...prev, username: false }))}
                    type="text"
                    ref={messageRef}
                    placeholder={"Your Message!"}
                    className={`rounded-3xl text-black w-full h-12 bg-gray-200 px-7`}
                />
                <button
                    className={"w-6 h-6 absolute inset-y-5 end-6"}
                    type={"submit"}
                >
                    <img src="/assets/images/up-arrow.png" alt="submit" className={"w-5 h-5"}/>
                </button>
            </form>

        </div>
    );
}
