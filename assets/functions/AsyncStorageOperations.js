import { AsyncStorage, Alert } from 'react-native';

import { sortArray } from './Array';

export const asyncStorageOperation = async (operation, itemToAdd, itemToRemove) => {
    return AsyncStorage.getItem("TodoList")
    .then(array => {
        if(array !== null){
            array = JSON.parse(array);
            
            if(operation === "read"){
                return sortArray(array);
            }
            else if(operation === "add" && itemToAdd){         
                array.push(itemToAdd);
                return AsyncStorage.setItem("TodoList", JSON.stringify(array));
            }
            else if(operation === "remove" && itemToRemove){
                for(let i = 0; i < array.length; i++){
                    itemToRemove === array[i].key && array.splice(i, 1);
                }
                return AsyncStorage.setItem("TodoList", JSON.stringify(array));
            }
            else return null;
        }else setFirstTime()
    })
    .catch(failureCallback)
}

const setFirstTime = () => {
    AsyncStorage.setItem("TodoList", "[]");
}

export const failureCallback = e => {
    Alert.alert(`Error occured: ${e.message}`)
}