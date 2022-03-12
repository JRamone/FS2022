
const Notification = ({message,setMessage}) => {

    if(message.content === ''){
        return null
    }

    else if (message.type === 'error') {
        return (
            <>
                <div>error</div>
            </>
        )
    }

    else if (message.type === 'success') {
        return (
            <>
                <div>success</div>
            </>
        )
    }
}

export default {
    Notification
}