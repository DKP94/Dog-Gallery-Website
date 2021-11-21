import React, {useState, useEffect} from 'react';
import Search from './Search';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function CustomSearchFilter({dropdownOptions,callback}) {
    const [selectedBreed,setSetlectedBreed]=useState('');
    const [numberOfImages,setNumberOfImages]=useState(0);    

    const onInputChange = (value)=>{
        setNumberOfImages(value);
    }

    const onDropdownChange = (value)=>{
        setSetlectedBreed(value);
    }

    return (
        <div className="custom_search_filter"> 
            <div className="search_dropdown">
                <Dropdown 
                options={dropdownOptions} onChange={(e)=>{onDropdownChange(e.value)}} 
                placeholder='Select a breed' 
                />  
            </div>          
            <div className='custom_search_input'>
                <Search  callback={onInputChange} placeholder={'Number of images'}/>
            </div>
            <button 
               className="btn_filter"
               onClick={()=>{callback(selectedBreed,numberOfImages)}}
               disabled = {isNaN(numberOfImages) || !numberOfImages || numberOfImages<0 || numberOfImages >100 || !selectedBreed.length}
             >Get Images</button>              
        </div>
    )
}

export default CustomSearchFilter
