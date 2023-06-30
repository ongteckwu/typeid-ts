import { expect } from 'chai'
import { from, generateNew, transform } from '../src/lib/basics.js'
import { decodeFromString } from '../src/lib/decoders.js'
import { uuidv7 } from 'uuidv7'
import { encodeFromUUID } from '../src/lib/encoders.js'

describe('TypeId Tests', () => {

    it('Should create a new typeId', () => {
        const tid = transform(generateNew('prefix'))
        expect(tid.prefix).to.equal('prefix')
        console.log(`New typeid: ${tid}`)
    })

    it('Should create a new typeId without prefix', () => {
        const tid = transform(generateNew(''))
        expect(tid.prefix).to.equal('')
        console.log(`New typeid without prefix: ${tid}`)
    })

    it('Should create typeId from string', () => {
        const tid = transform('prefix_00041061050r3gg28a1c60t3gf')
        expect(tid.prefix).to.equal('prefix')
        expect(tid.suffix).to.equal('00041061050r3gg28a1c60t3gf')
    })

    const invalidPrefixes = [
        ['caps', 'PREFIX'],
        ['numeric', '12323'],
        ['symbols', 'pre.fix'],
        ['spaces', '  '],
        ['long', 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz']
    ]

    invalidPrefixes.forEach(([name, input]) => {
        it(`Should fail for invalid prefix: ${name}`, () => {
            expect(() => generateNew(input)).to.throw(Error)
        })
    })

    const invalidSuffixes = [
        ['spaces', '  '],
        ['short', '01234'],
        ['long', '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'],
        ['caps', '00041061050R3GG28A1C60T3GF'],
        ['hyphens', '00041061050-3gg28a1-60t3gf'],
        ['crockford_ambiguous', 'ooo41o61o5or3gg28a1c6ot3gi'],
        ['symbols', '00041061050.3gg28a1_60t3gf'],
        ['wrong_alphabet', 'ooooooiiiiiiuuuuuuulllllll'],
    ]

    invalidSuffixes.forEach(([name, input]) => {
        it(`Should fail for invalid suffix: ${name}`, () => {
            expect(() => from('prefix', input)).to.throw(Error, `Invalid suffix: ${input}`)
        })
    })

    it('Should correctly encode and decode', () => {
        for (let i = 0; i < 1000; i++) {
            const uuid = uuidv7()
            const tidStr = encodeFromUUID('prefix', uuid)
            const decoded = decodeFromString(tidStr)
            expect(uuid).to.equal(decoded.uuid)
        }
    })

    it('Should correctly encode and decode with empty prefix', () => {
        for (let i = 0; i < 1000; i++) {
            const uuid = uuidv7()
            const tidStr = encodeFromUUID('prefix', uuid)
            const decoded = decodeFromString(tidStr)
            expect(uuid).to.equal(decoded.uuid)
        }
    })
})