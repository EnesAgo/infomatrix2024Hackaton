import React from 'react'
import Sidebar from "@/views/Sidebar";
import BooksDashboard from "@/views/BooksDashboard";

export default function TechNews() {
    return (
        <>
            <Sidebar tab={"books"} />
            <BooksDashboard />
        </>
    );
}
