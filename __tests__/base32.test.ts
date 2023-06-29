import { encode, decode } from '../src/base32.js'

describe('Base32 encoding and decoding', () => {
    test('Inverse', () => {
        const data = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
        ]

        const encoded = encode(data)
        expect(encoded).toBe('00041061050r3gg28a1c60t3gf')

        const decoded = decode(encoded)
        expect(decoded).not.toBeNull()
        console.log(decoded)
        expect(decoded).toEqual(data)
    })
})