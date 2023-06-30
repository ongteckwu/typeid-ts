const alphabet = '0123456789abcdefghjkmnpqrstvwxyz'.split('').map(char => char.charCodeAt(0))

export function encode(src: Uint8Array | number[] | Buffer): string {
    if (src instanceof Buffer) {
        src = Array.from(src)
    }
    const buffer: Buffer = Buffer.alloc(26, '')

    // 10 byte timestamp
    buffer[0] = alphabet[(src[0] & 224) >> 5]
    buffer[1] = alphabet[src[0] & 31]
    buffer[2] = alphabet[(src[1] & 248) >> 3]
    buffer[3] = alphabet[((src[1] & 7) << 2) | ((src[2] & 192) >> 6)]
    buffer[4] = alphabet[(src[2] & 62) >> 1]
    buffer[5] = alphabet[((src[2] & 1) << 4) | ((src[3] & 240) >> 4)]
    buffer[6] = alphabet[((src[3] & 15) << 1) | ((src[4] & 128) >> 7)]
    buffer[7] = alphabet[(src[4] & 124) >> 2]
    buffer[8] = alphabet[((src[4] & 3) << 3) | ((src[5] & 224) >> 5)]
    buffer[9] = alphabet[src[5] & 31]

    // 16 bytes of entropy
    buffer[10] = alphabet[(src[6] & 248) >> 3]
    buffer[11] = alphabet[((src[6] & 7) << 2) | ((src[7] & 192) >> 6)]
    buffer[12] = alphabet[(src[7] & 62) >> 1]
    buffer[13] = alphabet[((src[7] & 1) << 4) | ((src[8] & 240) >> 4)]
    buffer[14] = alphabet[((src[8] & 15) << 1) | ((src[9] & 128) >> 7)]
    buffer[15] = alphabet[(src[9] & 124) >> 2]
    buffer[16] = alphabet[((src[9] & 3) << 3) | ((src[10] & 224) >> 5)]
    buffer[17] = alphabet[src[10] & 31]
    buffer[18] = alphabet[(src[11] & 248) >> 3]
    buffer[19] = alphabet[((src[11] & 7) << 2) | ((src[12] & 192) >> 6)]
    buffer[20] = alphabet[(src[12] & 62) >> 1]
    buffer[21] = alphabet[((src[12] & 1) << 4) | ((src[13] & 240) >> 4)]
    buffer[22] = alphabet[((src[13] & 15) << 1) | ((src[14] & 128) >> 7)]
    buffer[23] = alphabet[(src[14] & 124) >> 2]
    buffer[24] = alphabet[((src[14] & 3) << 3) | ((src[15] & 224) >> 5)]
    buffer[25] = alphabet[src[15] & 31]

    return buffer.toString('binary')
}

// Byte to index table for O(1) lookups when unmarshaling.
// We use 0xFF as sentinel value for invalid indexes.
const dec = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x01,
    0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E,
    0x0F, 0x10, 0x11, 0xFF, 0x12, 0x13, 0xFF, 0x14, 0x15, 0xFF,
    0x16, 0x17, 0x18, 0x19, 0x1A, 0xFF, 0x1B, 0x1C, 0x1D, 0x1E,
    0x1F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x0A, 0x0B, 0x0C,
    0x0D, 0x0E, 0x0F, 0x10, 0x11, 0xFF, 0x12, 0x13, 0xFF, 0x14,
    0x15, 0xFF, 0x16, 0x17, 0x18, 0x19, 0x1A, 0xFF, 0x1B, 0x1C,
    0x1D, 0x1E, 0x1F, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF
]

export function decode(s: string): Uint8Array {
    if (s.length !== 26) {
        throw new Error('Invalid length')
    }

    const v: Uint8Array = new Uint8Array(s.length)
    for (let i = 0; i < s.length; i++) {
        v[i] = s.charCodeAt(i)
    }

    // Check if all the characters are part of the expected base32 character set.
    for (let i = 0; i < 26; i++) {
        if (dec[v[i]] === 0xFF) {
            throw new Error('Invalid base32 character')
        }
    }

    const id: Uint8Array = new Uint8Array(16)

    // 6 bytes timestamp (48 bits)
    id[0] = (dec[v[0]] << 5) | dec[v[1]]
    id[1] = (dec[v[2]] << 3) | (dec[v[3]] >> 2)
    id[2] = (dec[v[3]] << 6) | (dec[v[4]] << 1) | (dec[v[5]] >> 4)
    id[3] = (dec[v[5]] << 4) | (dec[v[6]] >> 1)
    id[4] = (dec[v[6]] << 7) | (dec[v[7]] << 2) | (dec[v[8]] >> 3)
    id[5] = (dec[v[8]] << 5) | dec[v[9]]

    // 10 bytes of entropy (80 bits)
    id[6] = (dec[v[10]] << 3) | (dec[v[11]] >> 2) // First 4 bits are the version
    id[7] = (dec[v[11]] << 6) | (dec[v[12]] << 1) | (dec[v[13]] >> 4)
    id[8] = (dec[v[13]] << 4) | (dec[v[14]] >> 1) // First 2 bits are the variant
    id[9] = (dec[v[14]] << 7) | (dec[v[15]] << 2) | (dec[v[16]] >> 3)
    id[10] = (dec[v[16]] << 5) | dec[v[17]]
    id[11] = (dec[v[18]] << 3) | dec[v[19]] >> 2
    id[12] = (dec[v[19]] << 6) | (dec[v[20]] << 1) | (dec[v[21]] >> 4)
    id[13] = (dec[v[21]] << 4) | (dec[v[22]] >> 1)
    id[14] = (dec[v[22]] << 7) | (dec[v[23]] << 2) | (dec[v[24]] >> 3)
    id[15] = (dec[v[24]] << 5) | dec[v[25]]

    return id
}

export function decodeToNumber(s: string): number[] | Error {
    const id = decode(s)
    if (id instanceof Error) {
        return id
    }

    return Array.from(id)
}

