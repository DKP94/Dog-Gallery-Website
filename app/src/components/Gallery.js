import React,{useState, useEffect, useCallback} from 'react'
import DogList from './DogList'
import Search from './Search';
import Modal from './Modal';
import api from '../api/api';

function Gallery() {
    const [allBreeds,setAllBreeds]=useState([]);
    const [filteredBreeds,setFilteredBreeds] = useState([]); 
    const [selectedBreed, setSetlectedBreed] = useState({});
    const [customSearch,setCustomSearch] = useState(false);
    const [showSubBreedGallery,setShowSubBreedGallery] = useState(false);


    const loadAllDogs =  useCallback(async () => {
        try{
            const data = await api.getAllDogsList();
            console.log(data)
            setAllBreeds(data);
            setFilteredBreeds(data); 
        }catch(error){
            console.log(error);
        }  
    },[]);

    useEffect(() => {
        loadAllDogs();                        
    }, [loadAllDogs]);   

    const onFilterChange  = (name) => {
        let filteredList = allBreeds.filter(item=>item.name.search(name)>-1) ;
        setFilteredBreeds(filteredList);  
    }
    const onCardClick = (name)=>{          
        onBreedSelection(name)      
        setShowSubBreedGallery(true);
    }
    const onBreedSelection = (name) => {
        let selection = allBreeds.filter(item=>item.name===name);
        setSetlectedBreed(selection[0]);  
    }
    const onClose = () =>{
        setSetlectedBreed({});
        setShowSubBreedGallery(false);
        setCustomSearch(false);
    }
    const toggleCustomSearch = (value)=>{
        setCustomSearch(value);
    }
    return (
        <div data-testid="photogallery">
            <button className="btn_class" onClick={()=>{toggleCustomSearch(true)}}>Custom Search</button>
            <div className="gallery">
                <div className="search" data-testid="custom_filter">
                    <Search placeholder="Type here to filter by Breed..." callback={onFilterChange}/>
                </div>
                <div className="dogList">
                    <DogList breeds={filteredBreeds} callback={onCardClick}/>                    
                </div>                       
            </div>
            {
                (showSubBreedGallery || customSearch) ? <div className='subbreed_gallery popup_class' data-testid="modal_popup">                            
                <Modal 
                    customSearch = {customSearch}
                    breed={selectedBreed}
                    onBreedSelection={onBreedSelection}
                    dropDownOptions={allBreeds.map(item=>item.name)}
                    close={onClose}
                />
            </div> : null
            }
        </div>
    )
}

export default Gallery;
