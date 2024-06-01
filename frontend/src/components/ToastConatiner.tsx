import React from 'react'
import {ToastContainer} from "react-toastify";

export default function ToastContainerDefault({alertTheme = 'light', alertPosition = 'top-right'}: any) {
    return (
        <ToastContainer
            position={alertPosition}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={alertTheme}
        />
    )
}