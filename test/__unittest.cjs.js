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

require('source-map-support').install();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5janMuanMiLCJzb3VyY2VzIjpbIi4uL2VzbS9iaWdpbnRfY29kZWMubWpzIiwidW5pdC9zbW9rZS5qc3kiLCIuLi9lc20vYmlnaW50X2VuY29kZS5tanMiLCJ1bml0L2VuY29kZS5qc3kiLCJub2RlX21vZHVsZXMvdTgtdXRpbHMvZXNtL2luZGV4LmpzIiwidW5pdC9lbmNvZGVfcm9wZS5qc3kiLCIuLi9lc20vYmlnaW50X2RlY29kZS5tanMiLCJ1bml0L2RlY29kZS5qc3kiLCJ1bml0dGVzdC5qc3kiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEwMjQpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPWxlbiwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk+MCAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlstLWldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKGk8bGVuLTEpIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV0sIHNwID0gMHg4MCAmIHU4YnVmW2krMV07XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgKz0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgKz0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKGkpO1xuXG4gIGlmIChhc190aWxlZCkge1xuICAgIHJldHVybiBbdl9uZXh0PT12X3RpcCwgdl9uZXh0LCB1OHJlc119XG5cbiAgZWxzZSBpZiAodl9uZXh0ID09IHZfdGlwKSB7XG4gICAgcmV0dXJuIHU4cmVzfVxuXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIEJpZ0ludCB2YWx1ZScpIH1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEwMjQpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPS0xLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaTxsZW4gJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbKytpXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmIChpPjApIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV0sIHNwID0gMHg4MCAmIHU4YnVmW2ktMV07XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgLT0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG5cbiAgaWYgKGFzX3RpbGVkKSB7XG4gICAgcmV0dXJuIFt2X25leHQ9PXZfdGlwLCB2X25leHQsIHU4cmVzXX1cblxuICBlbHNlIGlmICh2X25leHQgPT0gdl90aXApIHtcbiAgICByZXR1cm4gdThyZXN9XG5cbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgQmlnSW50IHZhbHVlJykgfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVCaWdJbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUJpZ0ludEJFKHZhbHVlKX1cblxuXG5cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50QkUodmFsdWUpIHtcbiAgY29uc3Qgcm9wZT1bXSwgdThfMWsgPSBuZXcgVWludDhBcnJheSgxMDI0KTtcblxuICBsZXQgZG9uZSwgdThfcGFydCwgdl90aXA9dmFsdWU7XG4gIHdoaWxlICAoISBkb25lKSB7XG4gICAgW2RvbmUsIHZfdGlwLCB1OF9wYXJ0XSA9XG4gICAgICBlbmNvZGVJbnRvQmlnSW50QkUoXG4gICAgICAgIHZfdGlwLCB1OF8xaywgdHJ1ZSk7XG5cbiAgICByb3BlLnB1c2godThfcGFydCk7IH1cblxuICByZXR1cm4gMSA9PT0gcm9wZS5sZW5ndGggPyByb3BlLnBvcCgpXG4gICAgOiBfam9pbl8xa19yb3BlKCkgfVxuXG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludExFKHZhbHVlKSB7XG4gIGNvbnN0IHJvcGU9W10sIHU4XzFrID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG5cbiAgbGV0IGRvbmUsIHU4X3BhcnQsIHZfdGlwPXZhbHVlO1xuICB3aGlsZSAgKCEgZG9uZSkge1xuICAgIFtkb25lLCB2X3RpcCwgdThfcGFydF0gPVxuICAgICAgZW5jb2RlSW50b0JpZ0ludExFKFxuICAgICAgICB2X3RpcCwgdThfMWssIHRydWUpO1xuXG4gICAgcm9wZS51bnNoaWZ0KHU4X3BhcnQpOyB9XG5cbiAgcmV0dXJuIDEgPT09IHJvcGUubGVuZ3RoID8gcm9wZS5wb3AoKVxuICAgIDogX2pvaW5fMWtfcm9wZSgpIH1cblxuXG5mdW5jdGlvbiBfam9pbl8xa19yb3BlKHJvcGUsIHBhcnRpYWwpIHtcbiAgcmV0dXJuO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnQoYnVmZmVyLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnSW50TEUoKVxuICAgIDogZGVjb2RlQmlnSW50QkUoKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50TEUoYnVmZmVyKSB7fVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnRCRShidWZmZXIpIHt9XG5cbmNvbnN0IGJpZ2ludF9jb2RlYyA9e1xuICBlbmNvZGU6IGVuY29kZUJpZ0ludFxuLCBkZWNvZGU6IGRlY29kZUJpZ0ludH07XG5cbmV4cG9ydCBkZWZhdWx0IGJpZ2ludF9jb2RlYztcbmV4cG9ydCB7IGJpZ2ludF9jb2RlYywgZGVjb2RlQmlnSW50IGFzIGRlY29kZV9iaWdpbnQsIGVuY29kZUJpZ0ludCBhcyBlbmNvZGVfYmlnaW50IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfY29kZWMubWpzLm1hcFxuIiwiY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuaW1wb3J0IGJpZ2ludF9jb2RlYyBmcm9tICdiaWdpbnQtY29kZWMnXG5cbmRlc2NyaWJlIEAgJ3Ntb2tlJywgQD0+IDo6XG4gIGl0IEAgJ2Jhc2ljcycsIEA9PiA6OlxuICAgIGFzc2VydCBAICd3b3JrcydcblxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGJpZ2ludF9jb2RlYywgJ29iamVjdCdcblxuIiwiZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1ZiwgYXNfdGlsZWQpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEwMjQpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPWxlbiwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk+MCAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlstLWldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKGk8bGVuLTEpIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV0sIHNwID0gMHg4MCAmIHU4YnVmW2krMV07XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgKz0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgKz0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKGkpO1xuXG4gIGlmIChhc190aWxlZCkge1xuICAgIHJldHVybiBbdl9uZXh0PT12X3RpcCwgdl9uZXh0LCB1OHJlc119XG5cbiAgZWxzZSBpZiAodl9uZXh0ID09IHZfdGlwKSB7XG4gICAgcmV0dXJuIHU4cmVzfVxuXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIEJpZ0ludCB2YWx1ZScpIH1cblxuXG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdVaW50QkUodmFsdWUsIHU4YnVmLCBhc190aWxlZCkge1xuICBpZiAodmFsdWUgPCAwbikge3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgbmVnYXRpdmUgQmlnSW50IHZhbHVlXCIpfVxuXG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMDI0KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmIChpPGxlbi0xKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGlmICgweDAwID09PSB2KSB7aSArPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoaSk7XG5cbiAgaWYgKGFzX3RpbGVkKSB7XG4gICAgcmV0dXJuIFt2X25leHQ9PXZfdGlwLCB2X25leHQsIHU4cmVzXX1cblxuICBlbHNlIGlmICh2X25leHQgPT0gdl90aXApIHtcbiAgICByZXR1cm4gdThyZXN9XG5cbiAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgQmlnSW50IHZhbHVlJykgfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUsIHU4YnVmLCBhc190aWxlZCkge1xuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7fVxuXG4gIGNvbnN0IGxlbiA9IHU4YnVmLmxlbmd0aDtcbiAgbGV0IGk9LTEsIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPGxlbiAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlsrK2ldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKGk+MCkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXSwgc3AgPSAweDgwICYgdThidWZbaS0xXTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSAtPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSAtPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoMCwgaSsxKTtcblxuICBpZiAoYXNfdGlsZWQpIHtcbiAgICByZXR1cm4gW3ZfbmV4dD09dl90aXAsIHZfbmV4dCwgdThyZXNdfVxuXG4gIGVsc2UgaWYgKHZfbmV4dCA9PSB2X3RpcCkge1xuICAgIHJldHVybiB1OHJlc31cblxuICBlbHNlIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSBCaWdJbnQgdmFsdWUnKSB9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdVaW50TEUodmFsdWUsIHU4YnVmLCBhc190aWxlZCkge1xuICBpZiAodmFsdWUgPCAwbikge3Rocm93IG5ldyBFcnJvcihcIkludmFsaWQgbmVnYXRpdmUgQmlnSW50IHZhbHVlXCIpfVxuXG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMDI0KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT0tMSwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk8bGVuICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWysraV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAoaT4wKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGlmICgweDAwID09PSB2KSB7aSAtPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoMCwgaSsxKTtcblxuICBpZiAoYXNfdGlsZWQpIHtcbiAgICByZXR1cm4gW3ZfbmV4dD09dl90aXAsIHZfbmV4dCwgdThyZXNdfVxuXG4gIGVsc2UgaWYgKHZfbmV4dCA9PSB2X3RpcCkge1xuICAgIHJldHVybiB1OHJlc31cblxuICBlbHNlIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSBCaWdJbnQgdmFsdWUnKSB9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1ZilcbiAgICA6IGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgbGl0dGxlRW5kaWFuLCB1OGJ1Zikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlLCB1OGJ1ZilcbiAgICA6IGVuY29kZUludG9CaWdVaW50QkUodmFsdWUsIHU4YnVmKX1cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUJpZ0ludExFKHZhbHVlKVxuICAgIDogZW5jb2RlQmlnSW50QkUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlQmlnVWludExFKHZhbHVlKVxuICAgIDogZW5jb2RlQmlnVWludEJFKHZhbHVlKX1cblxuXG5cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50QkUodmFsdWUpIHtcbiAgY29uc3Qgcm9wZT1bXSwgdThfMWsgPSBuZXcgVWludDhBcnJheSgxMDI0KTtcblxuICBsZXQgZG9uZSwgdThfcGFydCwgdl90aXA9dmFsdWU7XG4gIHdoaWxlICAoISBkb25lKSB7XG4gICAgW2RvbmUsIHZfdGlwLCB1OF9wYXJ0XSA9XG4gICAgICBlbmNvZGVJbnRvQmlnSW50QkUoXG4gICAgICAgIHZfdGlwLCB1OF8xaywgdHJ1ZSk7XG5cbiAgICByb3BlLnB1c2godThfcGFydCk7IH1cblxuICByZXR1cm4gMSA9PT0gcm9wZS5sZW5ndGggPyByb3BlLnBvcCgpXG4gICAgOiBfam9pbl8xa19yb3BlKCkgfVxuXG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludExFKHZhbHVlKSB7XG4gIGNvbnN0IHJvcGU9W10sIHU4XzFrID0gbmV3IFVpbnQ4QXJyYXkoMTAyNCk7XG5cbiAgbGV0IGRvbmUsIHU4X3BhcnQsIHZfdGlwPXZhbHVlO1xuICB3aGlsZSAgKCEgZG9uZSkge1xuICAgIFtkb25lLCB2X3RpcCwgdThfcGFydF0gPVxuICAgICAgZW5jb2RlSW50b0JpZ0ludExFKFxuICAgICAgICB2X3RpcCwgdThfMWssIHRydWUpO1xuXG4gICAgcm9wZS51bnNoaWZ0KHU4X3BhcnQpOyB9XG5cbiAgcmV0dXJuIDEgPT09IHJvcGUubGVuZ3RoID8gcm9wZS5wb3AoKVxuICAgIDogX2pvaW5fMWtfcm9wZSgpIH1cblxuXG5mdW5jdGlvbiBfam9pbl8xa19yb3BlKHJvcGUsIHBhcnRpYWwpIHtcbiAgcmV0dXJuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlbmNvZGVCaWdJbnQ7XG5leHBvcnQgeyBlbmNvZGVCaWdJbnQsIGVuY29kZUJpZ0ludEJFLCBlbmNvZGVCaWdJbnRMRSwgZW5jb2RlQmlnVWludCwgZW5jb2RlSW50b0JpZ0ludCwgZW5jb2RlSW50b0JpZ0ludEJFLCBlbmNvZGVJbnRvQmlnSW50TEUsIGVuY29kZUludG9CaWdVaW50LCBlbmNvZGVJbnRvQmlnVWludEJFLCBlbmNvZGVJbnRvQmlnVWludExFIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfZW5jb2RlLm1qcy5tYXBcbiIsImltcG9ydCBAe31cbiAgZW5jb2RlSW50b0JpZ0ludFxuICBlbmNvZGVJbnRvQmlnVWludFxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVJbnRvQmlnSW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGludG8gSW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICctMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTFuLCAweGZmXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xMjhuLCAweDgwXG5cbiAgICBpdCBAICctMTI3JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMTI3biwgMHg4MVxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMHhkZWFkYmVlZm4sIDB4ZmYsIDB4MjEsIDB4NTIsIDB4NDEsIDB4MTFcblxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBpbnRvIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGJpZyBudW1iZXJzIGZyb20gY3J5cHRvIGxhbmQnLCBAPT4gOjpcbiAgICBpdCBAICdQLTI1NicsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgIGl0IEAgJ1AtNTIxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgwMDAwMDFmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmE1MTg2ODc4M2JmMmY5NjZiN2ZjYzAxNDhmNzA5YTVkMDNiYjVjOWI4ODk5YzQ3YWViYjZmYjcxZTkxMzg2NDA5blxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICBpdCBAICdjdXJ2ZTI1NTE5JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0ZGVmOWRlYTJmNzljZDY1ODEyNjMxYTVjZjVkM2VkblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvSW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUludG9CaWdJbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvVWludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJmdW5jdGlvbiB1OF90b19iYXNlMih1OCwgc2VwKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4LmJ1ZmZlcikge1xuICAgIHU4ID0gbmV3IFVpbnQ4QXJyYXkodTgpO31cblxuICByZXR1cm4gQXJyYXlcbiAgICAuZnJvbSh1OCwgdiA9PiB2LnRvU3RyaW5nKDIpLnBhZFN0YXJ0KDgsICcwJykpXG4gICAgLmpvaW4obnVsbCAhPSBzZXAgPyBzZXAgOiAnJykgfVxuXG5cbmZ1bmN0aW9uIGJhc2UyX3RvX3U4KGJpdHMpIHtcbiAgYml0cyA9IGJpdHMucmVwbGFjZSgvW14wMV0vZywgJycpO1xuICBjb25zdCB1OCA9IG5ldyBVaW50OEFycmF5KGJpdHMubGVuZ3RoID4+IDMpO1xuICBmb3IgKGxldCBpPTAsIGkyPTA7IGk8dTgubGVuZ3RoOyBpKyssIGkyKz04KSB7XG4gICAgdThbaV0gPSBwYXJzZUludChiaXRzLnNsaWNlKGkyLCBpMis4KSwgMik7IH1cbiAgcmV0dXJuIHU4fVxuXG5mdW5jdGlvbiB1OF90b19oZXgodTgsIHNlcCkge1xuICBpZiAodW5kZWZpbmVkID09PSB1OC5idWZmZXIpIHtcbiAgICB1OCA9IG5ldyBVaW50OEFycmF5KHU4KTt9XG5cbiAgcmV0dXJuIEFycmF5XG4gICAgLmZyb20odTgsIHYgPT4gdi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSlcbiAgICAuam9pbihudWxsICE9IHNlcCA/IHNlcCA6ICcnKSB9XG5cblxuZnVuY3Rpb24gaGV4X3RvX3U4KGhleCkge1xuICBoZXggPSBoZXgucmVwbGFjZSgvW14wLTlhLWZBLUZdL2csICcnKTtcbiAgY29uc3QgdTggPSBuZXcgVWludDhBcnJheShoZXgubGVuZ3RoID4+IDEpO1xuICBmb3IgKGxldCBpPTAsIGkyPTA7IGk8dTgubGVuZ3RoOyBpKyssIGkyKz0yKSB7XG4gICAgdThbaV0gPSBwYXJzZUludChoZXguc2xpY2UoaTIsIGkyKzIpLCAxNik7IH1cbiAgcmV0dXJuIHU4fVxuXG5mdW5jdGlvbiB1OF90b19iYXNlNjQodTgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHU4KS50b1N0cmluZygnYmFzZTY0Jyl9XG5cbmZ1bmN0aW9uIGJhc2U2NF90b191OChzdHJfYjY0KSB7XG4gIHJldHVybiBVaW50OEFycmF5LmZyb20oXG4gICAgQnVmZmVyLmZyb20oc3RyX2I2NCwgJ2Jhc2U2NCcpICkgfVxuXG5mdW5jdGlvbiB1OF90b19iYXNlNjR1cmwodTgpIHtcbiAgcmV0dXJuIHU4X3RvX2Jhc2U2NCh1OClcbiAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAucmVwbGFjZSgvXFwvL2csICdfJylcbiAgICAucmVwbGFjZSgvPS9nLCAnJyl9XG5cbmZ1bmN0aW9uIHU4X3RvX3V0ZjgodTgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKHU4KS50b1N0cmluZygndXRmLTgnKX1cblxuZnVuY3Rpb24gdXRmOF90b191OCh1dGY4KSB7XG4gIHJldHVybiBVaW50OEFycmF5LmZyb20oQnVmZmVyLmZyb20odXRmOCwgJ3V0Zi04JykpIH1cblxuZnVuY3Rpb24gdXRmOF90b191OF9uZmtjKHV0ZjgpIHtcbiAgcmV0dXJuIHV0ZjhfdG9fdTgodXRmOC5ub3JtYWxpemUoJ05GS0MnKSkgfVxuXG5jb25zdCB7IHJhbmRvbUJ5dGVzLCByYW5kb21GaWxsU3luYyB9ID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbmZ1bmN0aW9uIHU4X3JhbmRvbShieXRlTGVuZ3RoKSB7XG4gIHJldHVybiBVaW50OEFycmF5LmZyb20oXG4gICAgcmFuZG9tQnl0ZXMoYnl0ZUxlbmd0aCkgKSB9XG5cbmZ1bmN0aW9uIHU4X3JhbmRvbUZpbGwodTgpIHtcbiAgcmFuZG9tRmlsbFN5bmModTgpO1xuICByZXR1cm4gdTh9XG5cbmZ1bmN0aW9uIGFzX3U4X2J1ZmZlcih1OCkge1xuICBcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih1OCkpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodTgpfVxuXG4gIGlmICh1OCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICByZXR1cm4gdTh9XG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodTgpKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHU4LmJ1ZmZlcil9XG4gIGlmICh1OCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHU4KX1cbiAgcmV0dXJuIFVpbnQ4QXJyYXkuZnJvbSh1OCl9XG5cbmZ1bmN0aW9uIHU4X2NvbmNhdChwYXJ0cykge1xuICBsZXQgaT0wLCBsZW49MDtcbiAgZm9yIChjb25zdCBiIG9mIHBhcnRzKSB7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGIuYnl0ZUxlbmd0aDtcbiAgICBpZiAgKCdudW1iZXInICE9PSB0eXBlb2YgYnl0ZUxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXJ0IGJ5dGVMZW5ndGhcIikgfVxuICAgIGxlbiArPSBieXRlTGVuZ3RoO31cblxuICBjb25zdCB1OCA9IG5ldyBVaW50OEFycmF5KGxlbik7XG4gIGZvciAoY29uc3QgdThfcGFydCBvZiBwYXJ0cykge1xuICAgIHU4LnNldCh1OF9wYXJ0LCBpKTtcbiAgICBpICs9IHU4X3BhcnQuYnl0ZUxlbmd0aDt9XG4gIHJldHVybiB1OH1cblxuZXhwb3J0IHsgdThfdG9fYmFzZTIsIGJhc2UyX3RvX3U4LCB1OF90b19oZXgsIGhleF90b191OCwgdThfdG9fYmFzZTY0dXJsLCB1OF90b19iYXNlNjQsIGJhc2U2NF90b191OCwgdXRmOF90b191OF9uZmtjLCB1OF90b191dGY4LCB1dGY4X3RvX3U4LCB1OF9yYW5kb20sIHU4X3JhbmRvbUZpbGwsIGFzX3U4X2J1ZmZlciwgdThfY29uY2F0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsImltcG9ydCBAe31cbiAgZW5jb2RlQmlnSW50XG4gIGVuY29kZUJpZ1VpbnRcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2VuY29kZS5tanMnXG5cbmltcG9ydCB7IHU4X3RvX2hleCB9IGZyb20gJ3U4LXV0aWxzJ1xuY29uc3QgaGV4ZGJnID0gdiA9PiB1OF90b19oZXgodiwgJzonKVxuXG5jb25zdCB7IGFzc2VydCB9ID0gcmVxdWlyZSgnY2hhaScpXG5cbmRlc2NyaWJlIEAgJ2VuY29kZSByb3BlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZW5jb2RlQmlnSW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIEludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJy0xJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xbiwgMHhmZlxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyOG4sIDB4ODBcblxuICAgIGl0IEAgJy0xMjcnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyN24sIDB4ODFcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0weGRlYWRiZWVmbiwgMHhmZiwgMHgyMSwgMHg1MiwgMHg0MSwgMHgxMVxuXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICBkZXNjcmliZSBAICdlbmNvZGUgYmlnIG51bWJlcnMgZnJvbSBjcnlwdG8gbGFuZCcsIEA9PiA6OlxuICAgIGl0IEAgJ1AtMjU2JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZjAwMDAwMDAwZmZmZmZmZmZmZmZmZmZmZmJjZTZmYWFkYTcxNzllODRmM2I5Y2FjMmZjNjMyNTUxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICBpdCBAICdQLTUyMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgIGl0IEAgJ2N1cnZlMjU1MTknLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTRkZWY5ZGVhMmY3OWNkNjU4MTI2MzFhNWNmNWQzZWRuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuXG5cbmZ1bmN0aW9uIGRlYnVnX3Rlc3RJbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgY29uc29sZS5ncm91cCBAICdWYWx1ZTogJW8nLCB2YWx1ZVxuICB0cnkgOjpcbiAgICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgICBjb25zdCB2X2JlID0gZW5jb2RlQmlnSW50KHZhbHVlLCBmYWxzZSlcblxuICAgIGNvbnNvbGUubG9nIEAgJ2Fuc3dlcjonLCBoZXhkYmcgQCBhbnN3ZXJfYmVcbiAgICBjb25zb2xlLmxvZyBAICd2X2JlOicsIGhleGRiZyBAIHZfYmVcbiAgICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuICBmaW5hbGx5IDo6XG4gICAgY29uc29sZS5ncm91cEVuZCgpXG5cbmZ1bmN0aW9uIF90ZXN0SW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIHJldHVybjtcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlQmlnSW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlQmlnSW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuXG5mdW5jdGlvbiBfdGVzdFVpbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgcmV0dXJuO1xuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVCaWdVaW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlQmlnVWludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJmdW5jdGlvbiBkZWNvZGVCaWdJbnQoYnVmZmVyLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnSW50TEUoKVxuICAgIDogZGVjb2RlQmlnSW50QkUoKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50TEUoYnVmZmVyKSB7fVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnRCRShidWZmZXIpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGRlY29kZUJpZ0ludDtcbmV4cG9ydCB7IGRlY29kZUJpZ0ludCwgZGVjb2RlQmlnSW50QkUsIGRlY29kZUJpZ0ludExFIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfZGVjb2RlLm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcbmltcG9ydCBiaWdpbnRfZGVjb2RlIGZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2RlY29kZS5tanMnXG5cbmRlc2NyaWJlIEAgJ2RlY29kZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGJpZ2ludF9kZWNvZGUsICdmdW5jdGlvbidcblxuIiwiI0lGIFBMQVRfTk9ERUpTXG4gcmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5pbXBvcnQgJy4vdW5pdC9zbW9rZS5qc3knXG5pbXBvcnQgJy4vdW5pdC9lbmNvZGUuanN5J1xuaW1wb3J0ICcuL3VuaXQvZW5jb2RlX3JvcGUuanN5J1xuaW1wb3J0ICcuL3VuaXQvZGVjb2RlLmpzeSdcbiJdLCJuYW1lcyI6WyJlbmNvZGVJbnRvQmlnSW50QkUiLCJlbmNvZGVJbnRvQmlnSW50TEUiLCJhc3NlcnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7RUFDRTtJQUNFOztFQUVGO0VBQ0E7RUFDQTtJQUNFO0lBQ0E7SUFDQTs7RUFFRjtJQUNFO0lBQ0E7OztFQUdGOztFQUVBO0lBQ0U7OztJQUdBOzt1QkFFbUIsaURBQWlE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
