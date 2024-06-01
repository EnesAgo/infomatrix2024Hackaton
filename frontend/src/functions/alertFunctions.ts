import {toast} from "react-toastify";
import {TAlertPositionType, TAlertThemeType} from "@/@types/types";

export const alertDefault = (msg: any, theme: TAlertThemeType = 'light', position: TAlertPositionType = 'top-right') =>
    toast(msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });

export const alertError = (msg: any, theme: TAlertThemeType = 'light', position: TAlertPositionType = 'top-right') =>
    toast.error(msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });

export const alertWarning = (msg: any, theme: TAlertThemeType = 'light', position: TAlertPositionType = 'top-right') =>
    toast.warning(msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });

export const alertSuccess = (msg: any, theme: TAlertThemeType = 'light', position: TAlertPositionType = 'top-right') =>
    toast.success(msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });

export const alertInfo = (msg: any, theme: TAlertThemeType = 'light', position: TAlertPositionType = 'top-right') =>
    toast.info(msg, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
    });