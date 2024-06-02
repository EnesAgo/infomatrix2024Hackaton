import React from 'react'
import Dashboard from "@/views/Dashboard";
import Sidebar from "@/views/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar tab={"home"} />
      <Dashboard />
    </>
  );
}
