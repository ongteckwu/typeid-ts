import { decode } from '../base32.js'

export function validatePrefix(prefix: string): boolean {
    if (prefix === '') {
        return true
    }
    if (prefix.length > 63) {
        throw Error(`Invalid prefix: ${prefix}. Prefix length is ${prefix.length}, expected <= 63`)
    }
    if (!/^[a-z_]{0,63}$/.test(prefix)) {
        throw Error(`Invalid prefix: ${prefix}.  Prefix should match [a-z]{0,63}`)
    }
    return true
}

export function validateSuffix(suffix: string): boolean {
    if (/[A-Z]/.test(suffix)) {
        throw Error(`Invalid suffix: ${suffix}`)
    }
    try {
        decode(suffix)
        return true
    } catch (err) {
        throw Error(`Invalid suffix: ${suffix}`)
    }
}