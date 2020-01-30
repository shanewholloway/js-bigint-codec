(function () {
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

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5paWZlLmpzIiwic291cmNlcyI6WyIuLi9lc20vaW5kZXgubWpzIiwidW5pdC9zbW9rZS5qc3kiLCIuLi9lc20vYmlnaW50X2VuY29kZS5tanMiLCJ1bml0L2VuY29kZV9pbnRvLmpzeSIsInVuaXQvZW5jb2RlX2FsbG9jLmpzeSIsIi4uL2VzbS9iaWdpbnRfZGVjb2RlLm1qcyIsInVuaXQvZGVjb2RlLmpzeSJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBfYXNfdThfZGF0YSh1OGJ1Zikge1xuICByZXR1cm4gdThidWYgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gdThidWZcbiAgICA6IG5ldyBVaW50OEFycmF5KG5ldyBBcnJheUJ1ZmZlcih1OGJ1ZikpIH1cblxuZnVuY3Rpb24gX3U4YnVmX2Zvcl9iaWdpbnQodikge1xuICBpZiAoMG4gPiB2KSB7XG4gICAgdiA9IC12O31cblxuICAvLyByb3VnaCBzaXplIGVzdGltYXRlXG4gIGxldCBzaXplID0gMzI7XG4gIGxldCBhbGxvYyA9IDJuICoqIEJpZ0ludChzaXplKTtcbiAgd2hpbGUgKGFsbG9jIDw9IHYpIHtcbiAgICBhbGxvYyA8PD0gMjU2bjtcbiAgICBzaXplICs9IDMyO31cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSl9XG5cbmNvbnN0IGVuY29kZUludG9CaWdJbnRCRSA9IF9lbmNvZGVJbnRvQmlnSW50QkUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGVuY29kZUludG9CaWdVaW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZW5jb2RlSW50b0JpZ0ludEJFKGFzX3NpZ25lZCwgdmFsdWUsIHU4YnVmKSB7XG4gIGlmICghIGFzX3NpZ25lZCAmJiB2YWx1ZSA8IDBuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZW5jb2RlIGEgbmVnYXRpdmUgQmlnSW50IGluIHVuc2lnbmVkIGZvcm1hdCcpIH1cblxuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO31cblxuICBjb25zdCBsZW4gPSB1OGJ1Zi5sZW5ndGg7XG4gIGxldCBpPWxlbiwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk+MCAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlstLWldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaTxsZW4tMSkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBjb25zdCBzcCA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4YnVmW2krMV0pO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpICs9IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpICs9IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZShpKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5jb25zdCBlbmNvZGVJbnRvQmlnSW50TEUgPSBfZW5jb2RlSW50b0JpZ0ludExFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRMRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAoISBhc19zaWduZWQgJiYgdmFsdWUgPCAwbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGVuY29kZSBhIG5lZ2F0aXZlIEJpZ0ludCBpbiB1bnNpZ25lZCBmb3JtYXQnKSB9XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTt9XG5cbiAgY29uc3QgbWF4X2kgPSB1OGJ1Zi5sZW5ndGgtMTtcbiAgbGV0IGk9LTEsIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPG1heF9pICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWysraV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAodl9uZXh0IT09dl90aXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgdW5zaWduZWQgQmlnSW50IHZhbHVlJykgfVxuXG4gIGlmIChpPjApIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpLTFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSAtPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSAtPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoMCwgaSsxKTtcbiAgcmV0dXJuIHU4cmVzfVxuXG5mdW5jdGlvbiBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUsIHU4YnVmKX1cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbiwgdThidWYpIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSwgdThidWYpXG4gICAgOiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlKVxuICAgIDogZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludExFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRCRSh2YWx1ZSkge1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludExFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnVWludEJFKHZhbHVlKSB7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnVWludEJFKHZhbHVlKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50KHU4YnVmLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnSW50TEUodThidWYpXG4gICAgOiBkZWNvZGVCaWdJbnRCRSh1OGJ1Zil9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ1VpbnQodThidWYsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBkZWNvZGVCaWdVaW50TEUodThidWYpXG4gICAgOiBkZWNvZGVCaWdVaW50QkUodThidWYpfVxuXG5jb25zdCBkZWNvZGVCaWdJbnRMRSA9IF9kZWNvZGVCaWdJbnRMRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZGVjb2RlQmlnSW50QkUgPSBfZGVjb2RlQmlnSW50QkUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGRlY29kZUJpZ1VpbnRMRSA9IF9kZWNvZGVCaWdJbnRMRS5iaW5kKG51bGwsIGZhbHNlKTtcbmNvbnN0IGRlY29kZUJpZ1VpbnRCRSA9IF9kZWNvZGVCaWdJbnRCRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2RlY29kZUJpZ0ludExFKGFzX3NpZ25lZCwgdThidWYpIHtcbiAgY29uc3QgdTggPSBfYXNfdThfZGF0YSh1OGJ1ZiksIGxlbj11OC5sZW5ndGg7XG4gIGxldCB2ID0gYXNfc2lnbmVkICYmICgweDgwICYgdThbbGVuIC0gMV0pID8gLTFuIDogMG47XG4gIGZvciAobGV0IGk9bGVuLTE7IGk+PTA7IGktLSkge1xuICAgIHYgPSAodiA8PCA4bikgfCBCaWdJbnQodThbaV0pO31cbiAgcmV0dXJuIHZ9XG5cbmZ1bmN0aW9uIF9kZWNvZGVCaWdJbnRCRShhc19zaWduZWQsIHU4YnVmKSB7XG4gIGNvbnN0IHU4ID0gX2FzX3U4X2RhdGEodThidWYpLCBsZW49dTgubGVuZ3RoO1xuICBsZXQgdiA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4WzBdKSA/IC0xbiA6IDBuO1xuICBmb3IgKGxldCBpPTA7IGk8bGVuOyBpKyspIHtcbiAgICB2ID0gKHYgPDwgOG4pIHwgQmlnSW50KHU4W2ldKTt9XG4gIHJldHVybiB2fVxuXG5jb25zdCBCaWdJbnRDb2RlYyA9e1xuICBlbmNvZGU6IGVuY29kZUJpZ0ludFxuLCBkZWNvZGU6IGRlY29kZUJpZ0ludH07XG5cbmV4cG9ydCBkZWZhdWx0IEJpZ0ludENvZGVjO1xuZXhwb3J0IHsgQmlnSW50Q29kZWMsIGRlY29kZUJpZ0ludCwgZGVjb2RlQmlnSW50QkUsIGRlY29kZUJpZ0ludExFLCBkZWNvZGVCaWdVaW50LCBkZWNvZGVCaWdVaW50QkUsIGRlY29kZUJpZ1VpbnRMRSwgZW5jb2RlQmlnSW50LCBlbmNvZGVCaWdJbnRCRSwgZW5jb2RlQmlnSW50TEUsIGVuY29kZUJpZ1VpbnQsIGVuY29kZUJpZ1VpbnRCRSwgZW5jb2RlQmlnVWludExFLCBlbmNvZGVJbnRvQmlnSW50LCBlbmNvZGVJbnRvQmlnSW50QkUsIGVuY29kZUludG9CaWdJbnRMRSwgZW5jb2RlSW50b0JpZ1VpbnQsIGVuY29kZUludG9CaWdVaW50QkUsIGVuY29kZUludG9CaWdVaW50TEUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4Lm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcbmltcG9ydCBiaWdpbnRfY29kZWMgZnJvbSAnYmlnaW50LWNvZGVjJ1xuXG5kZXNjcmliZSBAICdzbW9rZScsIEA9PiA6OlxuICBpdCBAICdiYXNpY3MnLCBAPT4gOjpcbiAgICBhc3NlcnQgQCAnd29ya3MnXG5cbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBiaWdpbnRfY29kZWMsICdvYmplY3QnXG5cbiIsImZ1bmN0aW9uIF91OGJ1Zl9mb3JfYmlnaW50KHYpIHtcbiAgaWYgKDBuID4gdikge1xuICAgIHYgPSAtdjt9XG5cbiAgLy8gcm91Z2ggc2l6ZSBlc3RpbWF0ZVxuICBsZXQgc2l6ZSA9IDMyO1xuICBsZXQgYWxsb2MgPSAybiAqKiBCaWdJbnQoc2l6ZSk7XG4gIHdoaWxlIChhbGxvYyA8PSB2KSB7XG4gICAgYWxsb2MgPDw9IDI1Nm47XG4gICAgc2l6ZSArPSAzMjt9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHNpemUpfVxuXG5jb25zdCBlbmNvZGVJbnRvQmlnSW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludEJFID0gX2VuY29kZUludG9CaWdJbnRCRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRCRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAoISBhc19zaWduZWQgJiYgdmFsdWUgPCAwbikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGVuY29kZSBhIG5lZ2F0aXZlIEJpZ0ludCBpbiB1bnNpZ25lZCBmb3JtYXQnKSB9XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmICh2X25leHQhPT12X3RpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSB1bnNpZ25lZCBCaWdJbnQgdmFsdWUnKSB9XG5cbiAgaWYgKGk8bGVuLTEpIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpKzFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSArPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSArPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoaSk7XG4gIHJldHVybiB1OHJlc31cblxuY29uc3QgZW5jb2RlSW50b0JpZ0ludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZW5jb2RlSW50b0JpZ1VpbnRMRSA9IF9lbmNvZGVJbnRvQmlnSW50TEUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9lbmNvZGVJbnRvQmlnSW50TEUoYXNfc2lnbmVkLCB2YWx1ZSwgdThidWYpIHtcbiAgaWYgKCEgYXNfc2lnbmVkICYmIHZhbHVlIDwgMG4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBlbmNvZGUgYSBuZWdhdGl2ZSBCaWdJbnQgaW4gdW5zaWduZWQgZm9ybWF0JykgfVxuXG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBfdThidWZfZm9yX2JpZ2ludCh2YWx1ZSk7fVxuXG4gIGNvbnN0IG1heF9pID0gdThidWYubGVuZ3RoLTE7XG4gIGxldCBpPS0xLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaTxtYXhfaSAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlsrK2ldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaT4wKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGNvbnN0IHNwID0gYXNfc2lnbmVkICYmICgweDgwICYgdThidWZbaS0xXSk7XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgLT0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG4gIHJldHVybiB1OHJlc31cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuLCB1OGJ1Zikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdVaW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdVaW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUpXG4gICAgOiBlbmNvZGVJbnRvQmlnSW50QkUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSlcbiAgICA6IGVuY29kZUludG9CaWdVaW50QkUodmFsdWUpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRMRSh2YWx1ZSkge1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlKX1cblxuZnVuY3Rpb24gZW5jb2RlQmlnSW50QkUodmFsdWUpIHtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnRMRSh2YWx1ZSkge1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ1VpbnRMRSh2YWx1ZSl9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnRCRSh2YWx1ZSkge1xuICByZXR1cm4gZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSl9XG5cbmV4cG9ydCBkZWZhdWx0IGVuY29kZUJpZ0ludDtcbmV4cG9ydCB7IGVuY29kZUJpZ0ludCwgZW5jb2RlQmlnSW50QkUsIGVuY29kZUJpZ0ludExFLCBlbmNvZGVCaWdVaW50LCBlbmNvZGVCaWdVaW50QkUsIGVuY29kZUJpZ1VpbnRMRSwgZW5jb2RlSW50b0JpZ0ludCwgZW5jb2RlSW50b0JpZ0ludEJFLCBlbmNvZGVJbnRvQmlnSW50TEUsIGVuY29kZUludG9CaWdVaW50LCBlbmNvZGVJbnRvQmlnVWludEJFLCBlbmNvZGVJbnRvQmlnVWludExFIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfZW5jb2RlLm1qcy5tYXBcbiIsImltcG9ydCBAe30gZW5jb2RlSW50b0JpZ0ludCwgZW5jb2RlSW50b0JpZ1VpbnRcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2VuY29kZS5tanMnXG5cbmNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcblxuZGVzY3JpYmUgQCAnZW5jb2RlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZW5jb2RlSW50b0JpZ0ludCwgJ2Z1bmN0aW9uJ1xuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBpbnRvIEludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnLTEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xbiwgMHhmZlxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAxMjhuLCAweDAwLCAweDgwXG5cbiAgICBpdCBAICctMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnLTEyNycsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTEyN24sIDB4ODFcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweDAwLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgICBpdCBAICctMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTB4ZGVhZGJlZWZuLCAweGZmLCAweDIxLCAweDUyLCAweDQxLCAweDExXG5cblxuICBkZXNjcmliZSBAICdlbmNvZGUgaW50byBVaW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDEyOG4sIDB4ODBcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAweGRlYWRiZWVmbiwgMHhkZSwgMHhhZCwgMHhiZSwgMHhlZlxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBiaWcgbnVtYmVycyBmcm9tIGNyeXB0byBsYW5kJywgQD0+IDo6XG4gICAgaXQgQCAnUC0yNTYnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweGZmZmZmZmZmMDAwMDAwMDBmZmZmZmZmZmZmZmZmZmZmYmNlNmZhYWRhNzE3OWU4NGYzYjljYWMyZmM2MzI1NTFuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICBpdCBAICdQLTM4NCcsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYzc2MzRkODFmNDM3MmRkZjU4MWEwZGIyNDhiMGE3N2FlY2VjMTk2YWNjYzUyOTczblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICBpdCBAICdQLTUyMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgaXQgQCAnY3VydmUyNTUxOScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNGRlZjlkZWEyZjc5Y2Q2NTgxMjYzMWE1Y2Y1ZDNlZG5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgIGl0IEAgJ3NlY3AyNTZrMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50b0ludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50b1VpbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlSW50b0JpZ1VpbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuIiwiaW1wb3J0IEB7fSBlbmNvZGVCaWdJbnQsIGVuY29kZUJpZ1VpbnRcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2VuY29kZS5tanMnXG5cbmNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcblxuZGVzY3JpYmUgQCAnZW5jb2RlIHJvcGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVCaWdJbnQsICdmdW5jdGlvbidcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZW5jb2RlQmlnVWludCwgJ2Z1bmN0aW9uJ1xuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBJbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDBuLCAwXG5cbiAgICBpdCBAICcxJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICctMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMW4sIDB4ZmZcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAxMjhuLCAweDAwLCAweDgwXG5cbiAgICBpdCBAICctMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xMjhuLCAweDgwXG5cbiAgICBpdCBAICctMTI3JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xMjduLCAweDgxXG5cbiAgICBpdCBAICcweGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweDAwLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgICBpdCBAICctMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCAtMHhkZWFkYmVlZm4sIDB4ZmYsIDB4MjEsIDB4NTIsIDB4NDEsIDB4MTFcblxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBVaW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDEyOG4sIDB4ODBcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGJpZyBudW1iZXJzIGZyb20gY3J5cHRvIGxhbmQnLCBAPT4gOjpcbiAgICBpdCBAICdQLTI1NicsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICBpdCBAICdQLTM4NCcsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYzc2MzRkODFmNDM3MmRkZjU4MWEwZGIyNDhiMGE3N2FlY2VjMTk2YWNjYzUyOTczblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgaXQgQCAnUC01MjEnLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDAwMDAwMWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYTUxODY4NzgzYmYyZjk2NmI3ZmNjMDE0OGY3MDlhNWQwM2JiNWM5Yjg4OTljNDdhZWJiNmZiNzFlOTEzODY0MDluXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAgICAgICAgICAgICAweDAxLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmEsIDB4NTEsIDB4ODYsIDB4ODcsIDB4ODNcbiAgICAgICAgMHhiZiwgMHgyZiwgMHg5NiwgMHg2YiwgMHg3ZiwgMHhjYywgMHgwMSwgMHg0OFxuICAgICAgICAweGY3LCAweDA5LCAweGE1LCAweGQwLCAweDNiLCAweGI1LCAweGM5LCAweGI4XG4gICAgICAgIDB4ODksIDB4OWMsIDB4NDcsIDB4YWUsIDB4YmIsIDB4NmYsIDB4YjcsIDB4MWVcbiAgICAgICAgMHg5MSwgMHgzOCwgMHg2NCwgMHgwOVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICBpdCBAICdjdXJ2ZTI1NTE5JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0ZGVmOWRlYTJmNzljZDY1ODEyNjMxYTVjZjVkM2VkblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgIGl0IEAgJ3NlY3AyNTZrMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuICAgICAgX3Rlc3RJbnRfQkVfTEUgQCBuLCAweDAwLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmVcbiAgICAgICAgMHhiYSwgMHhhZSwgMHhkYywgMHhlNiwgMHhhZiwgMHg0OCwgMHhhMCwgMHgzYlxuICAgICAgICAweGJmLCAweGQyLCAweDVlLCAweDhjLCAweGQwLCAweDM2LCAweDQxLCAweDQxXG5cblxuXG5mdW5jdGlvbiBfdGVzdEludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVCaWdJbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVCaWdJbnQodmFsdWUsIGZhbHNlKVxuICBjb25zdCB2X2xlID0gZW5jb2RlQmlnSW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG5mdW5jdGlvbiBfdGVzdFVpbnRfQkVfTEUodmFsdWUsIC4uLmFuc3dlcl9iZSkgOjpcbiAgYW5zd2VyX2JlID0gVWludDhBcnJheS5mcm9tIEAgYW5zd2VyX2JlXG4gIGNvbnN0IGFuc3dlcl9sZSA9IGFuc3dlcl9iZS5zbGljZSgpLnJldmVyc2UoKVxuXG4gIGNvbnN0IHZfYmVfaW1wID0gZW5jb2RlQmlnVWludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ1VpbnQodmFsdWUsIGZhbHNlKVxuICBjb25zdCB2X2xlID0gZW5jb2RlQmlnVWludCh2YWx1ZSwgdHJ1ZSlcblxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgdl9iZV9pbXAsIFwiQmlnIGVuZGlhbiBtaXNtYXRjaCBleHBsaWNpdCB0byBpbXBsaWNpdFwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCBhbnN3ZXJfYmUsIFwiQmlnLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9sZSwgYW5zd2VyX2xlLCBcIkxpdHRsZS1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcblxuIiwiZnVuY3Rpb24gX2FzX3U4X2RhdGEodThidWYpIHtcbiAgcmV0dXJuIHU4YnVmIGluc3RhbmNlb2YgVWludDhBcnJheSA/IHU4YnVmXG4gICAgOiBuZXcgVWludDhBcnJheShuZXcgQXJyYXlCdWZmZXIodThidWYpKSB9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludCh1OGJ1ZiwgbGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGRlY29kZUJpZ0ludExFKHU4YnVmKVxuICAgIDogZGVjb2RlQmlnSW50QkUodThidWYpfVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdVaW50KHU4YnVmLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnVWludExFKHU4YnVmKVxuICAgIDogZGVjb2RlQmlnVWludEJFKHU4YnVmKX1cblxuY29uc3QgZGVjb2RlQmlnSW50TEUgPSBfZGVjb2RlQmlnSW50TEUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGRlY29kZUJpZ0ludEJFID0gX2RlY29kZUJpZ0ludEJFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBkZWNvZGVCaWdVaW50TEUgPSBfZGVjb2RlQmlnSW50TEUuYmluZChudWxsLCBmYWxzZSk7XG5jb25zdCBkZWNvZGVCaWdVaW50QkUgPSBfZGVjb2RlQmlnSW50QkUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9kZWNvZGVCaWdJbnRMRShhc19zaWduZWQsIHU4YnVmKSB7XG4gIGNvbnN0IHU4ID0gX2FzX3U4X2RhdGEodThidWYpLCBsZW49dTgubGVuZ3RoO1xuICBsZXQgdiA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4W2xlbiAtIDFdKSA/IC0xbiA6IDBuO1xuICBmb3IgKGxldCBpPWxlbi0xOyBpPj0wOyBpLS0pIHtcbiAgICB2ID0gKHYgPDwgOG4pIHwgQmlnSW50KHU4W2ldKTt9XG4gIHJldHVybiB2fVxuXG5mdW5jdGlvbiBfZGVjb2RlQmlnSW50QkUoYXNfc2lnbmVkLCB1OGJ1Zikge1xuICBjb25zdCB1OCA9IF9hc191OF9kYXRhKHU4YnVmKSwgbGVuPXU4Lmxlbmd0aDtcbiAgbGV0IHYgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OFswXSkgPyAtMW4gOiAwbjtcbiAgZm9yIChsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG4gICAgdiA9ICh2IDw8IDhuKSB8IEJpZ0ludCh1OFtpXSk7fVxuICByZXR1cm4gdn1cblxuZXhwb3J0IGRlZmF1bHQgZGVjb2RlQmlnSW50O1xuZXhwb3J0IHsgZGVjb2RlQmlnSW50LCBkZWNvZGVCaWdJbnRCRSwgZGVjb2RlQmlnSW50TEUsIGRlY29kZUJpZ1VpbnQsIGRlY29kZUJpZ1VpbnRCRSwgZGVjb2RlQmlnVWludExFIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfZGVjb2RlLm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcblxuaW1wb3J0IEB7fVxuICBlbmNvZGVCaWdJbnRMRSwgZW5jb2RlQmlnSW50QkVcbiAgZW5jb2RlQmlnVWludExFLCBlbmNvZGVCaWdVaW50QkVcbmZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2VuY29kZS5tanMnXG5cbmltcG9ydCBAe31cbiAgZGVjb2RlQmlnSW50TEUsIGRlY29kZUJpZ0ludEJFXG4gIGRlY29kZUJpZ1VpbnRMRSwgZGVjb2RlQmlnVWludEJFXG5mcm9tICdiaWdpbnQtY29kZWMvZXNtL2JpZ2ludF9kZWNvZGUubWpzJ1xuXG5cblxuZGVzY3JpYmUgQCAnZGVjb2RlJywgQD0+IDo6XG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZGVjb2RlQmlnSW50TEUsICdmdW5jdGlvbidcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZGVjb2RlQmlnSW50QkUsICdmdW5jdGlvbidcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgZGVjb2RlQmlnVWludExFLCAnZnVuY3Rpb24nXG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGRlY29kZUJpZ1VpbnRCRSwgJ2Z1bmN0aW9uJ1xuXG4gIGRlc2NyaWJlIEAgJ2RlY29kZSBJbnQnLCBAPT4gOjpcbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnMG4nLCAwblxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICcxbicsIDFuXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJy0xbicsIDFuXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJzEyN24nLCAxMjduXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJy0xMjduJywgLTEyN25cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnMTI4bicsIDEyOG5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnLTEyOG4nLCAtMTI4blxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICcweGRlYWRiZWVmJywgMHhkZWFkYmVlZm5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnLTB4ZGVhZGJlZWYnLCAtMHhkZWFkYmVlZm5cblxuICBkZXNjcmliZSBAICdkZWNvZGUgYmlnIG51bWJlcnMgZnJvbSBjcnlwdG8gbGFuZCcsIEA9PiA6OlxuICAgIF9yb3VuZFRyaXBTdWl0ZSBAICdQLTI1NicsIDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnUC0zODQnLCAweGZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmM3NjM0ZDgxZjQzNzJkZGY1ODFhMGRiMjQ4YjBhNzdhZWNlYzE5NmFjY2M1Mjk3M25cbiAgICBfcm91bmRUcmlwU3VpdGUgQCAnUC01MjEnLCAweDAwMDAwMWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmYTUxODY4NzgzYmYyZjk2NmI3ZmNjMDE0OGY3MDlhNWQwM2JiNWM5Yjg4OTljNDdhZWJiNmZiNzFlOTEzODY0MDluXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJ2N1cnZlMjU1MTknLCAweDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTRkZWY5ZGVhMmY3OWNkNjU4MTI2MzFhNWNmNWQzZWRuXG4gICAgX3JvdW5kVHJpcFN1aXRlIEAgJ3NlY3AyNTZrMScsIDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmViYWFlZGNlNmFmNDhhMDNiYmZkMjVlOGNkMDM2NDE0MW5cblxuZnVuY3Rpb24gX3JvdW5kVHJpcFN1aXRlKHRpdGxlLCBuMCkgOjpcbiAgcmV0dXJuIGRlc2NyaWJlIEAgdGl0bGUsIEA9PiA6OlxuXG4gICAgaWYgbjAgPj0gMG4gOjpcbiAgICAgIGl0IEAgYERlY29kZSBVaW50IExFYCwgQD0+IDo6XG4gICAgICAgIGNvbnN0IHJlcyA9IGVuY29kZUJpZ1VpbnRMRShuMClcbiAgICAgICAgY29uc3QgbjEgPSBkZWNvZGVCaWdVaW50TEUocmVzKVxuICAgICAgICBhc3NlcnQuZXF1YWwgQCBuMSwgbjBcblxuICAgICAgaXQgQCBgRGVjb2RlIFVpbnQgQkVgLCBAPT4gOjpcbiAgICAgICAgY29uc3QgcmVzID0gZW5jb2RlQmlnVWludEJFKG4wKVxuICAgICAgICBjb25zdCBuMSA9IGRlY29kZUJpZ1VpbnRCRShyZXMpXG4gICAgICAgIGFzc2VydC5lcXVhbCBAIG4xLCBuMFxuXG5cbiAgICBpdCBAIGBEZWNvZGUgSW50IExFYCwgQD0+IDo6XG4gICAgICBjb25zdCByZXMgPSBlbmNvZGVCaWdJbnRMRShuMClcbiAgICAgIGNvbnN0IG4xID0gZGVjb2RlQmlnSW50TEUocmVzKVxuICAgICAgYXNzZXJ0LmVxdWFsIEAgbjEsIG4wXG5cbiAgICBpdCBAIGBEZWNvZGUgSW50IEJFYCwgQD0+IDo6XG4gICAgICBjb25zdCByZXMgPSBlbmNvZGVCaWdJbnRCRShuMClcbiAgICAgIGNvbnN0IG4xID0gZGVjb2RlQmlnSW50QkUocmVzKVxuICAgICAgYXNzZXJ0LmVxdWFsIEAgbjEsIG4wXG5cbiJdLCJuYW1lcyI6WyJhc3NlcnQiXSwibWFwcGluZ3MiOiI7OztFQUFBO0lBQ0U7OztFQUdGO0lBQ0U7TUFDRTs7O0lBR0Y7SUFDQTtJQUNBO01BQ0U7TUFDQTs7SUFFRjs7RUFFRjtFQUNBOztFQUVBO0lBQ0U7TUFDRSxnQkFBZ0IsdURBQXVEOztJQUV6RTtNQUNFOztJQUVGO0lBQ0E7SUFDQTtNQUNFO01BQ0E7TUFDQTs7SUFFRjtNQUNFLGdCQUFnQiwwREFBMEQ7O0lBRTVFO01BQ0U7TUFDQTtNQUNBOzs7SUFHRjtJQUNBOztFQUVGO0VBQ0E7O0VBRUE7SUFDRTtNQUNFLGdCQUFnQix1REFBdUQ7O0lBRXpFO01BQ0U7O0lBRUY7SUFDQTtJQUNBO01BQ0U7TUFDQTtNQUNBOztJQUVGO01BQ0UsZ0JBQWdCLDBEQUEwRDs7SUFFNUU7TUFDRTtNQUNBO01BQ0E7OztJQUdGO0lBQ0E7O0VBWUY7SUFDRTs7OztFQXFCRjtJQUNFOzs7O0VBU0Y7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7SUFDRTtJQUNBO0lBQ0E7TUFDRTtJQUNGOztFQUVGO0lBQ0U7SUFDQTtJQUNBO01BQ0U7SUFDRjs7RUFFRjtJQUNFO0VBQ0Y7O0VDMUlBLDJCQUEyQixNQUFNO0FBQ2pDO0VBRUEsU0FBVSxPQUFRO0lBQ2hCLEdBQUksUUFBUztNQUNYLE9BQVE7O0lB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
