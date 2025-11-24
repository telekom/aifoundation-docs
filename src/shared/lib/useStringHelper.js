export function useCapitalizeFirstLetter(inputString) {
    if (inputString.toString().length === 0) {
        return inputString;
    }
    return inputString.toString().charAt(0).toUpperCase() + inputString.toString().slice(1);
}

export function formatNumberEuropean(count) {
    return count
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

