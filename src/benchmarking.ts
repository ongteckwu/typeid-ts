import { uuidv7 } from 'uuidv7'
import { generateNew } from '../src/lib/basics.js'
import { encodeFromUUID } from '../src/lib/encoders.js'
import { decodeFromString } from '../src/lib/decoders.js'

describe('TypeId Tests', () => {
    it('Should benchmark New', () => {
        for (let i = 0; i < 100000; i++) {
            generateNew('prefix')
        }
    })

    it('Should benchmark Encode and Decode', () => {
        for (let i = 0; i < 100000; i++) {
            const uuid = uuidv7()
            const tidStr = encodeFromUUID('prefix', uuid)
            const decoded = decodeFromString(tidStr)
            decoded
        }
    })
})