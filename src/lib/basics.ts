import { validatePrefix, validateSuffix } from './validators.js'
import { ITypeID } from './models/typeid.js'
import { uuidStringToBytes } from './encoders.js'
import { encode } from '../base32.js'

let uuidv7
(async () => {
    const mod = await import('uuidv7')
    uuidv7 = mod.uuidv7
})()

export function generateNew(prefix: string): string {
    return from(prefix, '')
}

export const typeid = generateNew

export function transform(str: string): ITypeID {
    const parts = str.split('_', 2)
    return { prefix: parts[0], suffix: parts[1] }
}

export function getType(tid: ITypeID): string {
    return tid.prefix
}

export function getSuffix(tid: ITypeID): string {
    return tid.suffix
}

export function toString(tid: ITypeID): string {
    // converts to a string in the format of prefix_suffix
    if (tid.prefix === '') {
        return tid.suffix
    }
    return `${tid.prefix}_${tid.suffix}`
}

export function from(prefix: string, suffix: string): string {
    if (!validatePrefix(prefix)) {
        throw new Error(`Invalid prefix: '${prefix}'. Prefix should match [a-z]+`)
    }
    if (suffix === '') {
        const uid = uuidv7()
        suffix = encode(uuidStringToBytes(uid))
    } else {
        if (!validateSuffix(suffix)) {
            throw new Error('Invalid suffix')
        }
    }

    return `${prefix}_${suffix}`
}
