import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";
const Alert = () => {
    const context = useContext(NoteContext);
    return (
        <div style={{ height: '50px' }}>
            {context.alert && <div className={`alert alert-${context.alert.type} alert-dismissible fade show`} role="alert">
                {context.alert.msg}
            </div>}
        </div>
    )
}

export default Alert