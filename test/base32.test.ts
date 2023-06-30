import { encode, decodeToNumber, decode } from '../src/base32.js'
import { bytesToUUIDString } from '../src/lib/decoders.js'
import { encodeFromUUID, uuidStringToBytes } from '../src/lib/encoders.js'
import { assert, expect } from 'chai'

describe('Base32 encoding and decoding', () => {
    it('Inverse', () => {
        const data = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
        ]

        const encoded = encode(data)
        assert.equal(encoded, '00041061050r3gg28a1c60t3gf')

        const decoded = decodeToNumber(encoded)
        assert.isNotNull(decoded)
        assert.deepEqual(decoded, data)
    })

    it('Encode', () => {
        const prefix = 'user'
        const data = '0188bac7-4afa-78aa-bc3b-bd1eef28d881'
        const encoded = encodeFromUUID(prefix, data)
        assert.equal(encoded, 'user_01h2xcejqtf2nbrexx3vqjhp41')
    })

    const specialValues = [
        ['nil', '00000000000000000000000000', '00000000-0000-0000-0000-000000000000'],
        ['one', '00000000000000000000000001', '00000000-0000-0000-0000-000000000001'],
        ['ten', '0000000000000000000000000a', '00000000-0000-0000-0000-00000000000a'],
        ['sixteen', '0000000000000000000000000g', '00000000-0000-0000-0000-000000000010'],
        ['thirty-two', '00000000000000000000000010', '00000000-0000-0000-0000-000000000020'],
    ]


    specialValues.forEach(([name, tid, uuid]) => {
        it(`Should handle special values: ${name}`, () => {
            // Values should be equal if we start by parsing the typeid
            const parsed = bytesToUUIDString(decode(tid))
            expect(parsed).to.equal(uuid)

            // Values should be equal if we start by parsing the uuid
            const resTid = encode(uuidStringToBytes(uuid))
            expect(resTid).to.equal(tid)
        })
    })
})