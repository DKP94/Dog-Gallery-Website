import React,{ useState ,useEffect,useCallback} from 'react';
import DogCard from './DogCard';
import api from '../api/api' ;

function MoreImages({breedName , count}) {
    const [imgUrls, setImageUrls]=useState([]);

    const loadImages = useCallback(async () => {
        try{
            const data = await api.getImages(breedName,count);
            setImageUrls(data);
        }catch(error){
            console.log(error);
        }  
    },[breedName,count]);

    useEffect(() => {
        if(breedName && count){
            loadImages();                      
        }        
    }, [breedName,count, loadImages]);
    return (
        <div className="more_images">   
        { 
            imgUrls.map((item,index)=>{
                return ( <DogCard key={index} src={item} />  )
            }) 
        } 
        </div>
    )
}

export default MoreImages
