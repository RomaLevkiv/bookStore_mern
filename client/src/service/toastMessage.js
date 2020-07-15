// import { useCallback } from "react"
export const toastMessage = (text) => {
    if(window.M && text) {
       window.M.toast({html: text})
    }
}