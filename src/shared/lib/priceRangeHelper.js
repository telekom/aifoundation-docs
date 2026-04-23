export function isPriceInRange(value, min, max) {
    if (value == null) {
        return false;
    }

    if (max == null) {
        return value >= min;
    }

    return value >= min && value <= max;
}

export function areModelPricesInRange(model, min, max) {
    return isPriceInRange(model.inputPrice, min, max) && isPriceInRange(model.outputPrice, min, max);
}