import React, {useState} from 'react'
import Link from "next/link";

export default function OneBook({ data }: any) {

    return (
        <div className="w-full min-h-40 flex  gap-4">

            <div className={"w-[40%]"}>
                <img className={"h-60"} src={data.image} alt={data.title}/>
            </div>

            <div className={"h-full w-[60%] flex flex-col justify-evenly py-5"}>
                <h2 className="font-bold text-2xl underline !font-roboto">{data.title}</h2>
                <p>{data.author}</p>
                {/*<p>{data.fisrtSentence && data.fisrtSentence}</p>*/}
            </div>

        </div>
    );
}
