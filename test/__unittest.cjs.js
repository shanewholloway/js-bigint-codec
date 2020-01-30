'use strict';

const encodeIntoBigIntBE = _encodeIntoBigIntBE.bind(null, true);
const encodeIntoBigUintBE = _encodeIntoBigIntBE.bind(null, false);

function _encodeIntoBigIntBE(as_signed, value, u8buf) {
  if (undefined === u8buf) {
    u8buf = new Uint8Array(128);}

  const len = u8buf.length;
  let i=len, v_next=value, v_tip;
  while (i>0 && v_next!==v_tip) {
    v_tip = v_next;
    v_next = v_next >> 8n;
    u8buf[--i] = Number(v_tip & 0xffn); }

  if (v_next!==v_tip) {
    throw new Error('Insuffecient buffer size to encode unsigned BigInt value') }

  if (i<len-1) {
    const v = u8buf[i];
    const sp = as_signed && (0x80 & u8buf[i+1]);
    if (0x00 === v && ! sp) {i += 1;}
    else if (0xff === v && sp) {i += 1;} }

  const u8res = u8buf.slice(i);
  return u8res}

const encodeIntoBigIntLE = _encodeIntoBigIntLE.bind(null, true);
const encodeIntoBigUintLE = _encodeIntoBigIntLE.bind(null, false);

function _encodeIntoBigIntLE(as_signed, value, u8buf) {
  if (undefined === u8buf) {
    u8buf = new Uint8Array(128);}

  const max_i = u8buf.length-1;
  let i=-1, v_next=value, v_tip;
  while (i<max_i && v_next!==v_tip) {
    v_tip = v_next;
    v_next = v_next >> 8n;
    u8buf[++i] = Number(v_tip & 0xffn); }

  if (v_next!==v_tip) {
    throw new Error('Insuffecient buffer size to encode unsigned BigInt value') }

  if (i>0) {
    const v = u8buf[i];
    const sp = as_signed && (0x80 & u8buf[i-1]);
    if (0x00 === v && ! sp) {i -= 1;}
    else if (0xff === v && sp) {i -= 1;} }

  const u8res = u8buf.slice(0, i+1);
  return u8res}

function encodeBigInt(value, littleEndian) {
  const u8buf = _u8buf_for_bigint(value);
  return littleEndian
    ? encodeIntoBigIntLE(value, u8buf)
    : encodeIntoBigIntBE(value, u8buf)}


function _u8buf_for_bigint(v) {
  if (0n > v) {
    v = -v;}

  // rough size estimate
  let size = 32;
  let alloc = 2n ** BigInt(size);
  while (alloc <= v) {
    alloc <<= 256n;
    size += 32;}

  return new Uint8Array(size)}

function decodeBigInt(buffer, littleEndian) {
  return littleEndian
    ? decodeBigIntLE()
    : decodeBigIntBE()}

function decodeBigIntLE(buffer) {}

function decodeBigIntBE(buffer) {}

const bigint_codec ={
  encode: encodeBigInt
, decode: decodeBigInt};

const { assert } = require('chai');

describe('smoke', (() => {
  it('basics', (() => {
    assert('works'); } ) );

  it('importable', (() => {
    assert.equal(typeof bigint_codec, 'object'); } ) ); } ) );

const encodeIntoBigIntBE$1 = _encodeIntoBigIntBE$1.bind(null, true);
const encodeIntoBigUintBE$1 = _encodeIntoBigIntBE$1.bind(null, false);

function _encodeIntoBigIntBE$1(as_signed, value, u8buf) {
  if (undefined === u8buf) {
    u8buf = new Uint8Array(128);}

  const len = u8buf.length;
  let i=len, v_next=value, v_tip;
  while (i>0 && v_next!==v_tip) {
    v_tip = v_next;
    v_next = v_next >> 8n;
    u8buf[--i] = Number(v_tip & 0xffn); }

  if (v_next!==v_tip) {
    throw new Error('Insuffecient buffer size to encode unsigned BigInt value') }

  if (i<len-1) {
    const v = u8buf[i];
    const sp = as_signed && (0x80 & u8buf[i+1]);
    if (0x00 === v && ! sp) {i += 1;}
    else if (0xff === v && sp) {i += 1;} }

  const u8res = u8buf.slice(i);
  return u8res}

const encodeIntoBigIntLE$1 = _encodeIntoBigIntLE$1.bind(null, true);
const encodeIntoBigUintLE$1 = _encodeIntoBigIntLE$1.bind(null, false);

function _encodeIntoBigIntLE$1(as_signed, value, u8buf) {
  if (undefined === u8buf) {
    u8buf = new Uint8Array(128);}

  const max_i = u8buf.length-1;
  let i=-1, v_next=value, v_tip;
  while (i<max_i && v_next!==v_tip) {
    v_tip = v_next;
    v_next = v_next >> 8n;
    u8buf[++i] = Number(v_tip & 0xffn); }

  if (v_next!==v_tip) {
    throw new Error('Insuffecient buffer size to encode unsigned BigInt value') }

  if (i>0) {
    const v = u8buf[i];
    const sp = as_signed && (0x80 & u8buf[i-1]);
    if (0x00 === v && ! sp) {i -= 1;}
    else if (0xff === v && sp) {i -= 1;} }

  const u8res = u8buf.slice(0, i+1);
  return u8res}

function encodeIntoBigInt(value, littleEndian, u8buf) {
  return littleEndian
    ? encodeIntoBigIntLE$1(value, u8buf)
    : encodeIntoBigIntBE$1(value, u8buf)}

function encodeIntoBigUint(value, littleEndian, u8buf) {
  return littleEndian
    ? encodeIntoBigUintLE$1(value, u8buf)
    : encodeIntoBigUintBE$1(value, u8buf)}

function encodeBigInt$1(value, littleEndian) {
  const u8buf = _u8buf_for_bigint$1(value);
  return littleEndian
    ? encodeIntoBigIntLE$1(value, u8buf)
    : encodeIntoBigIntBE$1(value, u8buf)}

function encodeBigUint(value, littleEndian) {
  const u8buf = _u8buf_for_bigint$1(value);
  return littleEndian
    ? encodeIntoBigUintLE$1(value, u8buf)
    : encodeIntoBigUintBE$1(value, u8buf)}


function _u8buf_for_bigint$1(v) {
  if (0n > v) {
    v = -v;}

  // rough size estimate
  let size = 32;
  let alloc = 2n ** BigInt(size);
  while (alloc <= v) {
    alloc <<= 256n;
    size += 32;}

  return new Uint8Array(size)}

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

const { assert: assert$2 } = require('chai');

describe('encode rope', (() => {
  it('importable', (() => {
    assert$2.equal(typeof encodeBigInt$1, 'function');
    assert$2.equal(typeof encodeBigUint, 'function'); } ) );

  describe('encode Int', (() => {
    it('0', (() => {
      _testInt_BE_LE(0n, 0); } ) );

    it('1', (() => {
      _testInt_BE_LE(1n, 1); } ) );

    it('-1', (() => {
      _testInt_BE_LE(-1n, 0xff); } ) );

    it('128', (() => {
      _testInt_BE_LE(128n, 0x00, 0x80); } ) );

    it('-128', (() => {
      _testInt_BE_LE(-128n, 0x80); } ) );

    it('-127', (() => {
      _testInt_BE_LE(-127n, 0x81); } ) );

    it('0xdeadbeef', (() => {
      _testInt_BE_LE(0xdeadbeefn, 0x00, 0xde, 0xad, 0xbe, 0xef); } ) );

    it('-0xdeadbeef', (() => {
      _testInt_BE_LE(-0xdeadbeefn, 0xff, 0x21, 0x52, 0x41, 0x11); } ) ); } ) );


  describe('encode Uint', (() => {
    it('0', (() => {
      _testUint_BE_LE(0n, 0); } ) );

    it('1', (() => {
      _testUint_BE_LE(1n, 1); } ) );

    it('128', (() => {
      _testUint_BE_LE(128n, 0x80); } ) );

    it('0xdeadbeef', (() => {
      _testUint_BE_LE(0xdeadbeefn, 0xde, 0xad, 0xbe, 0xef); } ) ); } ) );

  describe('encode big numbers from crypto land', (() => {
    it('P-256', (() => {
      const n = 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n;
      _testUint_BE_LE(n,
        0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xbc, 0xe6, 0xfa, 0xad, 0xa7, 0x17, 0x9e, 0x84
      , 0xf3, 0xb9, 0xca, 0xc2, 0xfc, 0x63, 0x25, 0x51);

      _testInt_BE_LE(n, 0x00,
        0xff, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x00
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xbc, 0xe6, 0xfa, 0xad, 0xa7, 0x17, 0x9e, 0x84
      , 0xf3, 0xb9, 0xca, 0xc2, 0xfc, 0x63, 0x25, 0x51); } ) );

    it('P-384', (() => {
      const n = 0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973n;
      _testUint_BE_LE(n,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xc7, 0x63, 0x4d, 0x81, 0xf4, 0x37, 0x2d, 0xdf
      , 0x58, 0x1a, 0x0d, 0xb2, 0x48, 0xb0, 0xa7, 0x7a
      , 0xec, 0xec, 0x19, 0x6a, 0xcc, 0xc5, 0x29, 0x73);

      _testInt_BE_LE(n, 0x00,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xc7, 0x63, 0x4d, 0x81, 0xf4, 0x37, 0x2d, 0xdf
      , 0x58, 0x1a, 0x0d, 0xb2, 0x48, 0xb0, 0xa7, 0x7a
      , 0xec, 0xec, 0x19, 0x6a, 0xcc, 0xc5, 0x29, 0x73); } ) );

    it('P-521', (() => {
      const n = 0x000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409n;
      _testUint_BE_LE(n,
                    0x01, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xfa, 0x51, 0x86, 0x87, 0x83
      , 0xbf, 0x2f, 0x96, 0x6b, 0x7f, 0xcc, 0x01, 0x48
      , 0xf7, 0x09, 0xa5, 0xd0, 0x3b, 0xb5, 0xc9, 0xb8
      , 0x89, 0x9c, 0x47, 0xae, 0xbb, 0x6f, 0xb7, 0x1e
      , 0x91, 0x38, 0x64, 0x09);

      _testInt_BE_LE(n,
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
      _testUint_BE_LE(n,
        0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      , 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      , 0x14, 0xde, 0xf9, 0xde, 0xa2, 0xf7, 0x9c, 0xd6
      , 0x58, 0x12, 0x63, 0x1a, 0x5c, 0xf5, 0xd3, 0xed);

      _testInt_BE_LE(n,
        0x10, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      , 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
      , 0x14, 0xde, 0xf9, 0xde, 0xa2, 0xf7, 0x9c, 0xd6
      , 0x58, 0x12, 0x63, 0x1a, 0x5c, 0xf5, 0xd3, 0xed); } ) );

    it('secp256k1', (() => {
      const n = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;
      _testUint_BE_LE(n,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe
      , 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b
      , 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41);

      _testInt_BE_LE(n, 0x00,
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff
      , 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xfe
      , 0xba, 0xae, 0xdc, 0xe6, 0xaf, 0x48, 0xa0, 0x3b
      , 0xbf, 0xd2, 0x5e, 0x8c, 0xd0, 0x36, 0x41, 0x41); } ) ); } ) ); } ) );



function _testInt_BE_LE(value, ...answer_be) {
  answer_be = Uint8Array.from(answer_be);
  const answer_le = answer_be.slice().reverse();

  const v_be_imp = encodeBigInt$1(value);
  const v_be = encodeBigInt$1(value, false);
  const v_le = encodeBigInt$1(value, true);

  assert$2.deepEqual(v_be, v_be_imp, "Big endian mismatch explicit to implicit");
  assert$2.deepEqual(v_be, answer_be, "Big-endian encoding does not match expected answer");
  assert$2.deepEqual(v_le, answer_le, "Little-endian encoding does not match expected answer"); }

function _testUint_BE_LE(value, ...answer_be) {
  answer_be = Uint8Array.from(answer_be);
  const answer_le = answer_be.slice().reverse();

  const v_be_imp = encodeBigUint(value);
  const v_be = encodeBigUint(value, false);
  const v_le = encodeBigUint(value, true);

  assert$2.deepEqual(v_be, v_be_imp, "Big endian mismatch explicit to implicit");
  assert$2.deepEqual(v_be, answer_be, "Big-endian encoding does not match expected answer");
  assert$2.deepEqual(v_le, answer_le, "Little-endian encoding does not match expected answer"); }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5janMuanMiLCJzb3VyY2VzIjpbIi4uL2VzbS9iaWdpbnRfY29kZWMubWpzIiwidW5pdC9zbW9rZS5qc3kiLCIuLi9lc20vYmlnaW50X2VuY29kZS5tanMiLCJ1bml0L2VuY29kZV9pbnRvLmpzeSIsInVuaXQvZW5jb2RlX2FsbG9jLmpzeSIsIi4uL2VzbS9iaWdpbnRfZGVjb2RlLm1qcyIsInVuaXQvZGVjb2RlLmpzeSIsInVuaXR0ZXN0LmpzeSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlbmNvZGVJbnRvQmlnSW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludEJFID0gX2VuY29kZUludG9CaWdJbnRCRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRCRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTI4KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmICh2X25leHQhPT12X3RpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSB1bnNpZ25lZCBCaWdJbnQgdmFsdWUnKSB9XG5cbiAgaWYgKGk8bGVuLTEpIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpKzFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSArPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSArPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoaSk7XG4gIHJldHVybiB1OHJlc31cblxuY29uc3QgZW5jb2RlSW50b0JpZ0ludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZW5jb2RlSW50b0JpZ1VpbnRMRSA9IF9lbmNvZGVJbnRvQmlnSW50TEUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9lbmNvZGVJbnRvQmlnSW50TEUoYXNfc2lnbmVkLCB2YWx1ZSwgdThidWYpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEyOCk7fVxuXG4gIGNvbnN0IG1heF9pID0gdThidWYubGVuZ3RoLTE7XG4gIGxldCBpPS0xLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaTxtYXhfaSAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlsrK2ldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaT4wKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGNvbnN0IHNwID0gYXNfc2lnbmVkICYmICgweDgwICYgdThidWZbaS0xXSk7XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgLT0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG4gIHJldHVybiB1OHJlc31cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgY29uc3QgdThidWYgPSBfdThidWZfZm9yX2JpZ2ludCh2YWx1ZSk7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUsIHU4YnVmKX1cblxuXG5mdW5jdGlvbiBfdThidWZfZm9yX2JpZ2ludCh2KSB7XG4gIGlmICgwbiA+IHYpIHtcbiAgICB2ID0gLXY7fVxuXG4gIC8vIHJvdWdoIHNpemUgZXN0aW1hdGVcbiAgbGV0IHNpemUgPSAzMjtcbiAgbGV0IGFsbG9jID0gMm4gKiogQmlnSW50KHNpemUpO1xuICB3aGlsZSAoYWxsb2MgPD0gdikge1xuICAgIGFsbG9jIDw8PSAyNTZuO1xuICAgIHNpemUgKz0gMzI7fVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheShzaXplKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50KGJ1ZmZlciwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGRlY29kZUJpZ0ludExFKClcbiAgICA6IGRlY29kZUJpZ0ludEJFKCl9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludExFKGJ1ZmZlcikge31cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50QkUoYnVmZmVyKSB7fVxuXG5jb25zdCBiaWdpbnRfY29kZWMgPXtcbiAgZW5jb2RlOiBlbmNvZGVCaWdJbnRcbiwgZGVjb2RlOiBkZWNvZGVCaWdJbnR9O1xuXG5leHBvcnQgZGVmYXVsdCBiaWdpbnRfY29kZWM7XG5leHBvcnQgeyBiaWdpbnRfY29kZWMsIGRlY29kZUJpZ0ludCBhcyBkZWNvZGVfYmlnaW50LCBlbmNvZGVCaWdJbnQgYXMgZW5jb2RlX2JpZ2ludCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmlnaW50X2NvZGVjLm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcbmltcG9ydCBiaWdpbnRfY29kZWMgZnJvbSAnYmlnaW50LWNvZGVjJ1xuXG5kZXNjcmliZSBAICdzbW9rZScsIEA9PiA6OlxuICBpdCBAICdiYXNpY3MnLCBAPT4gOjpcbiAgICBhc3NlcnQgQCAnd29ya3MnXG5cbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBiaWdpbnRfY29kZWMsICdvYmplY3QnXG5cbiIsImNvbnN0IGVuY29kZUludG9CaWdJbnRCRSA9IF9lbmNvZGVJbnRvQmlnSW50QkUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGVuY29kZUludG9CaWdVaW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZW5jb2RlSW50b0JpZ0ludEJFKGFzX3NpZ25lZCwgdmFsdWUsIHU4YnVmKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMjgpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPWxlbiwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk+MCAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlstLWldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaTxsZW4tMSkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBjb25zdCBzcCA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4YnVmW2krMV0pO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpICs9IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpICs9IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZShpKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5jb25zdCBlbmNvZGVJbnRvQmlnSW50TEUgPSBfZW5jb2RlSW50b0JpZ0ludExFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRMRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTI4KTt9XG5cbiAgY29uc3QgbWF4X2kgPSB1OGJ1Zi5sZW5ndGgtMTtcbiAgbGV0IGk9LTEsIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPG1heF9pICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWysraV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAodl9uZXh0IT09dl90aXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgdW5zaWduZWQgQmlnSW50IHZhbHVlJykgfVxuXG4gIGlmIChpPjApIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpLTFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSAtPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSAtPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoMCwgaSsxKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIGNvbnN0IHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludExFKHZhbHVlKSB7XG4gIGNvbnN0IHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludEJFKHZhbHVlKSB7XG4gIGNvbnN0IHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnRMRSh2YWx1ZSkge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdVaW50TEUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludEJFKHZhbHVlKSB7XG4gIGNvbnN0IHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5cbmZ1bmN0aW9uIF91OGJ1Zl9mb3JfYmlnaW50KHYpIHtcbiAgaWYgKDBuID4gdikge1xuICAgIHYgPSAtdjt9XG5cbiAgLy8gcm91Z2ggc2l6ZSBlc3RpbWF0ZVxuICBsZXQgc2l6ZSA9IDMyO1xuICBsZXQgYWxsb2MgPSAybiAqKiBCaWdJbnQoc2l6ZSk7XG4gIHdoaWxlIChhbGxvYyA8PSB2KSB7XG4gICAgYWxsb2MgPDw9IDI1Nm47XG4gICAgc2l6ZSArPSAzMjt9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpemUpfVxuXG5leHBvcnQgZGVmYXVsdCBlbmNvZGVCaWdJbnQ7XG5leHBvcnQgeyBlbmNvZGVCaWdJbnQsIGVuY29kZUJpZ0ludEJFLCBlbmNvZGVCaWdJbnRMRSwgZW5jb2RlQmlnVWludCwgZW5jb2RlQmlnVWludEJFLCBlbmNvZGVCaWdVaW50TEUsIGVuY29kZUludG9CaWdJbnQsIGVuY29kZUludG9CaWdJbnRCRSwgZW5jb2RlSW50b0JpZ0ludExFLCBlbmNvZGVJbnRvQmlnVWludCwgZW5jb2RlSW50b0JpZ1VpbnRCRSwgZW5jb2RlSW50b0JpZ1VpbnRMRSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmlnaW50X2VuY29kZS5tanMubWFwXG4iLCJpbXBvcnQgQHt9IGVuY29kZUludG9CaWdJbnQsIGVuY29kZUludG9CaWdVaW50XG5mcm9tICdiaWdpbnQtY29kZWMvZXNtL2JpZ2ludF9lbmNvZGUubWpzJ1xuXG5jb25zdCB7IGFzc2VydCB9ID0gcmVxdWlyZSgnY2hhaScpXG5cbmRlc2NyaWJlIEAgJ2VuY29kZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGVuY29kZUludG9CaWdJbnQsICdmdW5jdGlvbidcblxuICBkZXNjcmliZSBAICdlbmNvZGUgaW50byBJbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJy0xJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMW4sIDB4ZmZcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMTI4biwgMHgwMCwgMHg4MFxuXG4gICAgaXQgQCAnLTEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTEyOG4sIDB4ODBcblxuICAgIGl0IEAgJy0xMjcnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xMjduLCAweDgxXG5cbiAgICBpdCBAICcweGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAweGRlYWRiZWVmbiwgMHgwMCwgMHhkZSwgMHhhZCwgMHhiZSwgMHhlZlxuXG4gICAgaXQgQCAnLTB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0weGRlYWRiZWVmbiwgMHhmZiwgMHgyMSwgMHg1MiwgMHg0MSwgMHgxMVxuXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGludG8gVWludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAxMjhuLCAweDgwXG5cbiAgICBpdCBAICcweGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICBkZXNjcmliZSBAICdlbmNvZGUgYmlnIG51bWJlcnMgZnJvbSBjcnlwdG8gbGFuZCcsIEA9PiA6OlxuICAgIGl0IEAgJ1AtMjU2JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZjAwMDAwMDAwZmZmZmZmZmZmZmZmZmZmZmJjZTZmYWFkYTcxNzllODRmM2I5Y2FjMmZjNjMyNTUxblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgaXQgQCAnUC0zODQnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmM3NjM0ZDgxZjQzNzJkZGY1ODFhMGRiMjQ4YjBhNzdhZWNlYzE5NmFjY2M1Mjk3M25cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgaXQgQCAnUC01MjEnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDAwMDAwMWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYTUxODY4NzgzYmYyZjk2NmI3ZmNjMDE0OGY3MDlhNWQwM2JiNWM5Yjg4OTljNDdhZWJiNmZiNzFlOTEzODY0MDluXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgIGl0IEAgJ2N1cnZlMjU1MTknLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTRkZWY5ZGVhMmY3OWNkNjU4MTI2MzFhNWNmNWQzZWRuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICBpdCBAICdzZWNwMjU2azEnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlYmFhZWRjZTZhZjQ4YTAzYmJmZDI1ZThjZDAzNjQxNDFuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cblxuXG5mdW5jdGlvbiBfdGVzdEludG9JbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUludG9CaWdJbnQodmFsdWUsIGZhbHNlKVxuICBjb25zdCB2X2xlID0gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuXG5mdW5jdGlvbiBfdGVzdEludG9VaW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIGZhbHNlKVxuICBjb25zdCB2X2xlID0gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cbiIsImltcG9ydCBAe30gZW5jb2RlQmlnSW50LCBlbmNvZGVCaWdVaW50XG5mcm9tICdiaWdpbnQtY29kZWMvZXNtL2JpZ2ludF9lbmNvZGUubWpzJ1xuXG5jb25zdCB7IGFzc2VydCB9ID0gcmVxdWlyZSgnY2hhaScpXG5cbmRlc2NyaWJlIEAgJ2VuY29kZSByb3BlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZW5jb2RlQmlnSW50LCAnZnVuY3Rpb24nXG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGVuY29kZUJpZ1VpbnQsICdmdW5jdGlvbidcblxuICBkZXNjcmliZSBAICdlbmNvZGUgSW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnLTEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTFuLCAweGZmXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMTI4biwgMHgwMCwgMHg4MFxuXG4gICAgaXQgQCAnLTEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnLTEyNycsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMTI3biwgMHg4MVxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAweGRlYWRiZWVmbiwgMHgwMCwgMHhkZSwgMHhhZCwgMHhiZSwgMHhlZlxuXG4gICAgaXQgQCAnLTB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTB4ZGVhZGJlZWZuLCAweGZmLCAweDIxLCAweDUyLCAweDQxLCAweDExXG5cblxuICBkZXNjcmliZSBAICdlbmNvZGUgVWludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAxMjhuLCAweDgwXG5cbiAgICBpdCBAICcweGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAweGRlYWRiZWVmbiwgMHhkZSwgMHhhZCwgMHhiZSwgMHhlZlxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBiaWcgbnVtYmVycyBmcm9tIGNyeXB0byBsYW5kJywgQD0+IDo6XG4gICAgaXQgQCAnUC0yNTYnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmMDAwMDAwMDBmZmZmZmZmZmZmZmZmZmZmYmNlNmZhYWRhNzE3OWU4NGYzYjljYWMyZmM2MzI1NTFuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgaXQgQCAnUC0zODQnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmM3NjM0ZDgxZjQzNzJkZGY1ODFhMGRiMjQ4YjBhNzdhZWNlYzE5NmFjY2M1Mjk3M25cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgIGl0IEAgJ1AtNTIxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgwMDAwMDFmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmE1MTg2ODc4M2JmMmY5NjZiN2ZjYzAxNDhmNzA5YTVkMDNiYjVjOWI4ODk5YzQ3YWViYjZmYjcxZTkxMzg2NDA5blxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgaXQgQCAnY3VydmUyNTUxOScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNGRlZjlkZWEyZjc5Y2Q2NTgxMjYzMWE1Y2Y1ZDNlZG5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICBpdCBAICdzZWNwMjU2azEnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlYmFhZWRjZTZhZjQ4YTAzYmJmZDI1ZThjZDAzNjQxNDFuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlQmlnSW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlQmlnSW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuZnVuY3Rpb24gX3Rlc3RVaW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUJpZ1VpbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVCaWdVaW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUJpZ1VpbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cbiIsImZ1bmN0aW9uIGRlY29kZUJpZ0ludChidWZmZXIsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBkZWNvZGVCaWdJbnRMRSgpXG4gICAgOiBkZWNvZGVCaWdJbnRCRSgpfVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnRMRShidWZmZXIpIHt9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludEJFKGJ1ZmZlcikge31cblxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlQmlnSW50O1xuZXhwb3J0IHsgZGVjb2RlQmlnSW50LCBkZWNvZGVCaWdJbnRCRSwgZGVjb2RlQmlnSW50TEUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpZ2ludF9kZWNvZGUubWpzLm1hcFxuIiwiY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuaW1wb3J0IGJpZ2ludF9kZWNvZGUgZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZGVjb2RlLm1qcydcblxuZGVzY3JpYmUgQCAnZGVjb2RlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgYmlnaW50X2RlY29kZSwgJ2Z1bmN0aW9uJ1xuXG4iLCIjSUYgUExBVF9OT0RFSlNcbiByZXF1aXJlKCdzb3VyY2UtbWFwLXN1cHBvcnQnKS5pbnN0YWxsKClcblxuaW1wb3J0ICcuL3VuaXQvc21va2UuanN5J1xuaW1wb3J0ICcuL3VuaXQvZW5jb2RlX2ludG8uanN5J1xuaW1wb3J0ICcuL3VuaXQvZW5jb2RlX2FsbG9jLmpzeSdcbmltcG9ydCAnLi91bml0L2RlY29kZS5qc3knXG4iXSwibmFtZXMiOlsiYXNzZXJ0Il0sIm1hcHBpbmdzIjoiOztB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
