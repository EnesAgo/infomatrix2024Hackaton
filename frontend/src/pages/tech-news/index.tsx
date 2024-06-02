import React from 'react'
import Sidebar from "@/views/Sidebar";
import TechNewsUI from "@/views/TechNewsUI";

export default function TechNews() {
    return (
        <>
            <Sidebar tab={"techNews"} />
            <TechNewsUI/>
        </>
    );
}
