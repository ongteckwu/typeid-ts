import { expect } from 'chai'
import { generateNew, transform } from '../../src/lib/basics.js'

describe('TypeId Tests', () => {

    it('Should create a new typeId', () => {
        const tid = transform(generateNew('prefix'))
        expect(tid.prefix).to.equal('prefix')
        expect(tid.suffix).to.not.match(/prefix/)
        console.log(`New typeid: ${tid}`)
    })
})