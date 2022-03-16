
const Notification = ({message}) => {

    const errorStyle = {
        color:'red',
    }

    const successStyle = {
        color:'green',
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
                <div style={successStyle}>{message.content}</div>
            </>
        )
    }
    
}

export {Notification}

    
