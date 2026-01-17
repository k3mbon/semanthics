import { describe, it, expect } from 'vitest';
import { subtract, validateSubtraction } from './mathOperations';

describe('Math Operations - Subtraction', () => {
    describe('Basic Operations', () => {
        it('should correctly subtract two positive integers', () => {
            expect(subtract(10, 4)).toBe(6);
            expect(subtract(100, 25)).toBe(75);
        });

        it('should correctly subtract when result is zero', () => {
            expect(subtract(5, 5)).toBe(0);
        });
    });

    describe('Negative Number Operations', () => {
        it('should correctly subtract with negative minuend', () => {
            expect(subtract(-10, 5)).toBe(-15);
        });

        it('should correctly subtract with negative subtrahend (double negative)', () => {
            expect(subtract(10, -5)).toBe(15);
        });

        it('should correctly subtract two negative numbers', () => {
            expect(subtract(-10, -5)).toBe(-5);
        });
    });

    describe('Decimal Number Operations', () => {
        it('should correctly subtract decimal numbers', () => {
            expect(subtract(5.5, 2.2)).toBe(3.3);
        });

        it('should handle floating point precision issues', () => {
            // 0.3 - 0.1 is usually 0.19999999999999998 in JS
            expect(subtract(0.3, 0.1)).toBe(0.2);
        });
    });

    describe('Edge Cases and Validation', () => {
        it('should handle string inputs that are valid numbers', () => {
            expect(subtract('10', '4')).toBe(6);
        });

        it('should throw error for invalid string inputs', () => {
            expect(() => subtract('abc', 1)).toThrow('Invalid input: Arguments must be valid numbers.');
        });

        it('should throw error for null or undefined inputs', () => {
            expect(() => subtract(null, 1)).toThrow('Inputs cannot be null or undefined.');
            expect(() => subtract(1, undefined)).toThrow('Inputs cannot be null or undefined.');
        });

        it('should handle large numbers', () => {
            expect(subtract(1000000, 1)).toBe(999999);
            // Safe integer limit check
            const maxSafe = Number.MAX_SAFE_INTEGER;
            expect(subtract(maxSafe, 1)).toBe(maxSafe - 1);
        });
    });

    describe('validateSubtraction Helper', () => {
        it('should return true for correct subtraction', () => {
            expect(validateSubtraction(10, 4, 6)).toBe(true);
        });

        it('should return false for incorrect subtraction', () => {
            expect(validateSubtraction(10, 4, 5)).toBe(false);
        });

        it('should handle string inputs correctly', () => {
            expect(validateSubtraction('10', '4', '6')).toBe(true);
        });
    });
});
