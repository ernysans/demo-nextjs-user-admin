// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {TextDecoder, TextEncoder} from 'util';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// jest-setup.ts
jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}));