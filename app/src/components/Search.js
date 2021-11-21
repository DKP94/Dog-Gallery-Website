import React, { useState } from 'react'

function Search({placeholder='Type here', callback}) {
    const [value, setValue]=useState('');

    function onInputChange(input){
        let timer;
        clearTimeout(timer)
        setValue(input);
        timer = setTimeout(()=>{
            callback(input);
        },500)
        
    }
    
    return (        
            <input className="search_input" type="text" value={value} onChange={(e)=>onInputChange(e.target.value)} placeholder={placeholder}/>            
        
    )
}

export default Search;
