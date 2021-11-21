import React from 'react'

function ModalHeader({text,close}) {
    return (
        <div className="modal_header">
            <label>{text}</label>
            {close ? <div className="close_button" onClick={()=>{close()}}>X</div> : null}
        </div>
    )
}

export default ModalHeader;
