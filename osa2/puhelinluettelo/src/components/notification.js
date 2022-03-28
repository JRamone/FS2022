
const Notification = ({message}) => {

    const errorStyle = {
        paddingTop:'20px',
        paddingBottom:'20px',
        height:'80px',
        textAlign: 'center',
        color:'red',
        backgroundColor:'Gainsboro',
        border:'3px solid green'
    }

    const successStyle = {
        paddingTop:'20px',
        paddingBottom:'20px',
        height:'80px',
        textAlign: 'center',
        color:'green',
        backgroundColor:'Gainsboro',
        border:'3px solid green'
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

    
