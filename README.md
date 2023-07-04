# TypeID Typescript
### A typescript implementation of [TypeIDs](https://github.com/jetpack-io/typeid)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

TypeIDs are a modern, **type-safe**, globally unique identifier based on the upcoming
UUIDv7 standard. They provide a ton of nice properties that make them a great choice
as the primary identifiers for your data in a database, APIs, and distributed systems.
Read more about TypeIDs in their [spec](https://github.com/jetpack-io/typeid).

This particular implementation provides a TS library for generating and parsing TypeIDs.

### UUIDv7
Uses the package https://github.com/LiosK/uuidv7

### Installation
For library:
```
npm install typeid-ts
```

For cli tool:
```
npm install -g typeid-ts
```

### CLI Usage
To generate a new TypeID, run:

```console
$ typeid new user
New typeid: user_1g64w3jc1ncgr2tcsh6mrjtdsn
```

To decode an existing TypeID into a UUID run:

```console
$ typeid decode user_01h2xcejqtf2nbrexx3vqjhp41
Decoded typeid: {"type":"user","uuid":"0188bac7-4afa-78aa-bc3b-bd1eef28d881"}
```

And to encode an existing UUID into a TypeID run:

```console
$ typeid encode user 0188bac7-4afa-78aa-bc3b-bd1eef28d881
Encoded typeid: user_01h2xcejqtf2nbrexx3vqjhp41
```

### Library Usage
Creates a new Typeid
```
import { typeid, generateNew } from 'typeid'

\\ You can either use:
typeid(<prefix>)
\\ or
generateNew(<prefix>)
```
returns e.g. `user_1g64w3jc1ncgr2tcsh6mrjtdsn`

Decodes a Typeid
```
import { decodeFromString } from 'typeid'

decodeFromString(<typeid>)
```
returns e.g. `{"type":"user","uuid":"0188bac7-4afa-78aa-bc3b-bd1eef28d881"}`

Encodes a UUID with a prefix
```
import { encodeFromUUID } from 'typeid'

encodeFromUUID(<prefix>, <UUID string>)
```
returns e.g. `prefix_1g64w3grk1ccvjtd31csgjtdsr`


## Related Work
+ [UUIDv7](https://www.ietf.org/archive/id/draft-peabody-dispatch-new-uuid-format-04.html#name-uuid-version-7) - The upcoming UUID standard that TypeIDs are based on.
+ [typeid-go](https://github.com/jetpack-io/typeid-go) - Ported from this library
+ [typeid](https://github.com/jetpack-io/typeid) - Original CLI client in Go
