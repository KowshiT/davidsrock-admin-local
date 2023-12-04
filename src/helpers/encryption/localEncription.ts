export const setLocal = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    throw error;
  }
};

export const getLocal = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    throw error;
  }
};

const encrypt = (str:string) => { 
    
    return str;
}

const decrypt = (str:string) => { 
    
    return str;
}
