function wrap(callback){
    try {
        return callback();
    } catch {}
}

export function getCachedValue(key){
    return wrap(() => JSON.parse(localStorage.getItem(key) || "null"));
}

export function setCachedValue(key, value){
    return wrap(() => JSON.parse(localStorage.setItem(key, JSON.stringify(value))));
}