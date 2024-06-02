import React, {useEffect, useRef, useState} from 'react'
import Sidebar from "@/views/Sidebar";
import ChatRoom from "@/components/Discuss/ChatRoom";
import OneTechNews from "@/components/TechNews/OneTechNews";
import HttpRequest from "@/requests/HttpRequest";
import OneBook from "@/components/Books/OneBook";

export default function BooksDashboard() {
    const [userData, setUserData] = useState<any>()
    const [books, setBooks] = useState<any>()

    const bookUri = "https://openlibrary.org/search.json?title="

    const searchRef = useRef<any>()

    async function searchBooks(title:string){

        if(title.length==0) return

        try{
            const response = await fetch(`${bookUri}${encodeURIComponent(title)}`)
            const data = await response.json()
            console.log(data.docs[0])

            let arr = []

            for(let i=0; i<20; i++){


                    const bookObj = {
                        title: data.docs[i].title_suggest,
                        author: data.docs[i].author_name,
                        image: `https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-L.jpg`,
                        // fisrtSentence:  ""

                    }
                    arr.push(bookObj)


            }

            setBooks(arr)
            console.log(arr)

        }
        catch (e){
            console.log({error: e})
        }
    }

    useEffect(() => {
        if (localStorage) {
            setUserData(JSON.parse(localStorage.jwt))
        }

        searchBooks("the+lord+of+the+rings")


    }, [])

    return (
        <div className="gridMain bg-[#f6f5f7] flex items-center justify-center py-7">
            <div className="w-[90%] h-full flex flex-col gap-6">

                <div className={"w-[90%] h-12 flex items-center justify-between"}>
                    <h1 className={"font-medium text-xl text-black"} >Search Books 📚</h1>

                    <div className={"flex gap-3"}>
                        <input
                            ref={searchRef}
                            type={"text"}
                            placeholder={"Search..."}
                            className={`text-black w-72 h-11 bg-[#fff] p-4 pe-12 rounded-2xl text-sm shadow-sm `}
                        />
                        <button
                            onClick={() => {
                                searchBooks(searchRef.current.value);
                                searchRef.current.value = ''
                            }}
                            className="block w-[25%] rounded-3xl hover:bg-purple-blue-hover bg-purple-blue px-2 py-1 text-sm font-medium text-white"
                        >
                            Search
                        </button>
                    </div>
                </div>


                <div className="w-[90%] min-h-12 h-auto bg-white glassMorphism rounded-2xl flex flex-col p-10 px-12 items-center gap-5">
                    {books && books.map((el:any, index:any) => (
                        <>
                            <OneBook data={el} />

                            <hr className={`w-full`} />

                        </>
                    ))}
                </div>


            </div>
        </div>
    );
}
