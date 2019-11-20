import { useState, useEffect} from "react"

export default function useWindowSize(){
    const [[width, height], setWindowWidth] = useState([window.innerWidth, window.innerHeight])

    useEffect(()=>{
        const handleResize = () => {
            setWindowWidth([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize', handleResize)
        return()=> window.removeEventListener('resize')
    },[])

    return [width, height]

}