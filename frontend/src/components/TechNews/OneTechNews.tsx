import React, {useState} from 'react'
import Link from "next/link";

export default function OneTechNews({ data }: any) {

    return (
        <div className="w-full min-h-40 flex gap-4">

            <img className={"w-80"} src={data.urlToImage} alt={data.title}/>

            <div className={"h-full w-auto flex flex-col justify-between py-5"}>
                <h2 className="font-bold text-2xl hover:underline !font-roboto">
                    <Link href={data.url}>{data.title}</Link>
                </h2>
                <p>{new Date(data.publishedAt).toLocaleString()}</p>
            </div>

        </div>
    );
}
