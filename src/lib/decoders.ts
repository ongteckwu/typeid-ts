import { decode } from '../base32.js'
import { IDecoded } from './models/decoded.js'
import { ITypeID } from './models/typeid.js'
import { validatePrefix, validateSuffix } from './validators.js'

export function bytesToUUIDString(bytes: Uint8Array): string {
    const hex = Array.from(bytes).map(b => {
        return ('00' + b.toString(16)).slice(-2)
    }).join('')

    const uuidStr = hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' +
        hex.slice(16, 20) + '-' + hex.slice(20, 32)

    return uuidStr
}

export function decodeUUIDBytes(tid: ITypeID): Uint8Array {
    // converts the suffix to a UUID string
    const decoded = decode(tid.suffix)
    if (!decoded) {
        throw new Error('Invalid base32 string')
    }
    return decoded
}

export function decodeFrom(prefix: string, suffix: string): IDecoded {
    // decodes into a UUID string
    if (!validatePrefix(prefix)) {
        throw new Error(`Invalid prefix: '${prefix}'. Prefix should match [a-z]+`)
    }
    if (!validateSuffix(suffix)) {
        throw new Error('Invalid suffix')
    }

    return {
        type: prefix,
        uuid: bytesToUUIDString(decode(suffix))
    }
}

export function decodeFromString(s: string): IDecoded {
    const parts = s.split('_', 2)
    return decodeFrom(parts[0], parts[1])
}