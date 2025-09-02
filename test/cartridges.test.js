import { calculateDiscount } from '../cartridges/cartridges.js';

describe('Cartridges tests', () => {

    /**
     * Positive testing
     */

    // Valid equivalence partitions: 5-99 and 100-MAX INTEGER
    const calculateDiscountPassesProvider = [
        {'cartridges': 5, 'discount': 0},           // Partition 5-99: lower valid boundary
        {'cartridges': 6, 'discount': 0},
        {'cartridges': 47, 'discount': 0},
        {'cartridges': 98, 'discount': 0},
        {'cartridges': 99, 'discount': 0},          // Partition 5-99: upper valid boundary
        {'cartridges': 100, 'discount': 0.2},       // Partition 100-MAX INTEGER: lower valid boundary
        {'cartridges': 101, 'discount': 0.2},
        {'cartridges': 167, 'discount': 0.2},
    ];
    describe.each(calculateDiscountPassesProvider)('Calculate discount passes', (param) => {
        it(`${param.cartridges} cartridges yield ${param.discount} discount`, () => {
            expect(calculateDiscount(param.cartridges)).toBe(param.discount);
        });
    });

    /**
     * Negative testing
     */    

    const calculateDiscountFailsProvider = [
        -15, -2, -1,        // Invalid equivalence partition: MIN INTEGER - -1
        0,                  // Invalid equivalence partition: 0
        1, 2, 3, 4,         // Invalid equivalence partition: 1-4
        -1, -10, -167       // Edge cases
    ];
    describe.each(calculateDiscountFailsProvider)('Calculate discount fails', (cartridges) => {
        it(`${cartridges} is below the minimum`, () => {
            expect(() => calculateDiscount(cartridges)).toThrow('The minimum order quantity is 5.');
        });
    });

    const calculateDiscountPassesWrongDataTypeProvider = [
        {'cartridges': 167.3, 'discount': 0.2},     // Edge case: implies float to int conversion
        {'cartridges': '167', 'discount': 0.2},     // Edge case: implies string to int conversion
        {'cartridges': '167.3', 'discount': 0.2},   // Edge case: implies string containing float to int conversion
    ];
    describe.each(calculateDiscountPassesWrongDataTypeProvider)('Calculate discount passes with wrong data types', (param) => {
        it(`${param.cartridges} cartridges yield ${param.discount} discount`, () => {
            expect(calculateDiscount(param.cartridges)).toBe(param.discount);
        });
    });

    // Data type-based edge cases
    const calculateDiscountWrongDataTypeFailsProvider = [
        'Hello', new Date()
    ];
    describe.each(calculateDiscountWrongDataTypeFailsProvider)('Calculate discount based on a wrong data type fails', (cartridges) => {
        it(`${cartridges} has the wrong data type`, () => {
            expect(() => calculateDiscount(cartridges)).toThrow('Incorrect data type.');
        });
    });
});