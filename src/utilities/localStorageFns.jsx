export const setItemStorage = (name, data) => {
  return localStorage?.setItem(name, JSON.stringify(data));
};


export const getItemStorage = (name) => {
    return localStorage?.getItem(name)
}

export const getItemStorageParse = (name) => {
    return JSON.parse(localStorage?.getItem(name))
}

export const removeItemStorage = (name) => {
    return localStorage?.removeItem(name)
}

