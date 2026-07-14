export const normalizedString = (input: string): string => {
    return input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase() //

}

// https://gist.github.com/himanshuchandola/ef2120b2bf7cadb36fa363b2f4b9336a
// set localStorage data
export const setLocalStorageData = (key: string, value: any) => {
    try {
        const localStorageValue = JSON.stringify(value);
        localStorage.setItem(key, localStorageValue);
    } catch (error) { }
};

//get localStorage data
export const getLocalStorageData = (key: string, fallback: any) => {
    try {
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue ? JSON.parse(localStorageValue) : fallback;
    } catch (error) {
        return fallback;
    }
};

// clearing localStorage data
export const clearLocalStorageData = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) { }
};