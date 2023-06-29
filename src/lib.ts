import { uuidv7 } from 'uuidv7'
import { decode, decodeAsBytes, encode } from './base32.js'

interface ITypeID {
    prefix: string;
    suffix: string;
}

export function generateNew(prefix: string): string {
    return encodeFrom(prefix, '')
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

export function encodeFrom(prefix: string, suffix: string): string {
    if (!validatePrefix(prefix)) {
        throw new Error(`Invalid prefix: '${prefix}'. Prefix should match [a-z]+`)
    }
    if (suffix === '') {
        const uid = uuidv7()
        suffix = encode(Buffer.from(uid, 'utf8'))

        if (!validateSuffix(suffix)) {
            throw new Error('Invalid suffix')
        }
    }

    return `${prefix}_${suffix}`
}

function uuidStringToBytes(uuidStr: string): Uint8Array {
    const hexNoHyphens = uuidStr.replace(/-/g, '')
    const arr = new Uint8Array(16)

    for (let i = 0; i < 16; i++) {
        arr[i] = parseInt(hexNoHyphens.substr(i * 2, 2), 16)
    }

    return arr
}


export function encodeFromUUID(prefix: string, uuidStr: string): string {
    const suffix = encode(uuidStringToBytes(uuidStr))
    return encodeFrom(prefix, suffix)
}

export function decodeUUIDBytes(tid: ITypeID): Uint8Array {
    const decoded = decodeAsBytes(tid.suffix)
    if (!decoded) {
        throw new Error('Invalid base32 string')
    }
    return decoded
}

export function decodeFrom(prefix: string, suffix: string): ITypeID {
    if (!validatePrefix(prefix)) {
        throw new Error(`Invalid prefix: '${prefix}'. Prefix should match [a-z]+`)
    }
    if (!validateSuffix(suffix)) {
        throw new Error('Invalid suffix')
    }

    return { prefix, suffix }
}

export function decodeFromString(s: string): ITypeID {
    const parts = s.split('_', 2)
    return decodeFrom(parts[0], parts[1])
}

function validatePrefix(prefix: string): boolean {
    return /^[a-z]+$/.test(prefix)
}

function validateSuffix(suffix: string): boolean {
    try {
        decode(suffix)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}