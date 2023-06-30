import { encode } from '../base32.js'
import { from } from './basics.js'


export function encodeFromUUID(prefix: string, uuidStr: string): string {
    const suffix = encode(uuidStringToBytes(uuidStr))
    return from(prefix, suffix)
}

export function uuidStringToBytes(uuidStr: string): Uint8Array {
    const hexNoHyphens = uuidStr.replace(/-/g, '')
    const arr = new Uint8Array(16)

    for (let i = 0; i < 16; i++) {
        arr[i] = parseInt(hexNoHyphens.substr(i * 2, 2), 16)
    }

    return arr
}
