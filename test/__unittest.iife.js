(function () {
  'use strict';

  function encodeIntoBigIntBE(value, u8buf, as_tiled) {
    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=len, v_next=value, v_tip;
    while (i>0 && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[--i] = Number(v_tip & 0xffn); }

    if (i<len-1) {
      const v = u8buf[i], sp = 0x80 & u8buf[i+1];
      if (0x00 === v && ! sp) {i += 1;}
      else if (0xff === v && sp) {i += 1;} }

    const u8res = u8buf.slice(i);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }

  function encodeIntoBigIntLE(value, u8buf, as_tiled) {
    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=-1, v_next=value, v_tip;
    while (i<len && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[++i] = Number(v_tip & 0xffn); }

    if (i>0) {
      const v = u8buf[i], sp = 0x80 & u8buf[i-1];
      if (0x00 === v && ! sp) {i -= 1;}
      else if (0xff === v && sp) {i -= 1;} }

    const u8res = u8buf.slice(0, i+1);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }

  function encodeBigInt(value, littleEndian) {
    return littleEndian
      ? encodeBigIntLE(value)
      : encodeBigIntBE(value)}




  function encodeBigIntBE(value) {
    const rope=[], u8_1k = new Uint8Array(1024);

    let done, u8_part, v_tip=value;
    while  (! done) {
      [done, v_tip, u8_part] =
        encodeIntoBigIntBE(
          v_tip, u8_1k, true);

      rope.push(u8_part); }

    return 1 === rope.length ? rope.pop()
      : _join_1k_rope() }


  function encodeBigIntLE(value) {
    const rope=[], u8_1k = new Uint8Array(1024);

    let done, u8_part, v_tip=value;
    while  (! done) {
      [done, v_tip, u8_part] =
        encodeIntoBigIntLE(
          v_tip, u8_1k, true);

      rope.unshift(u8_part); }

    return 1 === rope.length ? rope.pop()
      : _join_1k_rope() }


  function _join_1k_rope(rope, partial) {
    return;
  }

  function decodeBigInt(buffer, littleEndian) {
    return littleEndian
      ? decodeBigIntLE()
      : decodeBigIntBE()}

  function decodeBigIntLE(buffer) {}

  function decodeBigIntBE(buffer) {}

  const bigint_codec ={
    encode: encodeBigInt
  , decode: decodeBigInt};
  //# sourceMappingURL=bigint_codec.mjs.map

  const { assert } = require('chai');

  describe('smoke', (() => {
    it('basics', (() => {
      assert('works'); } ) );

    it('importable', (() => {
      assert.equal(typeof bigint_codec, 'object'); } ) ); } ) );

  function encodeIntoBigIntBE$1(value, u8buf, as_tiled) {
    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=len, v_next=value, v_tip;
    while (i>0 && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[--i] = Number(v_tip & 0xffn); }

    if (i<len-1) {
      const v = u8buf[i], sp = 0x80 & u8buf[i+1];
      if (0x00 === v && ! sp) {i += 1;}
      else if (0xff === v && sp) {i += 1;} }

    const u8res = u8buf.slice(i);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }



  function encodeIntoBigUintBE(value, u8buf, as_tiled) {
    if (value < 0n) {throw new Error("Invalid negative BigInt value")}

    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=len, v_next=value, v_tip;
    while (i>0 && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[--i] = Number(v_tip & 0xffn); }

    if (i<len-1) {
      const v = u8buf[i];
      if (0x00 === v) {i += 1;} }

    const u8res = u8buf.slice(i);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }

  function encodeIntoBigIntLE$1(value, u8buf, as_tiled) {
    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=-1, v_next=value, v_tip;
    while (i<len && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[++i] = Number(v_tip & 0xffn); }

    if (i>0) {
      const v = u8buf[i], sp = 0x80 & u8buf[i-1];
      if (0x00 === v && ! sp) {i -= 1;}
      else if (0xff === v && sp) {i -= 1;} }

    const u8res = u8buf.slice(0, i+1);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }

  function encodeIntoBigUintLE(value, u8buf, as_tiled) {
    if (value < 0n) {throw new Error("Invalid negative BigInt value")}

    if (undefined === u8buf) {
      u8buf = new Uint8Array(1024);}

    const len = u8buf.length;
    let i=-1, v_next=value, v_tip;
    while (i<len && v_next!==v_tip) {
      v_tip = v_next;
      v_next = v_next >> 8n;
      u8buf[++i] = Number(v_tip & 0xffn); }

    if (i>0) {
      const v = u8buf[i];
      if (0x00 === v) {i -= 1;} }

    const u8res = u8buf.slice(0, i+1);

    if (as_tiled) {
      return [v_next==v_tip, v_next, u8res]}

    else if (v_next == v_tip) {
      return u8res}

    else throw new Error('Insuffecient buffer size to encode BigInt value') }

  function encodeIntoBigInt(value, littleEndian, u8buf) {
    return littleEndian
      ? encodeIntoBigIntLE$1(value, u8buf)
      : encodeIntoBigIntBE$1(value, u8buf)}

  function encodeIntoBigUint(value, littleEndian, u8buf) {
    return littleEndian
      ? encodeIntoBigUintLE(value, u8buf)
      : encodeIntoBigUintBE(value, u8buf)}
  function encodeBigInt$1(value, littleEndian) {
    return littleEndian
      ? encodeBigIntLE$1(value)
      : encodeBigIntBE$1(value)}




  function encodeBigIntBE$1(value) {
    const rope=[], u8_1k = new Uint8Array(1024);

    let done, u8_part, v_tip=value;
    while  (! done) {
      [done, v_tip, u8_part] =
        encodeIntoBigIntBE$1(
          v_tip, u8_1k, true);

      rope.push(u8_part); }

    return 1 === rope.length ? rope.pop()
      : _join_1k_rope$1() }


  function encodeBigIntLE$1(value) {
    const rope=[], u8_1k = new Uint8Array(1024);

    let done, u8_part, v_tip=value;
    while  (! done) {
      [done, v_tip, u8_part] =
        encodeIntoBigIntLE$1(
          v_tip, u8_1k, true);

      rope.unshift(u8_part); }

    return 1 === rope.length ? rope.pop()
      : _join_1k_rope$1() }


  function _join_1k_rope$1(rope, partial) {
    return;
  }
  //# sourceMappingURL=bigint_encode.mjs.map

  const { assert: assert$1 } = require('chai');

  describe('encode', (() => {
    it('importable', (() => {
      assert$1.equal(typeof encodeIntoBigInt, 'function'); } ) );

    describe('encode into Int', (() => {
      it('0', (() => {
        _testIntoInt_BE_LE(0n, 0); } ) );

      it('1', (() => {
        _testIntoInt_BE_LE(1n, 1); } ) );

      it('-1', (() => {
        _testIntoInt_BE_LE(-1n, 0xff); } ) );

      it('128', (() => {
        _testIntoInt_BE_LE(128n, 0x00, 0x80); } ) );

      it('-128', (() => {
        _testIntoInt_BE_LE(-128n, 0x80); } ) );

      it('-127', (() => {
        _testIntoInt_BE_LE(-127n, 0x81); } ) );

      it('0xdeadbeef', (() => {
        _testIntoInt_BE_LE(0xdeadbeefn, 0x00, 0xde, 0xad, 0xbe, 0xef); } ) );

      it('-0xdeadbeef', (() => {
        _testIntoInt_BE_LE(-0xdeadbeefn, 0xff, 0x21, 0x52, 0x41, 0x11); } ) ); } ) );


    describe('encode into Uint', (() => {
      it('0', (() => {
        _testIntoUint_BE_LE(0n, 0); } ) );

      it('1', (() => {
        _testIntoUint_BE_LE(1n, 1); } ) );

      it('128', (() => {
        _testIntoUint_BE_LE(128n, 0x80); } ) );

      it('0xdeadbeef', (() => {
        _testIntoUint_BE_LE(0xdeadbeefn, 0xde, 0xad, 0xbe, 0xef); } ) ); } ) );

    describe('encode big numbers from crypto land', (() => {
      it('P-256', (() => {
        const n = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
        _testIntoUint_BE_LE(n,
          0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xbc, 0xe6, 0xfa, 0xad, 0xa7, 0x17, 0x9e, 0x84
        , 0xf3, 0xb9, 0xca, 0xc2, 0xfc, 0x63, 0x25, 0x51);

        _testIntoInt_BE_LE(n, 0x00,
          0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xbc, 0xe6, 0xfa, 0xad, 0xa7, 0x17, 0x9e, 0x84
        , 0xf3, 0xb9, 0xca, 0xc2, 0xfc, 0x63, 0x25, 0x51); } ) );

      it('P-384', (() => {
        const n = 0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973n;
        _testIntoUint_BE_LE(n,
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xc7, 0x63, 0x4d, 0x81, 0xf4, 0x37, 0x2d, 0xdf
        , 0x58, 0x1a, 0x0d, 0xb2, 0x48, 0xb0, 0xa7, 0x7a
        , 0xec, 0xec, 0x19, 0x6a, 0xcc, 0xc5, 0x29, 0x73);

        _testIntoInt_BE_LE(n, 0x00,
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xc7, 0x63, 0x4d, 0x81, 0xf4, 0x37, 0x2d, 0xdf
        , 0x58, 0x1a, 0x0d, 0xb2, 0x48, 0xb0, 0xa7, 0x7a
        , 0xec, 0xec, 0x19, 0x6a, 0xcc, 0xc5, 0x29, 0x73); } ) );

      it('P-521', (() => {
        const n = 0x000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409n;
        _testIntoUint_BE_LE(n,
                      0x01, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xfa, 0x51, 0x86, 0x87, 0x83
        , 0xbf, 0x2f, 0x96, 0x6b, 0x7f, 0xcc, 0x01, 0x48
        , 0xf7, 0x09, 0xa5, 0xd0, 0x3b, 0xb5, 0xc9, 0xb8
        , 0x89, 0x9c, 0x47, 0xae, 0xbb, 0x6f, 0xb7, 0x1e
        , 0x91, 0x38, 0x64, 0x09);

        _testIntoInt_BE_LE(n,
                      0x01, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xfa, 0x51, 0x86, 0x87, 0x83
        , 0xbf, 0x2f, 0x96, 0x6b, 0x7f, 0xcc, 0x01, 0x48
        , 0xf7, 0x09, 0xa5, 0xd0, 0x3b, 0xb5, 0xc9, 0xb8
        , 0x89, 0x9c, 0x47, 0xae, 0xbb, 0x6f, 0xb7, 0x1e
        , 0x91, 0x38, 0x64, 0x09); } ) );

      it('curve25519', (() => {
        const n = 0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn;
        _testIntoUint_BE_LE(n,
          0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        , 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        , 0x14, 0xde, 0xf9, 0xde, 0xa2, 0xf7, 0x9c, 0xd6
        , 0x58, 0x12, 0x63, 0x1a, 0x5c, 0xf5, 0xd3, 0xed);

        _testIntoInt_BE_LE(n,
          0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        , 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
        , 0x14, 0xde, 0xf9, 0xde, 0xa2, 0xf7, 0x9c, 0xd6
        , 0x58, 0x12, 0x63, 0x1a, 0x5c, 0xf5, 0xd3, 0xed); } ) );

      it('secp256k1', (() => {
        const n = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
        _testIntoUint_BE_LE(n,
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe
        , 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b
        , 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41);

        _testIntoInt_BE_LE(n, 0x00,
          0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
        , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe
        , 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b
        , 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41); } ) ); } ) ); } ) );



  function _testIntoInt_BE_LE(value, ...answer_be) {
    answer_be = Uint8Array.from(answer_be);
    const answer_le = answer_be.slice().reverse();

    const v_be_imp = encodeIntoBigInt(value);
    const v_be = encodeIntoBigInt(value, false);
    const v_le = encodeIntoBigInt(value, true);

    assert$1.deepEqual(v_be, v_be_imp, "Big endian mismatch explicit to implicit");
    assert$1.deepEqual(v_be, answer_be, "Big-endian encoding does not match expected answer");
    assert$1.deepEqual(v_le, answer_le, "Little-endian encoding does not match expected answer"); }


  function _testIntoUint_BE_LE(value, ...answer_be) {
    answer_be = Uint8Array.from(answer_be);
    const answer_le = answer_be.slice().reverse();

    const v_be_imp = encodeIntoBigUint(value);
    const v_be = encodeIntoBigUint(value, false);
    const v_le = encodeIntoBigUint(value, true);

    assert$1.deepEqual(v_be, v_be_imp, "Big endian mismatch explicit to implicit");
    assert$1.deepEqual(v_be, answer_be, "Big-endian encoding does not match expected answer");
    assert$1.deepEqual(v_le, answer_le, "Little-endian encoding does not match expected answer"); }

  const { randomBytes, randomFillSync } = require('crypto');
  //# sourceMappingURL=index.js.map

  const { assert: assert$2 } = require('chai');

  describe('encode rope', (() => {
    it('importable', (() => {
      assert$2.equal(typeof encodeBigInt$1, 'function'); } ) );

    describe('encode Int', (() => {
      it('0', (() => {
   } ) );

      it('1', (() => {
   } ) );

      it('-1', (() => {
   } ) );

      it('128', (() => {
   } ) );

      it('-128', (() => {
   } ) );

      it('-127', (() => {
   } ) );

      it('0xdeadbeef', (() => {
   } ) );

      it('-0xdeadbeef', (() => {
   } ) ); } ) );


    describe('encode Uint', (() => {
      it('0', (() => {
   } ) );

      it('1', (() => {
   } ) );

      it('128', (() => {
   } ) );

      it('0xdeadbeef', (() => {
   } ) ); } ) );

    describe('encode big numbers from crypto land', (() => {
      it('P-256', (() => {
   } ) );

      it('P-384', (() => {
   } ) );

      it('P-521', (() => {
   } ) );

      it('curve25519', (() => {
   } ) );

      it('secp256k1', (() => {
   } ) ); } ) ); } ) );

  function decodeBigInt$1(buffer, littleEndian) {
    return littleEndian
      ? decodeBigIntLE$1()
      : decodeBigIntBE$1()}

  function decodeBigIntLE$1(buffer) {}

  function decodeBigIntBE$1(buffer) {}
  //# sourceMappingURL=bigint_decode.mjs.map

  const { assert: assert$3 } = require('chai');

  describe('decode', (() => {
    it('importable', (() => {
      assert$3.equal(typeof decodeBigInt$1, 'function'); } ) ); } ) );

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5paWZlLmpzIiwic291cmNlcyI6WyIuLi9lc20vYmlnaW50X2NvZGVjLm1qcyIsInVuaXQvc21va2UuanN5IiwiLi4vZXNtL2JpZ2ludF9lbmNvZGUubWpzIiwidW5pdC9lbmNvZGUuanN5Iiwibm9kZV9tb2R1bGVzL3U4LXV0aWxzL2VzbS9pbmRleC5qcyIsInVuaXQvZW5jb2RlX3JvcGUuanN5IiwiLi4vZXNtL2JpZ2ludF9kZWNvZGUubWpzIiwidW5pdC9kZWNvZGUuanN5Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYsIGFzX3RpbGVkKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMDI0KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmIChpPGxlbi0xKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldLCBzcCA9IDB4ODAgJiB1OGJ1ZltpKzFdO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpICs9IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpICs9IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZShpKTtcblxuICBpZiAoYXNfdGlsZWQpIHtcbiAgICByZXR1cm4gW3ZfbmV4dD09dl90aXAsIHZfbmV4dCwgdThyZXNdfVxuXG4gIGVsc2UgaWYgKHZfbmV4dCA9PSB2X3RpcCkge1xuICAgIHJldHVybiB1OHJlc31cblxuICBlbHNlIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSBCaWdJbnQgdmFsdWUnKSB9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYsIGFzX3RpbGVkKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMDI0KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT0tMSwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk8bGVuICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWysraV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAoaT4wKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldLCBzcCA9IDB4ODAgJiB1OGJ1ZltpLTFdO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpIC09IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpIC09IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZSgwLCBpKzEpO1xuXG4gIGlmIChhc190aWxlZCkge1xuICAgIHJldHVybiBbdl9uZXh0PT12X3RpcCwgdl9uZXh0LCB1OHJlc119XG5cbiAgZWxzZSBpZiAodl9uZXh0ID09IHZfdGlwKSB7XG4gICAgcmV0dXJuIHU4cmVzfVxuXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIEJpZ0ludCB2YWx1ZScpIH1cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlQmlnSW50TEUodmFsdWUpXG4gICAgOiBlbmNvZGVCaWdJbnRCRSh2YWx1ZSl9XG5cblxuXG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludEJFKHZhbHVlKSB7XG4gIGNvbnN0IHJvcGU9W10sIHU4XzFrID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG5cbiAgbGV0IGRvbmUsIHU4X3BhcnQsIHZfdGlwPXZhbHVlO1xuICB3aGlsZSAgKCEgZG9uZSkge1xuICAgIFtkb25lLCB2X3RpcCwgdThfcGFydF0gPVxuICAgICAgZW5jb2RlSW50b0JpZ0ludEJFKFxuICAgICAgICB2X3RpcCwgdThfMWssIHRydWUpO1xuXG4gICAgcm9wZS5wdXNoKHU4X3BhcnQpOyB9XG5cbiAgcmV0dXJuIDEgPT09IHJvcGUubGVuZ3RoID8gcm9wZS5wb3AoKVxuICAgIDogX2pvaW5fMWtfcm9wZSgpIH1cblxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRMRSh2YWx1ZSkge1xuICBjb25zdCByb3BlPVtdLCB1OF8xayA9IG5ldyBVaW50OEFycmF5KDEwMjQpO1xuXG4gIGxldCBkb25lLCB1OF9wYXJ0LCB2X3RpcD12YWx1ZTtcbiAgd2hpbGUgICghIGRvbmUpIHtcbiAgICBbZG9uZSwgdl90aXAsIHU4X3BhcnRdID1cbiAgICAgIGVuY29kZUludG9CaWdJbnRMRShcbiAgICAgICAgdl90aXAsIHU4XzFrLCB0cnVlKTtcblxuICAgIHJvcGUudW5zaGlmdCh1OF9wYXJ0KTsgfVxuXG4gIHJldHVybiAxID09PSByb3BlLmxlbmd0aCA/IHJvcGUucG9wKClcbiAgICA6IF9qb2luXzFrX3JvcGUoKSB9XG5cblxuZnVuY3Rpb24gX2pvaW5fMWtfcm9wZShyb3BlLCBwYXJ0aWFsKSB7XG4gIHJldHVybjtcbn1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50KGJ1ZmZlciwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGRlY29kZUJpZ0ludExFKClcbiAgICA6IGRlY29kZUJpZ0ludEJFKCl9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludExFKGJ1ZmZlcikge31cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50QkUoYnVmZmVyKSB7fVxuXG5jb25zdCBiaWdpbnRfY29kZWMgPXtcbiAgZW5jb2RlOiBlbmNvZGVCaWdJbnRcbiwgZGVjb2RlOiBkZWNvZGVCaWdJbnR9O1xuXG5leHBvcnQgZGVmYXVsdCBiaWdpbnRfY29kZWM7XG5leHBvcnQgeyBiaWdpbnRfY29kZWMsIGRlY29kZUJpZ0ludCBhcyBkZWNvZGVfYmlnaW50LCBlbmNvZGVCaWdJbnQgYXMgZW5jb2RlX2JpZ2ludCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmlnaW50X2NvZGVjLm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcbmltcG9ydCBiaWdpbnRfY29kZWMgZnJvbSAnYmlnaW50LWNvZGVjJ1xuXG5kZXNjcmliZSBAICdzbW9rZScsIEA9PiA6OlxuICBpdCBAICdiYXNpY3MnLCBAPT4gOjpcbiAgICBhc3NlcnQgQCAnd29ya3MnXG5cbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBiaWdpbnRfY29kZWMsICdvYmplY3QnXG5cbiIsImZ1bmN0aW9uIGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYsIGFzX3RpbGVkKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMDI0KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmIChpPGxlbi0xKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldLCBzcCA9IDB4ODAgJiB1OGJ1ZltpKzFdO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpICs9IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpICs9IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZShpKTtcblxuICBpZiAoYXNfdGlsZWQpIHtcbiAgICByZXR1cm4gW3ZfbmV4dD09dl90aXAsIHZfbmV4dCwgdThyZXNdfVxuXG4gIGVsc2UgaWYgKHZfbmV4dCA9PSB2X3RpcCkge1xuICAgIHJldHVybiB1OHJlc31cblxuICBlbHNlIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSBCaWdJbnQgdmFsdWUnKSB9XG5cblxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHZhbHVlIDwgMG4pIHt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG5lZ2F0aXZlIEJpZ0ludCB2YWx1ZVwiKX1cblxuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7fVxuXG4gIGNvbnN0IGxlbiA9IHU4YnVmLmxlbmd0aDtcbiAgbGV0IGk9bGVuLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaT4wICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWy0taV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAoaTxsZW4tMSkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBpZiAoMHgwMCA9PT0gdikge2kgKz0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKGkpO1xuXG4gIGlmIChhc190aWxlZCkge1xuICAgIHJldHVybiBbdl9uZXh0PT12X3RpcCwgdl9uZXh0LCB1OHJlc119XG5cbiAgZWxzZSBpZiAodl9uZXh0ID09IHZfdGlwKSB7XG4gICAgcmV0dXJuIHU4cmVzfVxuXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIEJpZ0ludCB2YWx1ZScpIH1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEwMjQpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPS0xLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaTxsZW4gJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbKytpXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmIChpPjApIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV0sIHNwID0gMHg4MCAmIHU4YnVmW2ktMV07XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgLT0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG5cbiAgaWYgKGFzX3RpbGVkKSB7XG4gICAgcmV0dXJuIFt2X25leHQ9PXZfdGlwLCB2X25leHQsIHU4cmVzXX1cblxuICBlbHNlIGlmICh2X25leHQgPT0gdl90aXApIHtcbiAgICByZXR1cm4gdThyZXN9XG5cbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgQmlnSW50IHZhbHVlJykgfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHZhbHVlIDwgMG4pIHt0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG5lZ2F0aXZlIEJpZ0ludCB2YWx1ZVwiKX1cblxuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7fVxuXG4gIGNvbnN0IGxlbiA9IHU4YnVmLmxlbmd0aDtcbiAgbGV0IGk9LTEsIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPGxlbiAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlsrK2ldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKGk+MCkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBpZiAoMHgwMCA9PT0gdikge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG5cbiAgaWYgKGFzX3RpbGVkKSB7XG4gICAgcmV0dXJuIFt2X25leHQ9PXZfdGlwLCB2X25leHQsIHU4cmVzXX1cblxuICBlbHNlIGlmICh2X25leHQgPT0gdl90aXApIHtcbiAgICByZXR1cm4gdThyZXN9XG5cbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgQmlnSW50IHZhbHVlJykgfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1Zil9XG5mdW5jdGlvbiBlbmNvZGVCaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVCaWdJbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUJpZ0ludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUJpZ1VpbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUJpZ1VpbnRCRSh2YWx1ZSl9XG5cblxuXG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludEJFKHZhbHVlKSB7XG4gIGNvbnN0IHJvcGU9W10sIHU4XzFrID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG5cbiAgbGV0IGRvbmUsIHU4X3BhcnQsIHZfdGlwPXZhbHVlO1xuICB3aGlsZSAgKCEgZG9uZSkge1xuICAgIFtkb25lLCB2X3RpcCwgdThfcGFydF0gPVxuICAgICAgZW5jb2RlSW50b0JpZ0ludEJFKFxuICAgICAgICB2X3RpcCwgdThfMWssIHRydWUpO1xuXG4gICAgcm9wZS5wdXNoKHU4X3BhcnQpOyB9XG5cbiAgcmV0dXJuIDEgPT09IHJvcGUubGVuZ3RoID8gcm9wZS5wb3AoKVxuICAgIDogX2pvaW5fMWtfcm9wZSgpIH1cblxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRMRSh2YWx1ZSkge1xuICBjb25zdCByb3BlPVtdLCB1OF8xayA9IG5ldyBVaW50OEFycmF5KDEwMjQpO1xuXG4gIGxldCBkb25lLCB1OF9wYXJ0LCB2X3RpcD12YWx1ZTtcbiAgd2hpbGUgICghIGRvbmUpIHtcbiAgICBbZG9uZSwgdl90aXAsIHU4X3BhcnRdID1cbiAgICAgIGVuY29kZUludG9CaWdJbnRMRShcbiAgICAgICAgdl90aXAsIHU4XzFrLCB0cnVlKTtcblxuICAgIHJvcGUudW5zaGlmdCh1OF9wYXJ0KTsgfVxuXG4gIHJldHVybiAxID09PSByb3BlLmxlbmd0aCA/IHJvcGUucG9wKClcbiAgICA6IF9qb2luXzFrX3JvcGUoKSB9XG5cblxuZnVuY3Rpb24gX2pvaW5fMWtfcm9wZShyb3BlLCBwYXJ0aWFsKSB7XG4gIHJldHVybjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZW5jb2RlQmlnSW50O1xuZXhwb3J0IHsgZW5jb2RlQmlnSW50LCBlbmNvZGVCaWdJbnRCRSwgZW5jb2RlQmlnSW50TEUsIGVuY29kZUJpZ1VpbnQsIGVuY29kZUludG9CaWdJbnQsIGVuY29kZUludG9CaWdJbnRCRSwgZW5jb2RlSW50b0JpZ0ludExFLCBlbmNvZGVJbnRvQmlnVWludCwgZW5jb2RlSW50b0JpZ1VpbnRCRSwgZW5jb2RlSW50b0JpZ1VpbnRMRSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmlnaW50X2VuY29kZS5tanMubWFwXG4iLCJpbXBvcnQgQHt9XG4gIGVuY29kZUludG9CaWdJbnRcbiAgZW5jb2RlSW50b0JpZ1VpbnRcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2VuY29kZS5tanMnXG5cbmNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcblxuZGVzY3JpYmUgQCAnZW5jb2RlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZW5jb2RlSW50b0JpZ0ludCwgJ2Z1bmN0aW9uJ1xuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBpbnRvIEludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnLTEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xbiwgMHhmZlxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAxMjhuLCAweDAwLCAweDgwXG5cbiAgICBpdCBAICctMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnLTEyNycsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTEyN24sIDB4ODFcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweDAwLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgICBpdCBAICctMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTB4ZGVhZGJlZWZuLCAweGZmLCAweDIxLCAweDUyLCAweDQxLCAweDExXG5cblxuICBkZXNjcmliZSBAICdlbmNvZGUgaW50byBVaW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDEyOG4sIDB4ODBcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAweGRlYWRiZWVmbiwgMHhkZSwgMHhhZCwgMHhiZSwgMHhlZlxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBiaWcgbnVtYmVycyBmcm9tIGNyeXB0byBsYW5kJywgQD0+IDo6XG4gICAgaXQgQCAnUC0yNTYnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmMDAwMDAwMDBmZmZmZmZmZmZmZmZmZmZmYmNlNmZhYWRhNzE3OWU4NGYzYjljYWMyZmM2MzI1NTFuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICBpdCBAICdQLTM4NCcsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYzc2MzRkODFmNDM3MmRkZjU4MWEwZGIyNDhiMGE3N2FlY2VjMTk2YWNjYzUyOTczblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICBpdCBAICdQLTUyMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgaXQgQCAnY3VydmUyNTUxOScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNGRlZjlkZWEyZjc5Y2Q2NTgxMjYzMWE1Y2Y1ZDNlZG5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgIGl0IEAgJ3NlY3AyNTZrMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50b0ludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50b1VpbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuIiwiZnVuY3Rpb24gdThfdG9fYmFzZTIodTgsIHNlcCkge1xuICBpZiAodW5kZWZpbmVkID09PSB1OC5idWZmZXIpIHtcbiAgICB1OCA9IG5ldyBVaW50OEFycmF5KHU4KTt9XG5cbiAgcmV0dXJuIEFycmF5XG4gICAgLmZyb20odTgsIHYgPT4gdi50b1N0cmluZygyKS5wYWRTdGFydCg4LCAnMCcpKVxuICAgIC5qb2luKG51bGwgIT0gc2VwID8gc2VwIDogJycpIH1cblxuXG5mdW5jdGlvbiBiYXNlMl90b191OChiaXRzKSB7XG4gIGJpdHMgPSBiaXRzLnJlcGxhY2UoL1teMDFdL2csICcnKTtcbiAgY29uc3QgdTggPSBuZXcgVWludDhBcnJheShiaXRzLmxlbmd0aCA+PiAzKTtcbiAgZm9yIChsZXQgaT0wLCBpMj0wOyBpPHU4Lmxlbmd0aDsgaSsrLCBpMis9OCkge1xuICAgIHU4W2ldID0gcGFyc2VJbnQoYml0cy5zbGljZShpMiwgaTIrOCksIDIpOyB9XG4gIHJldHVybiB1OH1cblxuZnVuY3Rpb24gdThfdG9faGV4KHU4LCBzZXApIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdTguYnVmZmVyKSB7XG4gICAgdTggPSBuZXcgVWludDhBcnJheSh1OCk7fVxuXG4gIHJldHVybiBBcnJheVxuICAgIC5mcm9tKHU4LCB2ID0+IHYudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXG4gICAgLmpvaW4obnVsbCAhPSBzZXAgPyBzZXAgOiAnJykgfVxuXG5cbmZ1bmN0aW9uIGhleF90b191OChoZXgpIHtcbiAgaGV4ID0gaGV4LnJlcGxhY2UoL1teMC05YS1mQS1GXS9nLCAnJyk7XG4gIGNvbnN0IHU4ID0gbmV3IFVpbnQ4QXJyYXkoaGV4Lmxlbmd0aCA+PiAxKTtcbiAgZm9yIChsZXQgaT0wLCBpMj0wOyBpPHU4Lmxlbmd0aDsgaSsrLCBpMis9Mikge1xuICAgIHU4W2ldID0gcGFyc2VJbnQoaGV4LnNsaWNlKGkyLCBpMisyKSwgMTYpOyB9XG4gIHJldHVybiB1OH1cblxuZnVuY3Rpb24gdThfdG9fYmFzZTY0KHU4KSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbSh1OCkudG9TdHJpbmcoJ2Jhc2U2NCcpfVxuXG5mdW5jdGlvbiBiYXNlNjRfdG9fdTgoc3RyX2I2NCkge1xuICByZXR1cm4gVWludDhBcnJheS5mcm9tKFxuICAgIEJ1ZmZlci5mcm9tKHN0cl9iNjQsICdiYXNlNjQnKSApIH1cblxuZnVuY3Rpb24gdThfdG9fYmFzZTY0dXJsKHU4KSB7XG4gIHJldHVybiB1OF90b19iYXNlNjQodTgpXG4gICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgLnJlcGxhY2UoLz0vZywgJycpfVxuXG5mdW5jdGlvbiB1OF90b191dGY4KHU4KSB7XG4gIHJldHVybiBCdWZmZXIuZnJvbSh1OCkudG9TdHJpbmcoJ3V0Zi04Jyl9XG5cbmZ1bmN0aW9uIHV0ZjhfdG9fdTgodXRmOCkge1xuICByZXR1cm4gVWludDhBcnJheS5mcm9tKEJ1ZmZlci5mcm9tKHV0ZjgsICd1dGYtOCcpKSB9XG5cbmZ1bmN0aW9uIHV0ZjhfdG9fdThfbmZrYyh1dGY4KSB7XG4gIHJldHVybiB1dGY4X3RvX3U4KHV0Zjgubm9ybWFsaXplKCdORktDJykpIH1cblxuY29uc3QgeyByYW5kb21CeXRlcywgcmFuZG9tRmlsbFN5bmMgfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG5mdW5jdGlvbiB1OF9yYW5kb20oYnl0ZUxlbmd0aCkge1xuICByZXR1cm4gVWludDhBcnJheS5mcm9tKFxuICAgIHJhbmRvbUJ5dGVzKGJ5dGVMZW5ndGgpICkgfVxuXG5mdW5jdGlvbiB1OF9yYW5kb21GaWxsKHU4KSB7XG4gIHJhbmRvbUZpbGxTeW5jKHU4KTtcbiAgcmV0dXJuIHU4fVxuXG5mdW5jdGlvbiBhc191OF9idWZmZXIodTgpIHtcbiAgXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodTgpKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHU4KX1cblxuICBpZiAodTggaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgcmV0dXJuIHU4fVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHU4KSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheSh1OC5idWZmZXIpfVxuICBpZiAodTggaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheSh1OCl9XG4gIHJldHVybiBVaW50OEFycmF5LmZyb20odTgpfVxuXG5mdW5jdGlvbiB1OF9jb25jYXQocGFydHMpIHtcbiAgbGV0IGk9MCwgbGVuPTA7XG4gIGZvciAoY29uc3QgYiBvZiBwYXJ0cykge1xuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBiLmJ5dGVMZW5ndGg7XG4gICAgaWYgICgnbnVtYmVyJyAhPT0gdHlwZW9mIGJ5dGVMZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGFydCBieXRlTGVuZ3RoXCIpIH1cbiAgICBsZW4gKz0gYnl0ZUxlbmd0aDt9XG5cbiAgY29uc3QgdTggPSBuZXcgVWludDhBcnJheShsZW4pO1xuICBmb3IgKGNvbnN0IHU4X3BhcnQgb2YgcGFydHMpIHtcbiAgICB1OC5zZXQodThfcGFydCwgaSk7XG4gICAgaSArPSB1OF9wYXJ0LmJ5dGVMZW5ndGg7fVxuICByZXR1cm4gdTh9XG5cbmV4cG9ydCB7IHU4X3RvX2Jhc2UyLCBiYXNlMl90b191OCwgdThfdG9faGV4LCBoZXhfdG9fdTgsIHU4X3RvX2Jhc2U2NHVybCwgdThfdG9fYmFzZTY0LCBiYXNlNjRfdG9fdTgsIHV0ZjhfdG9fdThfbmZrYywgdThfdG9fdXRmOCwgdXRmOF90b191OCwgdThfcmFuZG9tLCB1OF9yYW5kb21GaWxsLCBhc191OF9idWZmZXIsIHU4X2NvbmNhdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJpbXBvcnQgQHt9XG4gIGVuY29kZUJpZ0ludFxuICBlbmNvZGVCaWdVaW50XG5mcm9tICdiaWdpbnQtY29kZWMvZXNtL2JpZ2ludF9lbmNvZGUubWpzJ1xuXG5pbXBvcnQgeyB1OF90b19oZXggfSBmcm9tICd1OC11dGlscydcbmNvbnN0IGhleGRiZyA9IHYgPT4gdThfdG9faGV4KHYsICc6JylcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUgcm9wZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGVuY29kZUJpZ0ludCwgJ2Z1bmN0aW9uJ1xuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBJbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICctMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMW4sIDB4ZmZcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAxMjhuLCAweDAwLCAweDgwXG5cbiAgICBpdCBAICctMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xMjhuLCAweDgwXG5cbiAgICBpdCBAICctMTI3JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xMjduLCAweDgxXG5cbiAgICBpdCBAICcweGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweDAwLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgICBpdCBAICctMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMHhkZWFkYmVlZm4sIDB4ZmYsIDB4MjEsIDB4NTIsIDB4NDEsIDB4MTFcblxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBVaW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDEyOG4sIDB4ODBcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGJpZyBudW1iZXJzIGZyb20gY3J5cHRvIGxhbmQnLCBAPT4gOjpcbiAgICBpdCBAICdQLTI1NicsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICBpdCBAICdQLTM4NCcsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYzc2MzRkODFmNDM3MmRkZjU4MWEwZGIyNDhiMGE3N2FlY2VjMTk2YWNjYzUyOTczblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgaXQgQCAnUC01MjEnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDAwMDAwMWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYTUxODY4NzgzYmYyZjk2NmI3ZmNjMDE0OGY3MDlhNWQwM2JiNWM5Yjg4OTljNDdhZWJiNmZiNzFlOTEzODY0MDluXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICBpdCBAICdjdXJ2ZTI1NTE5JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0ZGVmOWRlYTJmNzljZDY1ODEyNjMxYTVjZjVkM2VkblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgIGl0IEAgJ3NlY3AyNTZrMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cblxuXG5mdW5jdGlvbiBkZWJ1Z190ZXN0SW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGNvbnNvbGUuZ3JvdXAgQCAnVmFsdWU6ICVvJywgdmFsdWVcbiAgdHJ5IDo6XG4gICAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gICAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgZmFsc2UpXG5cbiAgICBjb25zb2xlLmxvZyBAICdhbnN3ZXI6JywgaGV4ZGJnIEAgYW5zd2VyX2JlXG4gICAgY29uc29sZS5sb2cgQCAndl9iZTonLCBoZXhkYmcgQCB2X2JlXG4gICAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cbiAgZmluYWxseSA6OlxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuXG5mdW5jdGlvbiBfdGVzdEludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICByZXR1cm47XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUJpZ0ludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cblxuZnVuY3Rpb24gX3Rlc3RVaW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIHJldHVybjtcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlQmlnVWludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ1VpbnQodmFsdWUsIGZhbHNlKVxuICBjb25zdCB2X2xlID0gZW5jb2RlQmlnVWludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuIiwiZnVuY3Rpb24gZGVjb2RlQmlnSW50KGJ1ZmZlciwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGRlY29kZUJpZ0ludExFKClcbiAgICA6IGRlY29kZUJpZ0ludEJFKCl9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludExFKGJ1ZmZlcikge31cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50QkUoYnVmZmVyKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBkZWNvZGVCaWdJbnQ7XG5leHBvcnQgeyBkZWNvZGVCaWdJbnQsIGRlY29kZUJpZ0ludEJFLCBkZWNvZGVCaWdJbnRMRSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmlnaW50X2RlY29kZS5tanMubWFwXG4iLCJjb25zdCB7IGFzc2VydCB9ID0gcmVxdWlyZSgnY2hhaScpXG5pbXBvcnQgYmlnaW50X2RlY29kZSBmcm9tICdiaWdpbnQtY29kZWMvZXNtL2JpZ2ludF9kZWNvZGUubWpzJ1xuXG5kZXNjcmliZSBAICdkZWNvZGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBiaWdpbnRfZGVjb2RlLCAnZnVuY3Rpb24nXG5cbiJdLCJuYW1lcyI6WyJlbmNvZGVJbnRvQmlnSW50QkUiLCJlbmNvZGVJbnRvQmlnSW50TEUiLCJhc3NlcnQiXSwibWFwcGluZ3MiOiI7OztFQUFBO0lBQ0U7TUFDRTs7SUFFRjtJQUNBO0lBQ0E7TUFDRTtNQUNBO01BQ0E7O0lBRUY7TUFDRTtNQUNBOzs7SUFHRjs7SUFFQTtNQUNFOzs7TUFHQTs7eUJBRW1CLGlEQUFpRDs7RUFFeEU7SUFDRTtNQUNFOztJQUVGO0lBQ0E7SUFDQTtNQUNFO01BQ0E7TUFDQTs7SUFFRjtNQUNFO01BQ0E7OztJQUdGOztJQUVBO01BQ0U7OztNQUdBOzt5QkFFbUIsaURBQWlEOztFQUV4RTtJQUNFOzs7Ozs7O0VBT0Y7SUFDRTs7SUFFQTtJQUNBO01BQ0U7UUFDRTtVQUNFOztNQUVKOztJQUVGOzs7O0VBSUY7SUFDRTs7SUFFQTtJ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
