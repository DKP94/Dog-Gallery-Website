import React, {useState, useEffect} from 'react'

function DogCard({src , name='', callback=()=>{} }) {   
    const [ url, setUrl] = useState("");

    useEffect(()=>{
        setUrl(src);
    },[src]);

    const onCardClick = (value)=>{
        callback(value);
    }

    return (
        <div className='dogCard' onClick={()=>{onCardClick(name)}} data-testid='dog_card'>
            <div className='card_inner'>
                <div className='card_image'>
                  { url ? <img src={url} alt={name} width="180px" height="200px"/>   : null }
                </div>                  
                <label>{name}</label>  
            </div>     
        </div>
    )
}

export default DogCard;

