/**
 * Mathematical operations utility module.
 * Provides comprehensive implementations for basic arithmetic operations
 * with validation, error handling, and high precision support.
 */

/**
 * Performs a subtraction operation between two numbers (minuend - subtrahend).
 * 
 * Mathematical Definition:
 * Subtraction is the arithmetic operation that represents the operation of removing objects from a collection.
 * It is signified by the minus sign (−). For example, in the expression 5 − 2 = 3:
 * - 5 is the minuend (the number being subtracted from)
 * - 2 is the subtrahend (the number being subtracted)
 * - 3 is the difference (the result)
 * 
 * Formal definition: For any real numbers a and b, a - b = a + (-b).
 * 
 * Performance Considerations:
 * - This function operates in O(1) time complexity.
 * - For extremely large numbers exceeding Number.MAX_SAFE_INTEGER, precision may be lost.
 *   In such cases, BigInt should be used, but this implementation focuses on standard Number type
 *   typically used in web applications.
 * - Floating point arithmetic issues (e.g., 0.3 - 0.1) are handled by fixing precision to 10 decimal places
 *   and parsing back to number to avoid common JS math errors, while stripping unnecessary trailing zeros.
 * 
 * @param {number|string} minuend - The number to be subtracted from.
 * @param {number|string} subtrahend - The number to subtract.
 * @returns {number} The difference between the minuend and subtrahend.
 * @throws {Error} If inputs are not valid numbers or cannot be parsed into numbers.
 * 
 * @example
 * subtract(10, 4); // returns 6
 * subtract(5.5, 2.2); // returns 3.3
 * subtract(-5, -2); // returns -3
 */
export const subtract = (minuend, subtrahend) => {
    // Input validation
    if (minuend === null || minuend === undefined || subtrahend === null || subtrahend === undefined) {
        throw new Error('Inputs cannot be null or undefined.');
    }

    const num1 = Number(minuend);
    const num2 = Number(subtrahend);

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid input: Arguments must be valid numbers.');
    }

    // Perform subtraction
    const result = num1 - num2;

    // Handle floating point precision issues (e.g. 0.3 - 0.1 = 0.19999999999999998)
    // We fix to 12 decimal places to handle most precision cases without losing too much data,
    // then parse back to float to remove trailing zeros.
    return parseFloat(result.toFixed(12));
};

/**
 * Validates if a subtraction result is correct.
 * 
 * @param {number} minuend 
 * @param {number} subtrahend 
 * @param {number} proposedDifference 
 * @returns {boolean} True if the difference is correct.
 */
export const validateSubtraction = (minuend, subtrahend, proposedDifference) => {
    try {
        const actualDifference = subtract(minuend, subtrahend);
        // Handle floating point comparison with a small epsilon
        return Math.abs(actualDifference - Number(proposedDifference)) < Number.EPSILON;
    } catch (error) {
        return false;
    }
};
