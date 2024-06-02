import React, {useRef, useState} from 'react'
import HttpRequest from "@/requests/HttpRequest";
import {alertError} from "@/functions/alertFunctions";

export default function GPT() {

    const promptRef = useRef<any>()

    const [userPrompt, setUserPrompt] = useState<any>();
    const [AiAnswer, setAiAnswer] = useState<any>();


    async function handleSubmit(e: any){
        e.preventDefault()

        if(promptRef.current.value.length === 0) return

        const objData = {
            prompt: promptRef.current.value
        }

        try{
            const responseData: any = await HttpRequest.post('/askGPTPrompt', objData)

            console.log(responseData)

                setUserPrompt(objData.prompt)
                setAiAnswer(responseData.choices[0].message.content)

                console.log(responseData)
                promptRef.current.value = ''

            return
        }
        catch (e: any){
            console.log(e)
            alertError(e.code)
        }

        promptRef.current.value = ''

    }


    return (
        <div className="w-[90%] h-auto bg-white glassMorphism rounded-2xl flex flex-col p-6 px-12 items-center gap-5">

            <h2 className="w-full">Your AI Teacher:</h2>

            <div className={"w-full bg-gray-50 rounded-xl py-1"}>
                <p className="h-52 w-full p-2 px-5 overflow-scroll">
                    <span>{userPrompt && "You: "}{userPrompt}</span> <br/> <br/>
                    <span>{AiAnswer && "AI: "}{AiAnswer}</span>

                </p>
                <form onSubmit={handleSubmit} className={"w-full flex justify-center py-2 relative"}>
                    <input
                        // onChange={() => setInputErrors((prev) => ({ ...prev, username: false }))}
                        type="text"
                        ref={promptRef}
                        placeholder={"Ask To AI Teacher!"}
                        className={`rounded-xl text-black w-[95%] h-12 bg-gray-200 px-4`}
                    />
                    <button
                        className={"w-6 h-6 absolute inset-y-5 end-10"}
                        type={"submit"}
                    >
                        <img src="/assets/images/up-arrow.png" alt="submit" className={"w-5 h-5"}/>
                    </button>
                </form>
            </div>

        </div>
    );
}
