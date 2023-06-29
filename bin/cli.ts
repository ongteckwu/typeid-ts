#!/usr/bin/env node

import { Command } from 'commander'
import { generateNew, decodeFromString, encodeFromUUID } from '../src/index.js' // replace with the path to your encode/decode functions

const program = new Command()

program
    .command('new <prefix>')
    .description('create a new typeid with a prefix')
    .action((prefix) => {
        if (prefix.length > 0) {
            prefix = prefix.toLowerCase()
        }
        const newId = generateNew(prefix)
        console.log(`New typeid: ${newId}`)
    })



program
    .command('decode <typeid>')
    .description('decode a typeid')
    .action((typeid) => {
        const encoded = decodeFromString(typeid)
        console.log(`Decoded typeid: ${JSON.stringify(encoded)}`)
    })

program
    .command('encode <prefix> <uuid>')
    .description('encode a typeid from a prefix and a uuid')
    .action((prefix, uuid) => {
        const encoded = encodeFromUUID(prefix, uuid)
        console.log(`Encoded typeid: ${encoded}`)
    })

program.parse(process.argv)