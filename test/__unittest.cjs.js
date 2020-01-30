'use strict';

function _as_u8_data(u8buf) {
  return u8buf instanceof Uint8Array ? u8buf
    : new Uint8Array(new ArrayBuffer(u8buf)) }

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

const encodeIntoBigIntBE = _encodeIntoBigIntBE.bind(null, true);
const encodeIntoBigUintBE = _encodeIntoBigIntBE.bind(null, false);

function _encodeIntoBigIntBE(as_signed, value, u8buf) {
  if (! as_signed && value < 0n) {
    throw new Error('Unable to encode a negative BigInt in unsigned format') }

  if (undefined === u8buf) {
    u8buf = _u8buf_for_bigint(value);}

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
  if (! as_signed && value < 0n) {
    throw new Error('Unable to encode a negative BigInt in unsigned format') }

  if (undefined === u8buf) {
    u8buf = _u8buf_for_bigint(value);}

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
  return littleEndian
    ? encodeIntoBigIntLE(value)
    : encodeIntoBigIntBE(value)}

function decodeBigInt(u8buf, littleEndian) {
  return littleEndian
    ? decodeBigIntLE(u8buf)
    : decodeBigIntBE(u8buf)}

const decodeBigIntLE = _decodeBigIntLE.bind(null, true);
const decodeBigIntBE = _decodeBigIntBE.bind(null, true);
const decodeBigUintLE = _decodeBigIntLE.bind(null, false);
const decodeBigUintBE = _decodeBigIntBE.bind(null, false);

function _decodeBigIntLE(as_signed, u8buf) {
  const u8 = _as_u8_data(u8buf), len=u8.length;
  let v = as_signed && (0x80 & u8[len - 1]) ? -1n : 0n;
  for (let i=len-1; i>=0; i--) {
    v = (v << 8n) | BigInt(u8[i]);}
  return v}

function _decodeBigIntBE(as_signed, u8buf) {
  const u8 = _as_u8_data(u8buf), len=u8.length;
  let v = as_signed && (0x80 & u8[0]) ? -1n : 0n;
  for (let i=0; i<len; i++) {
    v = (v << 8n) | BigInt(u8[i]);}
  return v}

const BigIntCodec ={
  encode: encodeBigInt
, decode: decodeBigInt};

const { assert } = require('chai');

describe('smoke', (() => {
  it('basics', (() => {
    assert('works'); } ) );

  it('importable', (() => {
    assert.equal(typeof BigIntCodec, 'object'); } ) ); } ) );

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

const encodeIntoBigIntBE$1 = _encodeIntoBigIntBE$1.bind(null, true);
const encodeIntoBigUintBE$1 = _encodeIntoBigIntBE$1.bind(null, false);

function _encodeIntoBigIntBE$1(as_signed, value, u8buf) {
  if (! as_signed && value < 0n) {
    throw new Error('Unable to encode a negative BigInt in unsigned format') }

  if (undefined === u8buf) {
    u8buf = _u8buf_for_bigint$1(value);}

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
  if (! as_signed && value < 0n) {
    throw new Error('Unable to encode a negative BigInt in unsigned format') }

  if (undefined === u8buf) {
    u8buf = _u8buf_for_bigint$1(value);}

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
  return littleEndian
    ? encodeIntoBigIntLE$1(value)
    : encodeIntoBigIntBE$1(value)}

function encodeBigUint(value, littleEndian) {
  return littleEndian
    ? encodeIntoBigUintLE$1(value)
    : encodeIntoBigUintBE$1(value)}

function encodeBigIntLE(value) {
  return encodeIntoBigIntLE$1(value)}

function encodeBigIntBE(value) {
  return encodeIntoBigIntBE$1(value)}

function encodeBigUintLE(value) {
  return encodeIntoBigUintLE$1(value)}

function encodeBigUintBE(value) {
  return encodeIntoBigUintBE$1(value)}

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

function _as_u8_data$1(u8buf) {
  return u8buf instanceof Uint8Array ? u8buf
    : new Uint8Array(new ArrayBuffer(u8buf)) }

const decodeBigIntLE$1 = _decodeBigIntLE$1.bind(null, true);
const decodeBigIntBE$1 = _decodeBigIntBE$1.bind(null, true);
const decodeBigUintLE$1 = _decodeBigIntLE$1.bind(null, false);
const decodeBigUintBE$1 = _decodeBigIntBE$1.bind(null, false);

function _decodeBigIntLE$1(as_signed, u8buf) {
  const u8 = _as_u8_data$1(u8buf), len=u8.length;
  let v = as_signed && (0x80 & u8[len - 1]) ? -1n : 0n;
  for (let i=len-1; i>=0; i--) {
    v = (v << 8n) | BigInt(u8[i]);}
  return v}

function _decodeBigIntBE$1(as_signed, u8buf) {
  const u8 = _as_u8_data$1(u8buf), len=u8.length;
  let v = as_signed && (0x80 & u8[0]) ? -1n : 0n;
  for (let i=0; i<len; i++) {
    v = (v << 8n) | BigInt(u8[i]);}
  return v}

const { assert: assert$3 } = require('chai');



describe('decode', (() => {
  it('importable', (() => {
    assert$3.equal(typeof decodeBigIntLE$1, 'function');
    assert$3.equal(typeof decodeBigIntBE$1, 'function');
    assert$3.equal(typeof decodeBigUintLE$1, 'function');
    assert$3.equal(typeof decodeBigUintBE$1, 'function'); } ) );

  describe('decode Int', (() => {
    _roundTripSuite('0n', 0n);
    _roundTripSuite('1n', 1n);
    _roundTripSuite('-1n', 1n);
    _roundTripSuite('127n', 127n);
    _roundTripSuite('-127n', -127n);
    _roundTripSuite('128n', 128n);
    _roundTripSuite('-128n', -128n);
    _roundTripSuite('0xdeadbeef', 0xdeadbeefn);
    _roundTripSuite('-0xdeadbeef', -0xdeadbeefn); } ) );

  describe('decode big numbers from crypto land', (() => {
    _roundTripSuite('P-256', 0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551n);
    _roundTripSuite('P-384', 0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973n);
    _roundTripSuite('P-521', 0x000001fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409n);
    _roundTripSuite('curve25519', 0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn);
    _roundTripSuite('secp256k1', 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n); } ) ); } ) );

function _roundTripSuite(title, n0) {
  return describe(title, (() => {

    if (n0 >= 0n) {
      it(`Decode Uint LE`, (() => {
        const res = encodeBigUintLE(n0);
        const n1 = decodeBigUintLE$1(res);
        assert$3.equal(n1, n0); } ) );

      it(`Decode Uint BE`, (() => {
        const res = encodeBigUintBE(n0);
        const n1 = decodeBigUintBE$1(res);
        assert$3.equal(n1, n0); } ) ); }


    it(`Decode Int LE`, (() => {
      const res = encodeBigIntLE(n0);
      const n1 = decodeBigIntLE$1(res);
      assert$3.equal(n1, n0); } ) );

    it(`Decode Int BE`, (() => {
      const res = encodeBigIntBE(n0);
      const n1 = decodeBigIntBE$1(res);
      assert$3.equal(n1, n0); } ) ); } ) ) }

require('source-map-support').install();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5janMuanMiLCJzb3VyY2VzIjpbIi4uL2VzbS9pbmRleC5tanMiLCJ1bml0L3Ntb2tlLmpzeSIsIi4uL2VzbS9iaWdpbnRfZW5jb2RlLm1qcyIsInVuaXQvZW5jb2RlX2ludG8uanN5IiwidW5pdC9lbmNvZGVfYWxsb2MuanN5IiwiLi4vZXNtL2JpZ2ludF9kZWNvZGUubWpzIiwidW5pdC9kZWNvZGUuanN5IiwidW5pdHRlc3QuanN5Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF9hc191OF9kYXRhKHU4YnVmKSB7XG4gIHJldHVybiB1OGJ1ZiBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyB1OGJ1ZlxuICAgIDogbmV3IFVpbnQ4QXJyYXkobmV3IEFycmF5QnVmZmVyKHU4YnVmKSkgfVxuXG5mdW5jdGlvbiBfdThidWZfZm9yX2JpZ2ludCh2KSB7XG4gIGlmICgwbiA+IHYpIHtcbiAgICB2ID0gLXY7fVxuXG4gIC8vIHJvdWdoIHNpemUgZXN0aW1hdGVcbiAgbGV0IHNpemUgPSAzMjtcbiAgbGV0IGFsbG9jID0gMm4gKiogQmlnSW50KHNpemUpO1xuICB3aGlsZSAoYWxsb2MgPD0gdikge1xuICAgIGFsbG9jIDw8PSAyNTZuO1xuICAgIHNpemUgKz0gMzI7fVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheShzaXplKX1cblxuY29uc3QgZW5jb2RlSW50b0JpZ0ludEJFID0gX2VuY29kZUludG9CaWdJbnRCRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZW5jb2RlSW50b0JpZ1VpbnRCRSA9IF9lbmNvZGVJbnRvQmlnSW50QkUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9lbmNvZGVJbnRvQmlnSW50QkUoYXNfc2lnbmVkLCB2YWx1ZSwgdThidWYpIHtcbiAgaWYgKCEgYXNfc2lnbmVkICYmIHZhbHVlIDwgMG4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBlbmNvZGUgYSBuZWdhdGl2ZSBCaWdJbnQgaW4gdW5zaWduZWQgZm9ybWF0JykgfVxuXG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBfdThidWZfZm9yX2JpZ2ludCh2YWx1ZSk7fVxuXG4gIGNvbnN0IGxlbiA9IHU4YnVmLmxlbmd0aDtcbiAgbGV0IGk9bGVuLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaT4wICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWy0taV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAodl9uZXh0IT09dl90aXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgdW5zaWduZWQgQmlnSW50IHZhbHVlJykgfVxuXG4gIGlmIChpPGxlbi0xKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGNvbnN0IHNwID0gYXNfc2lnbmVkICYmICgweDgwICYgdThidWZbaSsxXSk7XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgKz0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgKz0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKGkpO1xuICByZXR1cm4gdThyZXN9XG5cbmNvbnN0IGVuY29kZUludG9CaWdJbnRMRSA9IF9lbmNvZGVJbnRvQmlnSW50TEUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGVuY29kZUludG9CaWdVaW50TEUgPSBfZW5jb2RlSW50b0JpZ0ludExFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZW5jb2RlSW50b0JpZ0ludExFKGFzX3NpZ25lZCwgdmFsdWUsIHU4YnVmKSB7XG4gIGlmICghIGFzX3NpZ25lZCAmJiB2YWx1ZSA8IDBuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZW5jb2RlIGEgbmVnYXRpdmUgQmlnSW50IGluIHVuc2lnbmVkIGZvcm1hdCcpIH1cblxuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO31cblxuICBjb25zdCBtYXhfaSA9IHU4YnVmLmxlbmd0aC0xO1xuICBsZXQgaT0tMSwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk8bWF4X2kgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbKytpXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmICh2X25leHQhPT12X3RpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSB1bnNpZ25lZCBCaWdJbnQgdmFsdWUnKSB9XG5cbiAgaWYgKGk+MCkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBjb25zdCBzcCA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4YnVmW2ktMV0pO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpIC09IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpIC09IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZSgwLCBpKzEpO1xuICByZXR1cm4gdThyZXN9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1ZilcbiAgICA6IGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgbGl0dGxlRW5kaWFuLCB1OGJ1Zikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlLCB1OGJ1ZilcbiAgICA6IGVuY29kZUludG9CaWdVaW50QkUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlKVxuICAgIDogZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdVaW50TEUodmFsdWUpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50TEUodmFsdWUpIHtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludEJFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50TEUodmFsdWUpIHtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdVaW50TEUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50QkUodmFsdWUpIHtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdVaW50QkUodmFsdWUpfVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnQodThidWYsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBkZWNvZGVCaWdJbnRMRSh1OGJ1ZilcbiAgICA6IGRlY29kZUJpZ0ludEJFKHU4YnVmKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnVWludCh1OGJ1ZiwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGRlY29kZUJpZ1VpbnRMRSh1OGJ1ZilcbiAgICA6IGRlY29kZUJpZ1VpbnRCRSh1OGJ1Zil9XG5cbmNvbnN0IGRlY29kZUJpZ0ludExFID0gX2RlY29kZUJpZ0ludExFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBkZWNvZGVCaWdJbnRCRSA9IF9kZWNvZGVCaWdJbnRCRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZGVjb2RlQmlnVWludExFID0gX2RlY29kZUJpZ0ludExFLmJpbmQobnVsbCwgZmFsc2UpO1xuY29uc3QgZGVjb2RlQmlnVWludEJFID0gX2RlY29kZUJpZ0ludEJFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZGVjb2RlQmlnSW50TEUoYXNfc2lnbmVkLCB1OGJ1Zikge1xuICBjb25zdCB1OCA9IF9hc191OF9kYXRhKHU4YnVmKSwgbGVuPXU4Lmxlbmd0aDtcbiAgbGV0IHYgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OFtsZW4gLSAxXSkgPyAtMW4gOiAwbjtcbiAgZm9yIChsZXQgaT1sZW4tMTsgaT49MDsgaS0tKSB7XG4gICAgdiA9ICh2IDw8IDhuKSB8IEJpZ0ludCh1OFtpXSk7fVxuICByZXR1cm4gdn1cblxuZnVuY3Rpb24gX2RlY29kZUJpZ0ludEJFKGFzX3NpZ25lZCwgdThidWYpIHtcbiAgY29uc3QgdTggPSBfYXNfdThfZGF0YSh1OGJ1ZiksIGxlbj11OC5sZW5ndGg7XG4gIGxldCB2ID0gYXNfc2lnbmVkICYmICgweDgwICYgdThbMF0pID8gLTFuIDogMG47XG4gIGZvciAobGV0IGk9MDsgaTxsZW47IGkrKykge1xuICAgIHYgPSAodiA8PCA4bikgfCBCaWdJbnQodThbaV0pO31cbiAgcmV0dXJuIHZ9XG5cbmNvbnN0IEJpZ0ludENvZGVjID17XG4gIGVuY29kZTogZW5jb2RlQmlnSW50XG4sIGRlY29kZTogZGVjb2RlQmlnSW50fTtcblxuZXhwb3J0IGRlZmF1bHQgQmlnSW50Q29kZWM7XG5leHBvcnQgeyBCaWdJbnRDb2RlYywgZGVjb2RlQmlnSW50LCBkZWNvZGVCaWdJbnRCRSwgZGVjb2RlQmlnSW50TEUsIGRlY29kZUJpZ1VpbnQsIGRlY29kZUJpZ1VpbnRCRSwgZGVjb2RlQmlnVWludExFLCBlbmNvZGVCaWdJbnQsIGVuY29kZUJpZ0ludEJFLCBlbmNvZGVCaWdJbnRMRSwgZW5jb2RlQmlnVWludCwgZW5jb2RlQmlnVWludEJFLCBlbmNvZGVCaWdVaW50TEUsIGVuY29kZUludG9CaWdJbnQsIGVuY29kZUludG9CaWdJbnRCRSwgZW5jb2RlSW50b0JpZ0ludExFLCBlbmNvZGVJbnRvQmlnVWludCwgZW5jb2RlSW50b0JpZ1VpbnRCRSwgZW5jb2RlSW50b0JpZ1VpbnRMRSB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgubWpzLm1hcFxuIiwiY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuaW1wb3J0IGJpZ2ludF9jb2RlYyBmcm9tICdiaWdpbnQtY29kZWMnXG5cbmRlc2NyaWJlIEAgJ3Ntb2tlJywgQD0+IDo6XG4gIGl0IEAgJ2Jhc2ljcycsIEA9PiA6OlxuICAgIGFzc2VydCBAICd3b3JrcydcblxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGJpZ2ludF9jb2RlYywgJ29iamVjdCdcblxuIiwiZnVuY3Rpb24gX3U4YnVmX2Zvcl9iaWdpbnQodikge1xuICBpZiAoMG4gPiB2KSB7XG4gICAgdiA9IC12O31cblxuICAvLyByb3VnaCBzaXplIGVzdGltYXRlXG4gIGxldCBzaXplID0gMzI7XG4gIGxldCBhbGxvYyA9IDJuICoqIEJpZ0ludChzaXplKTtcbiAgd2hpbGUgKGFsbG9jIDw9IHYpIHtcbiAgICBhbGxvYyA8PD0gMjU2bjtcbiAgICBzaXplICs9IDMyO31cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSl9XG5cbmNvbnN0IGVuY29kZUludG9CaWdJbnRCRSA9IF9lbmNvZGVJbnRvQmlnSW50QkUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGVuY29kZUludG9CaWdVaW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZW5jb2RlSW50b0JpZ0ludEJFKGFzX3NpZ25lZCwgdmFsdWUsIHU4YnVmKSB7XG4gIGlmICghIGFzX3NpZ25lZCAmJiB2YWx1ZSA8IDBuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZW5jb2RlIGEgbmVnYXRpdmUgQmlnSW50IGluIHVuc2lnbmVkIGZvcm1hdCcpIH1cblxuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPWxlbiwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk+MCAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlstLWldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaTxsZW4tMSkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBjb25zdCBzcCA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4YnVmW2krMV0pO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpICs9IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpICs9IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZShpKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5jb25zdCBlbmNvZGVJbnRvQmlnSW50TEUgPSBfZW5jb2RlSW50b0JpZ0ludExFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRMRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAoISBhc19zaWduZWQgJiYgdmFsdWUgPCAwbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGVuY29kZSBhIG5lZ2F0aXZlIEJpZ0ludCBpbiB1bnNpZ25lZCBmb3JtYXQnKSB9XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTt9XG5cbiAgY29uc3QgbWF4X2kgPSB1OGJ1Zi5sZW5ndGgtMTtcbiAgbGV0IGk9LTEsIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPG1heF9pICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWysraV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAodl9uZXh0IT09dl90aXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgdW5zaWduZWQgQmlnSW50IHZhbHVlJykgfVxuXG4gIGlmIChpPjApIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpLTFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSAtPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSAtPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoMCwgaSsxKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlKVxuICAgIDogZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludExFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRCRSh2YWx1ZSkge1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludExFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludEJFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlKX1cblxuZXhwb3J0IGRlZmF1bHQgZW5jb2RlQmlnSW50O1xuZXhwb3J0IHsgZW5jb2RlQmlnSW50LCBlbmNvZGVCaWdJbnRCRSwgZW5jb2RlQmlnSW50TEUsIGVuY29kZUJpZ1VpbnQsIGVuY29kZUJpZ1VpbnRCRSwgZW5jb2RlQmlnVWludExFLCBlbmNvZGVJbnRvQmlnSW50LCBlbmNvZGVJbnRvQmlnSW50QkUsIGVuY29kZUludG9CaWdJbnRMRSwgZW5jb2RlSW50b0JpZ1VpbnQsIGVuY29kZUludG9CaWdVaW50QkUsIGVuY29kZUludG9CaWdVaW50TEUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpZ2ludF9lbmNvZGUubWpzLm1hcFxuIiwiaW1wb3J0IEB7fSBlbmNvZGVJbnRvQmlnSW50LCBlbmNvZGVJbnRvQmlnVWludFxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVJbnRvQmlnSW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGludG8gSW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICctMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTFuLCAweGZmXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xMjhuLCAweDgwXG5cbiAgICBpdCBAICctMTI3JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMTI3biwgMHg4MVxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMHhkZWFkYmVlZm4sIDB4ZmYsIDB4MjEsIDB4NTIsIDB4NDEsIDB4MTFcblxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBpbnRvIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGJpZyBudW1iZXJzIGZyb20gY3J5cHRvIGxhbmQnLCBAPT4gOjpcbiAgICBpdCBAICdQLTI1NicsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgIGl0IEAgJ1AtNTIxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgwMDAwMDFmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmE1MTg2ODc4M2JmMmY5NjZiN2ZjYzAxNDhmNzA5YTVkMDNiYjVjOWI4ODk5YzQ3YWViYjZmYjcxZTkxMzg2NDA5blxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICBpdCBAICdjdXJ2ZTI1NTE5JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0ZGVmOWRlYTJmNzljZDY1ODEyNjMxYTVjZjVkM2VkblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvSW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUludG9CaWdJbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvVWludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJpbXBvcnQgQHt9IGVuY29kZUJpZ0ludCwgZW5jb2RlQmlnVWludFxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUgcm9wZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGVuY29kZUJpZ0ludCwgJ2Z1bmN0aW9uJ1xuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVCaWdVaW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIEludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJy0xJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xbiwgMHhmZlxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyOG4sIDB4ODBcblxuICAgIGl0IEAgJy0xMjcnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyN24sIDB4ODFcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0weGRlYWRiZWVmbiwgMHhmZiwgMHgyMSwgMHg1MiwgMHg0MSwgMHgxMVxuXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICBkZXNjcmliZSBAICdlbmNvZGUgYmlnIG51bWJlcnMgZnJvbSBjcnlwdG8gbGFuZCcsIEA9PiA6OlxuICAgIGl0IEAgJ1AtMjU2JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZjAwMDAwMDAwZmZmZmZmZmZmZmZmZmZmZmJjZTZmYWFkYTcxNzllODRmM2I5Y2FjMmZjNjMyNTUxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICBpdCBAICdQLTUyMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgIGl0IEAgJ2N1cnZlMjU1MTknLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTRkZWY5ZGVhMmY3OWNkNjU4MTI2MzFhNWNmNWQzZWRuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUJpZ0ludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cbmZ1bmN0aW9uIF90ZXN0VWludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVCaWdVaW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlQmlnVWludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJmdW5jdGlvbiBfYXNfdThfZGF0YSh1OGJ1Zikge1xuICByZXR1cm4gdThidWYgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gdThidWZcbiAgICA6IG5ldyBVaW50OEFycmF5KG5ldyBBcnJheUJ1ZmZlcih1OGJ1ZikpIH1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50KHU4YnVmLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnSW50TEUodThidWYpXG4gICAgOiBkZWNvZGVCaWdJbnRCRSh1OGJ1Zil9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ1VpbnQodThidWYsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBkZWNvZGVCaWdVaW50TEUodThidWYpXG4gICAgOiBkZWNvZGVCaWdVaW50QkUodThidWYpfVxuXG5jb25zdCBkZWNvZGVCaWdJbnRMRSA9IF9kZWNvZGVCaWdJbnRMRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZGVjb2RlQmlnSW50QkUgPSBfZGVjb2RlQmlnSW50QkUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGRlY29kZUJpZ1VpbnRMRSA9IF9kZWNvZGVCaWdJbnRMRS5iaW5kKG51bGwsIGZhbHNlKTtcbmNvbnN0IGRlY29kZUJpZ1VpbnRCRSA9IF9kZWNvZGVCaWdJbnRCRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2RlY29kZUJpZ0ludExFKGFzX3NpZ25lZCwgdThidWYpIHtcbiAgY29uc3QgdTggPSBfYXNfdThfZGF0YSh1OGJ1ZiksIGxlbj11OC5sZW5ndGg7XG4gIGxldCB2ID0gYXNfc2lnbmVkICYmICgweDgwICYgdThbbGVuIC0gMV0pID8gLTFuIDogMG47XG4gIGZvciAobGV0IGk9bGVuLTE7IGk+PTA7IGktLSkge1xuICAgIHYgPSAodiA8PCA4bikgfCBCaWdJbnQodThbaV0pO31cbiAgcmV0dXJuIHZ9XG5cbmZ1bmN0aW9uIF9kZWNvZGVCaWdJbnRCRShhc19zaWduZWQsIHU4YnVmKSB7XG4gIGNvbnN0IHU4ID0gX2FzX3U4X2RhdGEodThidWYpLCBsZW49dTgubGVuZ3RoO1xuICBsZXQgdiA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4WzBdKSA/IC0xbiA6IDBuO1xuICBmb3IgKGxldCBpPTA7IGk8bGVuOyBpKyspIHtcbiAgICB2ID0gKHYgPDwgOG4pIHwgQmlnSW50KHU4W2ldKTt9XG4gIHJldHVybiB2fVxuXG5leHBvcnQgZGVmYXVsdCBkZWNvZGVCaWdJbnQ7XG5leHBvcnQgeyBkZWNvZGVCaWdJbnQsIGRlY29kZUJpZ0ludEJFLCBkZWNvZGVCaWdJbnRMRSwgZGVjb2RlQmlnVWludCwgZGVjb2RlQmlnVWludEJFLCBkZWNvZGVCaWdVaW50TEUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpZ2ludF9kZWNvZGUubWpzLm1hcFxuIiwiY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5pbXBvcnQgQHt9XG4gIGVuY29kZUJpZ0ludExFLCBlbmNvZGVCaWdJbnRCRVxuICBlbmNvZGVCaWdVaW50TEUsIGVuY29kZUJpZ1VpbnRCRVxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuaW1wb3J0IEB7fVxuICBkZWNvZGVCaWdJbnRMRSwgZGVjb2RlQmlnSW50QkVcbiAgZGVjb2RlQmlnVWludExFLCBkZWNvZGVCaWdVaW50QkVcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2RlY29kZS5tanMnXG5cblxuXG5kZXNjcmliZSBAICdkZWNvZGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBkZWNvZGVCaWdJbnRMRSwgJ2Z1bmN0aW9uJ1xuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBkZWNvZGVCaWdJbnRCRSwgJ2Z1bmN0aW9uJ1xuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBkZWNvZGVCaWdVaW50TEUsICdmdW5jdGlvbidcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZGVjb2RlQmlnVWludEJFLCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZGVjb2RlIEludCcsIEA9PiA6OlxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICcwbicsIDBuXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJzFuJywgMW5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnLTFuJywgMW5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnMTI3bicsIDEyN25cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnLTEyN24nLCAtMTI3blxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICcxMjhuJywgMTI4blxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICctMTI4bicsIC0xMjhuXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJzB4ZGVhZGJlZWYnLCAweGRlYWRiZWVmblxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICctMHhkZWFkYmVlZicsIC0weGRlYWRiZWVmblxuXG4gIGRlc2NyaWJlIEAgJ2RlY29kZSBiaWcgbnVtYmVycyBmcm9tIGNyeXB0byBsYW5kJywgQD0+IDo6XG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJ1AtMjU2JywgMHhmZmZmZmZmZjAwMDAwMDAwZmZmZmZmZmZmZmZmZmZmZmJjZTZmYWFkYTcxNzllODRmM2I5Y2FjMmZjNjMyNTUxblxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICdQLTM4NCcsIDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYzc2MzRkODFmNDM3MmRkZjU4MWEwZGIyNDhiMGE3N2FlY2VjMTk2YWNjYzUyOTczblxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICdQLTUyMScsIDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnY3VydmUyNTUxOScsIDB4MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNGRlZjlkZWEyZjc5Y2Q2NTgxMjYzMWE1Y2Y1ZDNlZG5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnc2VjcDI1NmsxJywgMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuXG5mdW5jdGlvbiBfcm91bmRUcmlwU3VpdGUodGl0bGUsIG4wKSA6OlxuICByZXR1cm4gZGVzY3JpYmUgQCB0aXRsZSwgQD0+IDo6XG5cbiAgICBpZiBuMCA+PSAwbiA6OlxuICAgICAgaXQgQCBgRGVjb2RlIFVpbnQgTEVgLCBAPT4gOjpcbiAgICAgICAgY29uc3QgcmVzID0gZW5jb2RlQmlnVWludExFKG4wKVxuICAgICAgICBjb25zdCBuMSA9IGRlY29kZUJpZ1VpbnRMRShyZXMpXG4gICAgICAgIGFzc2VydC5lcXVhbCBAIG4xLCBuMFxuXG4gICAgICBpdCBAIGBEZWNvZGUgVWludCBCRWAsIEA9PiA6OlxuICAgICAgICBjb25zdCByZXMgPSBlbmNvZGVCaWdVaW50QkUobjApXG4gICAgICAgIGNvbnN0IG4xID0gZGVjb2RlQmlnVWludEJFKHJlcylcbiAgICAgICAgYXNzZXJ0LmVxdWFsIEAgbjEsIG4wXG5cblxuICAgIGl0IEAgYERlY29kZSBJbnQgTEVgLCBAPT4gOjpcbiAgICAgIGNvbnN0IHJlcyA9IGVuY29kZUJpZ0ludExFKG4wKVxuICAgICAgY29uc3QgbjEgPSBkZWNvZGVCaWdJbnRMRShyZXMpXG4gICAgICBhc3NlcnQuZXF1YWwgQCBuMSwgbjBcblxuICAgIGl0IEAgYERlY29kZSBJbnQgQkVgLCBAPT4gOjpcbiAgICAgIGNvbnN0IHJlcyA9IGVuY29kZUJpZ0ludEJFKG4wKVxuICAgICAgY29uc3QgbjEgPSBkZWNvZGVCaWdJbnRCRShyZXMpXG4gICAgICBhc3NlcnQuZXF1YWwgQCBuMSwgbjBcblxuIiwiI0lGIFBMQVRfTk9ERUpTXG4gcmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpXG5cbmltcG9ydCAnLi91bml0L3Ntb2tlLmpzeSdcbmltcG9ydCAnLi91bml0L2VuY29kZV9pbnRvLmpzeSdcbmltcG9ydCAnLi91bml0L2VuY29kZV9hbGxvYy5qc3knXG5pbXBvcnQgJy4vdW5pdC9kZWNvZGUuanN5J1xuIl0sIm5hbWVzIjpbImFzc2VydCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtFQUNFOzs7QUFHRjtFQUNFO0lBQ0U7OztFQUdGO0VBQ0E7RUFDQTtJQUNFO0lBQ0E7O0VBRUY7O0FBRUY7QUFDQTs7QUFFQTtFQUNFO0lBQ0UsZ0JBQWdCLHVEQUF1RDs7RUFFekU7SUFDRTs7RUFFRjtFQUNBO0VBQ0E7SUFDRTtJQUNBO0lBQ0E7O0VBRUY7SUFDRSxnQkFBZ0IsMERBQTBEOztFQUU1RTtJQUNFO0lBQ0E7SUFDQTs7O0VBR0Y7RUFDQTs7QUFFRjtBQUNBOztBQUVBO0VBQ0U7SUFDRSxnQkFBZ0IsdURBQXVEOztFQUV6RTtJQUNFOztFQUVGO0VBQ0E7RUFDQTtJQUNFO0lBQ0E7SUFDQTs7RUFFRjtJQUNFLGdCQUFnQiwwREFBMEQ7O0VBRTVFO0lBQ0U7SUFDQTtJQUNBOzs7RUFHRjtF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
