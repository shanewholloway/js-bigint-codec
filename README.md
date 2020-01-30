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

```javascript
{
  encodeBigInt(value : BigInt, littleEndian: Boolean) : Uint8Array {},
  encodeBigIntLE(value : BigInt) : Uint8Array {},
  encodeBigIntBE(value : BigInt) : Uint8Array {},
  encodeIntoBigIntLE(value : BigInt, u8buf? : Uint8Array) : Uint8Array {},
  encodeIntoBigIntBE(value : BigInt, u8buf? : Uint8Array) : Uint8Array {},
}
```

###### Encode Unsigned BigInt

```javascript
{
  encodeBigUint(value : BigInt, littleEndian: Boolean) : Uint8Array {},
  encodeBigUintBE(value : BigInt) : Uint8Array {},
  encodeBigUintLE(value : BigInt) : Uint8Array {},
  encodeIntoBigUintLE(value : BigInt, u8buf? : Uint8Array) : Uint8Array {},
  encodeIntoBigUintBE(value : BigInt, u8buf? : Uint8Array) : Uint8Array {},
}
```

###### Decode Signed BigInt

```javascript
{
  decodeBigInt(u8buf: ArrayBuffer | Uint8Array, littleEndian: Boolean) : BigInt {},
  decodeBigIntLE(u8buf: ArrayBuffer | Uint8Array) : BigInt {},
  decodeBigIntBE(u8buf: ArrayBuffer | Uint8Array) : BigInt {},
}
```

###### Decode Unsigned BigInt

```javascript
{
  decodeBigUint(u8buf: ArrayBuffer | Uint8Array, littleEndian: Boolean) : BigInt {},
  decodeBigUintBE(u8buf: ArrayBuffer | Uint8Array) : BigInt {},
  decodeBigUintLE(u8buf: ArrayBuffer | Uint8Array) : BigInt {},
}
```


## License

[BSD 2-clause](LICENSE)
