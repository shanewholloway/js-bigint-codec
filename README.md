# BigInt Codec

BigInt serialization codec to `Uint8Arrays` for NodeJS and the Web.

Packaged as both ECMAScript Modules and CommonJS thanks to Rollup.

WARNING: Not yet tested for compatibility with ASN-1 or other Big-Int encodings.

### Example

```javascript
import {encodeBigInt, decodeBigInt} from 'bigint-codec'
import {encodeBigUint, decodeBigUint} from 'bigint-codec'

const n_curve25519 = 0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn

const u8_BE = encodeBigInt(n_curve25519)
console.log(u8_BE)
// Uint8Array(32) [
//    16,   0,   0,   0,   0,   0,  0,  0,   0,
//     0,   0,   0,   0,   0,   0,  0, 20, 222,
//   249, 222, 162, 247, 156, 214, 88, 18,  99,
//    26,  92, 245, 211, 237
// ]

const n_rt = decodeBigInt(u8_BE)

console.log(n_rt === n_curve25519)
// true


const u8_LE = encodeBigInt(n_curve25519, true)
console.log(u8_LE)
// Uint8Array(32) [
//     237, 211, 245,  92,  26,  99, 18, 88, 214,
//     156, 247, 162, 222, 249, 222, 20,  0,   0,
//       0,   0,   0,   0,   0,   0,  0,  0,   0,
//       0,   0,   0,   0,  16
// ]


const n_rt_LE = decodeBigInt(u8_LE, true)
console.log(n_rt_LE === n_curve25519)
// true
```

### API

###### Encode Signed BigInt

- `encodeBigInt(value : BigInt, littleEndian: Boolean)`
- `encodeBigIntLE(value : BigInt)`
- `encodeBigIntBE(value : BigInt)`
- `encodeIntoBigIntLE(value : BigInt, u8buf? : Uint8Array)`
- `encodeIntoBigIntBE(value : BigInt, u8buf? : Uint8Array)`

###### Encode Unsigned BigInt

- `encodeBigUint(value : BigInt, littleEndian: Boolean)`
- `encodeBigUintBE(value : BigInt)`
- `encodeBigUintLE(value : BigInt)`
- `encodeIntoBigUintLE(value : BigInt, u8buf? : Uint8Array)`
- `encodeIntoBigUintBE(value : BigInt, u8buf? : Uint8Array)`

###### Decode Signed BigInt

- `decodeBigInt(u8buf: ArrayBuffer | Uint8Array, littleEndian: Boolean)`
- `decodeBigIntLE(u8buf: ArrayBuffer | Uint8Array)`
- `decodeBigIntBE(u8buf: ArrayBuffer | Uint8Array)`

###### Decode Unsigned BigInt

- `decodeBigUint(u8buf: ArrayBuffer | Uint8Array, littleEndian: Boolean)`
- `decodeBigUintBE(u8buf: ArrayBuffer | Uint8Array)`
- `decodeBigUintLE(u8buf: ArrayBuffer | Uint8Array)`


## License

[BSD 2-clause](LICENSE)
