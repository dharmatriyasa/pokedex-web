import { useState, useEffect } from "react";

function wrap(callback){
    try {
        return callback();
    } catch {}
}

function getInitialValue(key, initialValue){
    const cachedValue = getCachedValue(key);
    return cachedValue || initialValue;
}

function getCachedValue(key){
    return wrap(() => JSON.parse(localStorage.getItem(key) || "null"));
}

function setCachedValue(key, value){
    return wrap(() => localStorage.setItem(key, JSON.stringify(value)));
}

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(getInitialValue(key, initialValue));
  
    useEffect(() => {
        const cachedValue = getCachedValue(key);
        setValue(cachedValue);
    }, [setValue]);
  
    useEffect(() => {
        setCachedValue(key, value);
    }, [value, key]);
  
    return [value, setValue];
  }
  
  export default useLocalStorage;
  