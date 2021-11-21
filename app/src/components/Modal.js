import React,{useState} from 'react'
import CustomSearchFilter from './CustomSearchFilter';
import ModalHeader from './ModalHeader';
import MoreImages from './MoreImages';
import SubBreedList from './SubBreedList';

function Modal({close, breed, customSearch, onBreedSelection,dropDownOptions}) {
    const [count,setCount] = useState(0)

    const getImages = (breed,count) =>{
        console.log('enabled')
        if(breed){
            onBreedSelection(breed);
        }        
        setCount(count);               
    }

    return (
        <div className="modal">
            <ModalHeader text={customSearch ? 'Custom Search' : `${breed.name}`} close={close}/>
            { customSearch ? 
                <CustomSearchFilter dropdownOptions={dropDownOptions} callback={getImages}/>
                : <SubBreedList breed={breed} callback={()=>{}}/> 
            }
            <ModalHeader 
            text={customSearch ? (count && breed.name) ? `Showing ${count} images of ${breed.name}` : 'Please select a breed and enter count of images in range 1 - 100' :`more images of ${breed.name}`}/>          
            <MoreImages breedName={breed.name} count={customSearch ? count : 3}/>  
        </div>
    )
}

export default Modal;
