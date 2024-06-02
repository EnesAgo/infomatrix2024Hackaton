import React from 'react'
import Link from "next/link";
import {useRouter} from "next/router";

export default function Sidebar({ tab }: any) {

    const router = useRouter()
    function logOut() {
        localStorage.setItem('jwt', '');
        return router.replace('/login')
    }

    return (
        <div className="gridHeader bg-white h-[100%] w-[275px] glassMorphism flex items-center justify-center py-7">
            <div className={"h-full w-[80%] flex flex-col gap-14 justify-start items-center"}>
                <div className="flex items-center h-12 gap-1">
                    <img src="/assets/images/settings.svg" alt="settings icon" className="w-12 h-12" />
                    <h2 className="text-2xl font-semibold font-Poppins">Dashboard</h2>
                </div>
                <ul className={"flex flex-col items-center gap-8 w-full"}>
                    <li className={"w-[70%]"}>
                        <Link href={"/"} className={`flex gap-4 items-center ${tab=="home" ? "opacity-100 underline underline-offset-[5px]" : "opacity-50"} hover:opacity-100`}>
                            <img src="/assets/images/home.png" alt="settings icon" className="w-6 h-6" />
                            <p
                                // className={"text-[rgba(0,0,0,.35)] hover:text-gray-800"}
                            >Home</p>
                        </Link>
                    </li>
                    <li className={"w-[70%]"}>
                        <Link href={"/discuss"} className={`flex gap-4 items-center ${tab=="discuss" ? "opacity-100 underline underline-offset-[5px]" : "opacity-50"} hover:opacity-100`}>
                            <img src="/assets/images/chat.png" alt="settings icon" className="w-6 h-6" />
                            <p
                                // className={"text-[rgba(0,0,0,.35)] hover:text-gray-800"}
                            >Discuss</p>
                        </Link>
                    </li>
                    <li className={"w-[70%]"}>
                        <Link href={"/tech-news"} className={`flex gap-4 items-center ${tab=="techNews" ? "opacity-100 underline underline-offset-[5px]" : "opacity-50"} hover:opacity-100`}>
                            <img src="/assets/images/news.png" alt="settings icon" className="w-6 h-6" />
                            <p
                                // className={"text-[rgba(0,0,0,.35)] hover:text-gray-800"}
                            >Tech News</p>
                        </Link>
                    </li>
                    <li className={"w-[70%]"}>
                        <Link href={"/books"} className={`flex gap-4 items-center ${tab=="books" ? "opacity-100 underline underline-offset-[5px]" : "opacity-50"} hover:opacity-100`}>
                            <img src="/assets/images/book.png" alt="settings icon" className="w-6 h-6" />
                            <p
                                // className={"text-[rgba(0,0,0,.35)] hover:text-gray-800"}
                            >Books</p>
                        </Link>
                    </li>
                    <li className={"w-[70%]"}>
                        <span onClick={() => logOut()} className={`flex gap-4 items-center cursor-pointer opacity-50 hover:opacity-100`}>
                            <img src="/assets/images/logout.png" alt="settings icon" className="w-7 h-7" />
                            <p
                                // className={"text-[rgba(0,0,0,.35)] hover:text-gray-800"}
                            >Log Out</p>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
