import React from 'react'
import Dashboard from "@/views/Dashboard";
import Sidebar from "@/views/Sidebar";
import Chat from "@/views/Chat";

export default function Discuss() {
    return (
        <>
            <Sidebar tab={"discuss"} />
            <Chat />
        </>
    );
}
