// The minimum order quantity is 5. There is a 20% discount for orders of 100 or more printer cartridges.
export const calculateDiscount = (cartridges) => {
    cartridges = parseInt(cartridges);
    if (isNaN(cartridges)) {
        throw new Error('Incorrect data type.');
    }
    if (cartridges < 5) {
        throw new Error('The minimum order quantity is 5.');
    }
    if (cartridges >= 100) {
        return 0.2;
    }
    return 0;
};