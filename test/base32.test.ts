import { encode, decode } from '../src/base32.js'
import { encodeFromUUID } from '../src/lib.js'
import { assert } from 'chai'

describe('Base32 encoding and decoding', () => {
    it('Inverse', () => {
        const data = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
        ]

        const encoded = encode(data)
        assert.equal(encoded, '00041061050r3gg28a1c60t3gf')

        const decoded = decode(encoded)
        assert.isNotNull(decoded)
        assert.deepEqual(decoded, data)
    })

    it('Encode', () => {
        const prefix = 'user'
        const data = '0188bac7-4afa-78aa-bc3b-bd1eef28d881'
        const encoded = encodeFromUUID(prefix, data)
        assert.equal(encoded, 'user_01h2xcejqtf2nbrexx3vqjhp41')
    })
})