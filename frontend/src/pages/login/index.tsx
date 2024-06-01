import React, {useEffect, useRef, useState} from 'react'
import {useRouter} from "next/router"
import Link from "next/link";
import {alertError} from "@/functions/alertFunctions";
import HttpRequest from "@/requests/HttpRequest";

export default function Login() {

    const router = useRouter()

    const [inputErrors, setInputErrors] = useState({
        username: false,
        password: false,
    });
    const [isPass, setIsPass] = useState(true)

    const usernameRef = useRef<any>()
    const passwordRef = useRef<any>()

    useEffect(() => {
        if(localStorage.jwt){
            router.push("/")
        }
    }, [])

    async function handleSubmit(e: any) {
        e.preventDefault()
        let hasErr = false

        if (passwordRef.current.value === '') {
            setInputErrors((prev) => ({ ...prev, password: true }));
            alertError('E-mail cannot be empty');
            hasErr=true
        }
        if (usernameRef.current.value === '') {
            setInputErrors((prev) => ({ ...prev, username: true }));
            alertError('Password cannot be empty');
            hasErr=true
        }

        if(hasErr) return

        const objData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        try{
            const responseData: any = await HttpRequest.post('/loginUser', objData)

            if(responseData.error){
                alertError(responseData.error)

            }else{
                localStorage.setItem('jwt', JSON.stringify(responseData))
                await router.push("/")
            }
            return
        }
        catch (e: any){
            console.log(e)
            alertError(e.code)
        }

        if(hasErr) return
    }


        return (
        <main className="gridMain flex items-center justify-center bg-[#f6f5f7]">
            <form onSubmit={handleSubmit} className={"bg-white glassMorphism w-96 h-96 rounded-2xl flex flex-col items-center justify-center gap-8"}>
                <h1 className="font-bold text-4xl ">Sing In</h1>

                <div className={"relative w-[70%]"}>
                    <input
                        onChange={() => setInputErrors((prev) => ({ ...prev, username: false }))}
                        type="text" ref={usernameRef}
                        placeholder={"username"}
                        className={`text-black w-full h-11 bg-[#f4f4f4] p-4 pe-12 rounded-2xl text-sm shadow-sm ${inputErrors.username && '!border-[red] border-[1px]'}`}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                </span>
                </div>
                <div className={"relative w-[70%]"}>
                    <input
                        onChange={() => setInputErrors((prev) => ({ ...prev, password: false }))}
                        ref={passwordRef} type={isPass ? "password": "text"}
                        placeholder={"password"}
                        className={`text-black w-full h-11 bg-[#f4f4f4] p-4 pe-12 rounded-2xl text-sm shadow-sm ${inputErrors.password && '!border-[red] border-[1px]'}`}
                    />
                    <span onClick={() => setIsPass(prev => !prev)} className="cursor-pointer absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                      </span>
                </div>
                <button
                    type="submit"
                    className="block w-[40%] rounded-3xl hover:bg-purple-blue-hover bg-purple-blue px-5 py-3 text-sm font-medium text-white"
                >
                    Sign In
                </button>

                <span className="text-sm text-gray-900">Don't Have an Account?<Link href={"/signup"} className={"text-[#27B1B2] hover:text-[#188e8e]"}> Sign Up!</Link></span>

            </form>
        </main>
    );
}

