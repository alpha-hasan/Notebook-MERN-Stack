import { useState } from 'react';
import NoteContext from './NoteContext';

const AlertState = (props) => {

    const [alert, setAlert] = useState(null);

    // Alert Factory Start

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)

        }, 1000);
    }

    // Alert Factory End

    return (
        <NoteContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default AlertState