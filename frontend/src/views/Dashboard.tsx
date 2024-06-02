import React, {useEffect, useState} from 'react'
import {requestBaseUrl} from "@/requests/constants";
import MathQuestions from "@/components/Dashboard/MathQuestions";
import GPT from "@/components/Dashboard/GPT";


export async function getServerSideProps(){
    try{
        const response: any = await fetch(`${requestBaseUrl}/mathQuestion`)
        const data: any = await response.json()

        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                data: [],
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}

export default function Dashboard({ data, error }: any) {

    const [userData, setUserData] = useState<any>()
    const [mathQuestion, setMathQuestion] = useState<any>()

    async function getMathQuestion(){
        const response: any = await fetch(`${requestBaseUrl}/mathQuestion`)
        const resData: any = await response.json()

        console.log(resData)

        setMathQuestion(resData)
    }

    useEffect(() => {
        if(localStorage){
            setUserData(JSON.parse(localStorage.jwt))
        }

        if(error || !data){
            console.log(error)
            getMathQuestion()
        } else{
            console.log(data)
            setMathQuestion(data)
        }


    }, [])





    return (
        <div className="gridMain bg-[#f6f5f7] flex items-center justify-center py-7">
            <div className="w-[90%] h-full flex flex-col gap-6">

                <div className={"w-full h-12 flex items-center"}>
                    <h1 className={"font-medium text-xl text-black"} >Hello {userData?.username} 👋🏼</h1>
                </div>

                <MathQuestions question={mathQuestion} generate={getMathQuestion} />

                <GPT />

            </div>
        </div>
    );
}
