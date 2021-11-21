import React from 'react'
import DogCard from './DogCard';

function DogList({breeds, callback}) { 
    return (<React.Fragment>
        { 
            breeds.map((item,index)=>{
                return ( <DogCard key={item.name || index} name={item.name || ''} src={item.imgurl} callback={callback} />  )
            })
        } 
        </React.Fragment>        
    )
}

export default DogList;
