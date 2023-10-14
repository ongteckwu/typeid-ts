import { expect } from 'chai'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateNew, transform } = require('../../src/lib/basics')

describe('TypeId Tests', () => {

    it('Should create a new typeId', () => {
        const tid = transform(generateNew('prefix'))
        expect(tid.prefix).to.equal('prefix')
        expect(tid.suffix).to.not.match(/prefix/)
        console.log(`New typeid: ${tid}`)
    })
})