import React, {useEffect, useState} from 'react'
import Sidebar from "@/views/Sidebar";
import ChatRoom from "@/components/Discuss/ChatRoom";
import OneTechNews from "@/components/TechNews/OneTechNews";
import axios from "axios";
import HttpRequest from "@/requests/HttpRequest";

export default function TechNewsUI() {
    const [userData, setUserData] = useState<any>()
    const [techNews, setTechNews] = useState<any>()


    const sampleData = [
        {
            "title": "Report: 90% of IT execs are embracing SASE migrations",
            "img": "https://venturebeat.com/wp-content/uploads/2021/05/GettyImages-1180183363-e1636482579984.jpg?resize=350%2C175&strip=all",
            "dateTime": "November 11, 2021 4:40 PM",
            "link": "https://venturebeat.com/2021/11/11/report-90-of-it-execs-are-embracing-sase-migrations/"
        },
        {
            "title": "Google Research changes the game for medical imaging with self-supervised learning",
            "img": "https://venturebeat.com/wp-content/uploads/2018/04/shutterstock_734378278-e1636485612226.jpg?resize=350%2C175&strip=all",
            "dateTime": "November 11, 2021 2:20 PM",
            "link": "https://venturebeat.com/2021/11/11/google-research-changes-the-game-for-medical-imaging-with-self-supervised-learning/"
        },
        {
            "title": "How Tonal is turning media landscape upheaval into opportunity",
            "img": "https://venturebeat.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-11-at-4.58.47-PM.png?resize=350%2C175&strip=all",
            "dateTime": "November 11, 2021 2:20 PM",
            "link": "https://venturebeat.com/2021/11/11/how-tonal-is-turning-media-landscape-upheaval-into-opportunity/"
        }
    ]

    useEffect(() => {
        if (localStorage) {
            setUserData(JSON.parse(localStorage.jwt))
        }

        getNews()

    }, [])

    async function getNews(){

        const apiKey = "6c1cc67c14e544bcbacbcb04829992a5"
        const uri = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`

        try {
            const response = await HttpRequest.get(uri);
            console.log(response);
            setTechNews(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="gridMain bg-[#f6f5f7] flex items-center justify-center py-7">
            <div className="w-[90%] h-full flex flex-col gap-6">

                <div className={"w-full h-12 flex items-center"}>
                    <h1 className={"font-medium text-xl text-black"} >Tech News 🗞️</h1>
                </div>

                <div className="w-[90%] min-h-12 h-auto bg-white glassMorphism rounded-2xl flex flex-col p-10 px-12 items-center gap-5">
                    {techNews && techNews.articles.map((el:any, index:any) => (
                        <>
                            <OneTechNews data={el} />

                            <hr className={`w-full`} />

                        </>
                    ))}
                </div>





            </div>
        </div>
    );
}
