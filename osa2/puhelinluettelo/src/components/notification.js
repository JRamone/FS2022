import { useState } from "react"

const Notification = () => {

    const notify = (message) => {
        setMessage(message)
    }

    const [message,setMessage] = useState({type:'error',content:''})

    const errorStyle = {
        color:'red',
        padding:200
    }

    const successStyle = {
        color:'green',
        padding:500
    }


    if(message.content === ''){
        return <></>
    }

    else if (message.type === 'error') {
        return (
            <>
                <div style={errorStyle}>{message.content}</div>
            </>
        )
    }

    else if (message.type === 'success') {
        return (
            <>
                <div style={errorStyle}>{message.content}</div>
            </>
        )
    }
    
}

export {Notification}

    
