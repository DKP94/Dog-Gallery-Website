import { apiRequest } from './util';
import {Dog} from '../models/Dog';

async function getAllDogsList() {
    let list = await apiRequest('GET', '/breeds/list/all');
    console.log(list);
    let data = createDogObject(list);
    return data;
}


async function getImages(breed,count=1) {
    let data = await apiRequest('GET', '/breed/' + breed + '/images/random/' + count)
    return data;
}

async function getImagesOfSubBreeds(parent,child) {
    let data = await apiRequest('GET', '/breed/' + parent + '/' + child + '/images/random');  
    //console.log(data);
    return data;
}

async function createDogObject(data){
    let dogList =  [];
    for(const key in data){         
        let img = Promise.resolve(getImages(key))         
        let dog = new Dog(key,data[key],img);
        dogList.push(dog);                      
    }    
    let PromiseList = Promise.all(dogList.map(item=>item.imgurl)).then((values)=>{
        values.forEach((url,i)=>{
            dogList[i].imgurl = url;
        })
    }) 
    await PromiseList;
    return dogList
}

async function getSubBreedList(data){
    const dogList = [];
    const { name, subbreeds, imgurl} = {...data};
    for(let i=0; i<subbreeds.length;i++){         
        let img = Promise.resolve(getImagesOfSubBreeds(name,subbreeds[i]))         
        let dog = new Dog(subbreeds[i],[],img);
        dogList.push(dog);                      
    }    
    let PromiseList = Promise.all(dogList.map(item=>item.imgurl)).then((values)=>{
        values.forEach((url,i)=>{
            dogList[i].imgurl = url;
        })        
    }) ;
    await PromiseList;
    return dogList;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllDogsList: getAllDogsList,
  getImages: getImages,
  getImagesOfSubBreeds: getImagesOfSubBreeds,
  createDogObject : createDogObject,
  getSubBreedList : getSubBreedList
};