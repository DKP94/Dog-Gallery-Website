import React,{useState,useEffect, useCallback} from 'react'
import DogList from './DogList';
import api from '../api/api' ;

function SubBreedList({breed,callback}) {
    const [subBreed, setSubBreed] = useState([]);     

    const loadSubBreedList =  useCallback(async () => {
        try{
            const data = await api.getSubBreedList(breed);
            setSubBreed(data);
        }catch(error){
            console.log(error);
        }  
    },[breed]);

    useEffect(() => {
        loadSubBreedList();                        
    }, [breed,loadSubBreedList]);   
    
    return (
        <div className="subbreed_List">
           { breed.subbreeds.length ?
            <DogList breeds={subBreed} callback={callback}/>
            : <p>Sub Breeds information not available</p>
        }    
        </div>
    )
}

export default SubBreedList;
