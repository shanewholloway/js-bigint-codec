(function () {
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

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX191bml0dGVzdC5paWZlLmpzIiwic291cmNlcyI6WyIuLi9lc20vYmlnaW50X2NvZGVjLm1qcyIsInVuaXQvc21va2UuanN5IiwiLi4vZXNtL2JpZ2ludF9lbmNvZGUubWpzIiwidW5pdC9lbmNvZGVfaW50by5qc3kiLCJ1bml0L2VuY29kZV9hbGxvYy5qc3kiLCIuLi9lc20vYmlnaW50X2RlY29kZS5tanMiLCJ1bml0L2RlY29kZS5qc3kiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZW5jb2RlSW50b0JpZ0ludEJFID0gX2VuY29kZUludG9CaWdJbnRCRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZW5jb2RlSW50b0JpZ1VpbnRCRSA9IF9lbmNvZGVJbnRvQmlnSW50QkUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9lbmNvZGVJbnRvQmlnSW50QkUoYXNfc2lnbmVkLCB2YWx1ZSwgdThidWYpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEyOCk7fVxuXG4gIGNvbnN0IGxlbiA9IHU4YnVmLmxlbmd0aDtcbiAgbGV0IGk9bGVuLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaT4wICYmIHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdl90aXAgPSB2X25leHQ7XG4gICAgdl9uZXh0ID0gdl9uZXh0ID4+IDhuO1xuICAgIHU4YnVmWy0taV0gPSBOdW1iZXIodl90aXAgJiAweGZmbik7IH1cblxuICBpZiAodl9uZXh0IT09dl90aXApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0luc3VmZmVjaWVudCBidWZmZXIgc2l6ZSB0byBlbmNvZGUgdW5zaWduZWQgQmlnSW50IHZhbHVlJykgfVxuXG4gIGlmIChpPGxlbi0xKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGNvbnN0IHNwID0gYXNfc2lnbmVkICYmICgweDgwICYgdThidWZbaSsxXSk7XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgKz0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgKz0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKGkpO1xuICByZXR1cm4gdThyZXN9XG5cbmNvbnN0IGVuY29kZUludG9CaWdJbnRMRSA9IF9lbmNvZGVJbnRvQmlnSW50TEUuYmluZChudWxsLCB0cnVlKTtcbmNvbnN0IGVuY29kZUludG9CaWdVaW50TEUgPSBfZW5jb2RlSW50b0JpZ0ludExFLmJpbmQobnVsbCwgZmFsc2UpO1xuXG5mdW5jdGlvbiBfZW5jb2RlSW50b0JpZ0ludExFKGFzX3NpZ25lZCwgdmFsdWUsIHU4YnVmKSB7XG4gIGlmICh1bmRlZmluZWQgPT09IHU4YnVmKSB7XG4gICAgdThidWYgPSBuZXcgVWludDhBcnJheSgxMjgpO31cblxuICBjb25zdCBtYXhfaSA9IHU4YnVmLmxlbmd0aC0xO1xuICBsZXQgaT0tMSwgdl9uZXh0PXZhbHVlLCB2X3RpcDtcbiAgd2hpbGUgKGk8bWF4X2kgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbKytpXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmICh2X25leHQhPT12X3RpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSB1bnNpZ25lZCBCaWdJbnQgdmFsdWUnKSB9XG5cbiAgaWYgKGk+MCkge1xuICAgIGNvbnN0IHYgPSB1OGJ1ZltpXTtcbiAgICBjb25zdCBzcCA9IGFzX3NpZ25lZCAmJiAoMHg4MCAmIHU4YnVmW2ktMV0pO1xuICAgIGlmICgweDAwID09PSB2ICYmICEgc3ApIHtpIC09IDE7fVxuICAgIGVsc2UgaWYgKDB4ZmYgPT09IHYgJiYgc3ApIHtpIC09IDE7fSB9XG5cbiAgY29uc3QgdThyZXMgPSB1OGJ1Zi5zbGljZSgwLCBpKzEpO1xuICByZXR1cm4gdThyZXN9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuKSB7XG4gIGNvbnN0IHU4YnVmID0gX3U4YnVmX2Zvcl9iaWdpbnQodmFsdWUpO1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1Zil9XG5cblxuZnVuY3Rpb24gX3U4YnVmX2Zvcl9iaWdpbnQodikge1xuICBpZiAoMG4gPiB2KSB7XG4gICAgdiA9IC12O31cblxuICAvLyByb3VnaCBzaXplIGVzdGltYXRlXG4gIGxldCBzaXplID0gMzI7XG4gIGxldCBhbGxvYyA9IDJuICoqIEJpZ0ludChzaXplKTtcbiAgd2hpbGUgKGFsbG9jIDw9IHYpIHtcbiAgICBhbGxvYyA8PD0gMjU2bjtcbiAgICBzaXplICs9IDMyO31cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoc2l6ZSl9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludChidWZmZXIsIGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBkZWNvZGVCaWdJbnRMRSgpXG4gICAgOiBkZWNvZGVCaWdJbnRCRSgpfVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnRMRShidWZmZXIpIHt9XG5cbmZ1bmN0aW9uIGRlY29kZUJpZ0ludEJFKGJ1ZmZlcikge31cblxuY29uc3QgYmlnaW50X2NvZGVjID17XG4gIGVuY29kZTogZW5jb2RlQmlnSW50XG4sIGRlY29kZTogZGVjb2RlQmlnSW50fTtcblxuZXhwb3J0IGRlZmF1bHQgYmlnaW50X2NvZGVjO1xuZXhwb3J0IHsgYmlnaW50X2NvZGVjLCBkZWNvZGVCaWdJbnQgYXMgZGVjb2RlX2JpZ2ludCwgZW5jb2RlQmlnSW50IGFzIGVuY29kZV9iaWdpbnQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpZ2ludF9jb2RlYy5tanMubWFwXG4iLCJjb25zdCB7IGFzc2VydCB9ID0gcmVxdWlyZSgnY2hhaScpXG5pbXBvcnQgYmlnaW50X2NvZGVjIGZyb20gJ2JpZ2ludC1jb2RlYydcblxuZGVzY3JpYmUgQCAnc21va2UnLCBAPT4gOjpcbiAgaXQgQCAnYmFzaWNzJywgQD0+IDo6XG4gICAgYXNzZXJ0IEAgJ3dvcmtzJ1xuXG4gIGl0IEAgJ2ltcG9ydGFibGUnLCBAPT4gOjpcbiAgICBhc3NlcnQuZXF1YWwgQCB0eXBlb2YgYmlnaW50X2NvZGVjLCAnb2JqZWN0J1xuXG4iLCJjb25zdCBlbmNvZGVJbnRvQmlnSW50QkUgPSBfZW5jb2RlSW50b0JpZ0ludEJFLmJpbmQobnVsbCwgdHJ1ZSk7XG5jb25zdCBlbmNvZGVJbnRvQmlnVWludEJFID0gX2VuY29kZUludG9CaWdJbnRCRS5iaW5kKG51bGwsIGZhbHNlKTtcblxuZnVuY3Rpb24gX2VuY29kZUludG9CaWdJbnRCRShhc19zaWduZWQsIHZhbHVlLCB1OGJ1Zikge1xuICBpZiAodW5kZWZpbmVkID09PSB1OGJ1Zikge1xuICAgIHU4YnVmID0gbmV3IFVpbnQ4QXJyYXkoMTI4KTt9XG5cbiAgY29uc3QgbGVuID0gdThidWYubGVuZ3RoO1xuICBsZXQgaT1sZW4sIHZfbmV4dD12YWx1ZSwgdl90aXA7XG4gIHdoaWxlIChpPjAgJiYgdl9uZXh0IT09dl90aXApIHtcbiAgICB2X3RpcCA9IHZfbmV4dDtcbiAgICB2X25leHQgPSB2X25leHQgPj4gOG47XG4gICAgdThidWZbLS1pXSA9IE51bWJlcih2X3RpcCAmIDB4ZmZuKTsgfVxuXG4gIGlmICh2X25leHQhPT12X3RpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdWZmZWNpZW50IGJ1ZmZlciBzaXplIHRvIGVuY29kZSB1bnNpZ25lZCBCaWdJbnQgdmFsdWUnKSB9XG5cbiAgaWYgKGk8bGVuLTEpIHtcbiAgICBjb25zdCB2ID0gdThidWZbaV07XG4gICAgY29uc3Qgc3AgPSBhc19zaWduZWQgJiYgKDB4ODAgJiB1OGJ1ZltpKzFdKTtcbiAgICBpZiAoMHgwMCA9PT0gdiAmJiAhIHNwKSB7aSArPSAxO31cbiAgICBlbHNlIGlmICgweGZmID09PSB2ICYmIHNwKSB7aSArPSAxO30gfVxuXG4gIGNvbnN0IHU4cmVzID0gdThidWYuc2xpY2UoaSk7XG4gIHJldHVybiB1OHJlc31cblxuY29uc3QgZW5jb2RlSW50b0JpZ0ludExFID0gX2VuY29kZUludG9CaWdJbnRMRS5iaW5kKG51bGwsIHRydWUpO1xuY29uc3QgZW5jb2RlSW50b0JpZ1VpbnRMRSA9IF9lbmNvZGVJbnRvQmlnSW50TEUuYmluZChudWxsLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIF9lbmNvZGVJbnRvQmlnSW50TEUoYXNfc2lnbmVkLCB2YWx1ZSwgdThidWYpIHtcbiAgaWYgKHVuZGVmaW5lZCA9PT0gdThidWYpIHtcbiAgICB1OGJ1ZiA9IG5ldyBVaW50OEFycmF5KDEyOCk7fVxuXG4gIGNvbnN0IG1heF9pID0gdThidWYubGVuZ3RoLTE7XG4gIGxldCBpPS0xLCB2X25leHQ9dmFsdWUsIHZfdGlwO1xuICB3aGlsZSAoaTxtYXhfaSAmJiB2X25leHQhPT12X3RpcCkge1xuICAgIHZfdGlwID0gdl9uZXh0O1xuICAgIHZfbmV4dCA9IHZfbmV4dCA+PiA4bjtcbiAgICB1OGJ1ZlsrK2ldID0gTnVtYmVyKHZfdGlwICYgMHhmZm4pOyB9XG5cbiAgaWYgKHZfbmV4dCE9PXZfdGlwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnN1ZmZlY2llbnQgYnVmZmVyIHNpemUgdG8gZW5jb2RlIHVuc2lnbmVkIEJpZ0ludCB2YWx1ZScpIH1cblxuICBpZiAoaT4wKSB7XG4gICAgY29uc3QgdiA9IHU4YnVmW2ldO1xuICAgIGNvbnN0IHNwID0gYXNfc2lnbmVkICYmICgweDgwICYgdThidWZbaS0xXSk7XG4gICAgaWYgKDB4MDAgPT09IHYgJiYgISBzcCkge2kgLT0gMTt9XG4gICAgZWxzZSBpZiAoMHhmZiA9PT0gdiAmJiBzcCkge2kgLT0gMTt9IH1cblxuICBjb25zdCB1OHJlcyA9IHU4YnVmLnNsaWNlKDAsIGkrMSk7XG4gIHJldHVybiB1OHJlc31cblxuZnVuY3Rpb24gZW5jb2RlSW50b0JpZ0ludCh2YWx1ZSwgbGl0dGxlRW5kaWFuLCB1OGJ1Zikge1xuICByZXR1cm4gbGl0dGxlRW5kaWFuXG4gICAgPyBlbmNvZGVJbnRvQmlnSW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ0ludEJFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUludG9CaWdVaW50KHZhbHVlLCBsaXR0bGVFbmRpYW4sIHU4YnVmKSB7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdVaW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnQodmFsdWUsIGxpdHRsZUVuZGlhbikge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZW5jb2RlSW50b0JpZ0ludExFKHZhbHVlLCB1OGJ1ZilcbiAgICA6IGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50KHZhbHVlLCBsaXR0bGVFbmRpYW4pIHtcbiAgY29uc3QgdThidWYgPSBfdThidWZfZm9yX2JpZ2ludCh2YWx1ZSk7XG4gIHJldHVybiBsaXR0bGVFbmRpYW5cbiAgICA/IGVuY29kZUludG9CaWdVaW50TEUodmFsdWUsIHU4YnVmKVxuICAgIDogZW5jb2RlSW50b0JpZ1VpbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRMRSh2YWx1ZSkge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdJbnRMRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdJbnRCRSh2YWx1ZSkge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdJbnRCRSh2YWx1ZSwgdThidWYpfVxuXG5mdW5jdGlvbiBlbmNvZGVCaWdVaW50TEUodmFsdWUpIHtcbiAgY29uc3QgdThidWYgPSBfdThidWZfZm9yX2JpZ2ludCh2YWx1ZSk7XG4gIHJldHVybiBlbmNvZGVJbnRvQmlnVWludExFKHZhbHVlLCB1OGJ1Zil9XG5cbmZ1bmN0aW9uIGVuY29kZUJpZ1VpbnRCRSh2YWx1ZSkge1xuICBjb25zdCB1OGJ1ZiA9IF91OGJ1Zl9mb3JfYmlnaW50KHZhbHVlKTtcbiAgcmV0dXJuIGVuY29kZUludG9CaWdVaW50QkUodmFsdWUsIHU4YnVmKX1cblxuXG5mdW5jdGlvbiBfdThidWZfZm9yX2JpZ2ludCh2KSB7XG4gIGlmICgwbiA+IHYpIHtcbiAgICB2ID0gLXY7fVxuXG4gIC8vIHJvdWdoIHNpemUgZXN0aW1hdGVcbiAgbGV0IHNpemUgPSAzMjtcbiAgbGV0IGFsbG9jID0gMm4gKiogQmlnSW50KHNpemUpO1xuICB3aGlsZSAoYWxsb2MgPD0gdikge1xuICAgIGFsbG9jIDw8PSAyNTZuO1xuICAgIHNpemUgKz0gMzI7fVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheShzaXplKX1cblxuZXhwb3J0IGRlZmF1bHQgZW5jb2RlQmlnSW50O1xuZXhwb3J0IHsgZW5jb2RlQmlnSW50LCBlbmNvZGVCaWdJbnRCRSwgZW5jb2RlQmlnSW50TEUsIGVuY29kZUJpZ1VpbnQsIGVuY29kZUJpZ1VpbnRCRSwgZW5jb2RlQmlnVWludExFLCBlbmNvZGVJbnRvQmlnSW50LCBlbmNvZGVJbnRvQmlnSW50QkUsIGVuY29kZUludG9CaWdJbnRMRSwgZW5jb2RlSW50b0JpZ1VpbnQsIGVuY29kZUludG9CaWdVaW50QkUsIGVuY29kZUludG9CaWdVaW50TEUgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJpZ2ludF9lbmNvZGUubWpzLm1hcFxuIiwiaW1wb3J0IEB7fSBlbmNvZGVJbnRvQmlnSW50LCBlbmNvZGVJbnRvQmlnVWludFxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUnLCBAPT4gOjpcbiAgaXQgQCAnaW1wb3J0YWJsZScsIEA9PiA6OlxuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVJbnRvQmlnSW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGludG8gSW50JywgQD0+IDo6XG4gICAgaXQgQCAnMCcsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDFuLCAxXG5cbiAgICBpdCBAICctMScsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgLTFuLCAweGZmXG5cbiAgICBpdCBAICcxMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIC0xMjhuLCAweDgwXG5cbiAgICBpdCBAICctMTI3JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMTI3biwgMHg4MVxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9JbnRfQkVfTEUgQCAtMHhkZWFkYmVlZm4sIDB4ZmYsIDB4MjEsIDB4NTIsIDB4NDEsIDB4MTFcblxuXG4gIGRlc2NyaWJlIEAgJ2VuY29kZSBpbnRvIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCAxbiwgMVxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIDB4ZGVhZGJlZWZuLCAweGRlLCAweGFkLCAweGJlLCAweGVmXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIGJpZyBudW1iZXJzIGZyb20gY3J5cHRvIGxhbmQnLCBAPT4gOjpcbiAgICBpdCBAICdQLTI1NicsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4ZmZmZmZmZmYwMDAwMDAwMGZmZmZmZmZmZmZmZmZmZmZiY2U2ZmFhZGE3MTc5ZTg0ZjNiOWNhYzJmYzYzMjU1MW5cbiAgICAgIF90ZXN0SW50b1VpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhiYywgMHhlNiwgMHhmYSwgMHhhZCwgMHhhNywgMHgxNywgMHg5ZSwgMHg4NFxuICAgICAgICAweGYzLCAweGI5LCAweGNhLCAweGMyLCAweGZjLCAweDYzLCAweDI1LCAweDUxXG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdEludG9VaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhjNywgMHg2MywgMHg0ZCwgMHg4MSwgMHhmNCwgMHgzNywgMHgyZCwgMHhkZlxuICAgICAgICAweDU4LCAweDFhLCAweDBkLCAweGIyLCAweDQ4LCAweGIwLCAweGE3LCAweDdhXG4gICAgICAgIDB4ZWMsIDB4ZWMsIDB4MTksIDB4NmEsIDB4Y2MsIDB4YzUsIDB4MjksIDB4NzNcblxuICAgIGl0IEAgJ1AtNTIxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgwMDAwMDFmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmE1MTg2ODc4M2JmMmY5NjZiN2ZjYzAxNDhmNzA5YTVkMDNiYjVjOWI4ODk5YzQ3YWViYjZmYjcxZTkxMzg2NDA5blxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50b0ludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICBpdCBAICdjdXJ2ZTI1NTE5JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHgxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0ZGVmOWRlYTJmNzljZDY1ODEyNjMxYTVjZjVkM2VkblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4MTAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDE0LCAweGRlLCAweGY5LCAweGRlLCAweGEyLCAweGY3LCAweDljLCAweGQ2XG4gICAgICAgIDB4NTgsIDB4MTIsIDB4NjMsIDB4MWEsIDB4NWMsIDB4ZjUsIDB4ZDMsIDB4ZWRcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RJbnRvVWludF9CRV9MRSBAIG4sXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuICAgICAgX3Rlc3RJbnRvSW50X0JFX0xFIEAgbiwgMHgwMCxcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvSW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUludG9CaWdJbnQodmFsdWUpXG4gIGNvbnN0IHZfYmUgPSBlbmNvZGVJbnRvQmlnSW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cblxuZnVuY3Rpb24gX3Rlc3RJbnRvVWludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVJbnRvQmlnVWludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCBmYWxzZSlcbiAgY29uc3Qgdl9sZSA9IGVuY29kZUludG9CaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJpbXBvcnQgQHt9IGVuY29kZUJpZ0ludCwgZW5jb2RlQmlnVWludFxuZnJvbSAnYmlnaW50LWNvZGVjL2VzbS9iaWdpbnRfZW5jb2RlLm1qcydcblxuY29uc3QgeyBhc3NlcnQgfSA9IHJlcXVpcmUoJ2NoYWknKVxuXG5kZXNjcmliZSBAICdlbmNvZGUgcm9wZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGVuY29kZUJpZ0ludCwgJ2Z1bmN0aW9uJ1xuICAgIGFzc2VydC5lcXVhbCBAIHR5cGVvZiBlbmNvZGVCaWdVaW50LCAnZnVuY3Rpb24nXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIEludCcsIEA9PiA6OlxuICAgIGl0IEAgJzAnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMG4sIDBcblxuICAgIGl0IEAgJzEnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJy0xJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0xbiwgMHhmZlxuXG4gICAgaXQgQCAnMTI4JywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIDEyOG4sIDB4MDAsIDB4ODBcblxuICAgIGl0IEAgJy0xMjgnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyOG4sIDB4ODBcblxuICAgIGl0IEAgJy0xMjcnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgLTEyN24sIDB4ODFcblxuICAgIGl0IEAgJzB4ZGVhZGJlZWYnLCBAPT4gOjpcbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4MDAsIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICAgIGl0IEAgJy0weGRlYWRiZWVmJywgQD0+IDo6XG4gICAgICBfdGVzdEludF9CRV9MRSBAIC0weGRlYWRiZWVmbiwgMHhmZiwgMHgyMSwgMHg1MiwgMHg0MSwgMHgxMVxuXG5cbiAgZGVzY3JpYmUgQCAnZW5jb2RlIFVpbnQnLCBAPT4gOjpcbiAgICBpdCBAICcwJywgQD0+IDo6XG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCAwbiwgMFxuXG4gICAgaXQgQCAnMScsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMW4sIDFcblxuICAgIGl0IEAgJzEyOCcsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMTI4biwgMHg4MFxuXG4gICAgaXQgQCAnMHhkZWFkYmVlZicsIEA9PiA6OlxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgMHhkZWFkYmVlZm4sIDB4ZGUsIDB4YWQsIDB4YmUsIDB4ZWZcblxuICBkZXNjcmliZSBAICdlbmNvZGUgYmlnIG51bWJlcnMgZnJvbSBjcnlwdG8gbGFuZCcsIEA9PiA6OlxuICAgIGl0IEAgJ1AtMjU2JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZjAwMDAwMDAwZmZmZmZmZmZmZmZmZmZmZmJjZTZmYWFkYTcxNzllODRmM2I5Y2FjMmZjNjMyNTUxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YmMsIDB4ZTYsIDB4ZmEsIDB4YWQsIDB4YTcsIDB4MTcsIDB4OWUsIDB4ODRcbiAgICAgICAgMHhmMywgMHhiOSwgMHhjYSwgMHhjMiwgMHhmYywgMHg2MywgMHgyNSwgMHg1MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGJjLCAweGU2LCAweGZhLCAweGFkLCAweGE3LCAweDE3LCAweDllLCAweDg0XG4gICAgICAgIDB4ZjMsIDB4YjksIDB4Y2EsIDB4YzIsIDB4ZmMsIDB4NjMsIDB4MjUsIDB4NTFcblxuICAgIGl0IEAgJ1AtMzg0JywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZjNzYzNGQ4MWY0MzcyZGRmNTgxYTBkYjI0OGIwYTc3YWVjZWMxOTZhY2NjNTI5NzNuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGM3LCAweDYzLCAweDRkLCAweDgxLCAweGY0LCAweDM3LCAweDJkLCAweGRmXG4gICAgICAgIDB4NTgsIDB4MWEsIDB4MGQsIDB4YjIsIDB4NDgsIDB4YjAsIDB4YTcsIDB4N2FcbiAgICAgICAgMHhlYywgMHhlYywgMHgxOSwgMHg2YSwgMHhjYywgMHhjNSwgMHgyOSwgMHg3M1xuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4YzcsIDB4NjMsIDB4NGQsIDB4ODEsIDB4ZjQsIDB4MzcsIDB4MmQsIDB4ZGZcbiAgICAgICAgMHg1OCwgMHgxYSwgMHgwZCwgMHhiMiwgMHg0OCwgMHhiMCwgMHhhNywgMHg3YVxuICAgICAgICAweGVjLCAweGVjLCAweDE5LCAweDZhLCAweGNjLCAweGM1LCAweDI5LCAweDczXG5cbiAgICBpdCBAICdQLTUyMScsIEA9PiA6OlxuICAgICAgY29uc3QgbiA9IDB4MDAwMDAxZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZhNTE4Njg3ODNiZjJmOTY2YjdmY2MwMTQ4ZjcwOWE1ZDAzYmI1YzliODg5OWM0N2FlYmI2ZmI3MWU5MTM4NjQwOW5cbiAgICAgIF90ZXN0VWludF9CRV9MRSBAIG4sXG4gICAgICAgICAgICAgICAgICAgIDB4MDEsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmYSwgMHg1MSwgMHg4NiwgMHg4NywgMHg4M1xuICAgICAgICAweGJmLCAweDJmLCAweDk2LCAweDZiLCAweDdmLCAweGNjLCAweDAxLCAweDQ4XG4gICAgICAgIDB4ZjcsIDB4MDksIDB4YTUsIDB4ZDAsIDB4M2IsIDB4YjUsIDB4YzksIDB4YjhcbiAgICAgICAgMHg4OSwgMHg5YywgMHg0NywgMHhhZSwgMHhiYiwgMHg2ZiwgMHhiNywgMHgxZVxuICAgICAgICAweDkxLCAweDM4LCAweDY0LCAweDA5XG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgICAgICAgICAgICAgMHgwMSwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZhLCAweDUxLCAweDg2LCAweDg3LCAweDgzXG4gICAgICAgIDB4YmYsIDB4MmYsIDB4OTYsIDB4NmIsIDB4N2YsIDB4Y2MsIDB4MDEsIDB4NDhcbiAgICAgICAgMHhmNywgMHgwOSwgMHhhNSwgMHhkMCwgMHgzYiwgMHhiNSwgMHhjOSwgMHhiOFxuICAgICAgICAweDg5LCAweDljLCAweDQ3LCAweGFlLCAweGJiLCAweDZmLCAweGI3LCAweDFlXG4gICAgICAgIDB4OTEsIDB4MzgsIDB4NjQsIDB4MDlcblxuICAgIGl0IEAgJ2N1cnZlMjU1MTknLCBAPT4gOjpcbiAgICAgIGNvbnN0IG4gPSAweDEwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMTRkZWY5ZGVhMmY3OWNkNjU4MTI2MzFhNWNmNWQzZWRuXG4gICAgICBfdGVzdFVpbnRfQkVfTEUgQCBuLFxuICAgICAgICAweDEwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDBcbiAgICAgICAgMHgxNCwgMHhkZSwgMHhmOSwgMHhkZSwgMHhhMiwgMHhmNywgMHg5YywgMHhkNlxuICAgICAgICAweDU4LCAweDEyLCAweDYzLCAweDFhLCAweDVjLCAweGY1LCAweGQzLCAweGVkXG5cbiAgICAgIF90ZXN0SW50X0JFX0xFIEAgbixcbiAgICAgICAgMHgxMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwLCAweDAwXG4gICAgICAgIDB4MTQsIDB4ZGUsIDB4ZjksIDB4ZGUsIDB4YTIsIDB4ZjcsIDB4OWMsIDB4ZDZcbiAgICAgICAgMHg1OCwgMHgxMiwgMHg2MywgMHgxYSwgMHg1YywgMHhmNSwgMHhkMywgMHhlZFxuXG4gICAgaXQgQCAnc2VjcDI1NmsxJywgQD0+IDo6XG4gICAgICBjb25zdCBuID0gMHhmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWJhYWVkY2U2YWY0OGEwM2JiZmQyNWU4Y2QwMzY0MTQxblxuICAgICAgX3Rlc3RVaW50X0JFX0xFIEAgbixcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZlxuICAgICAgICAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZmLCAweGZlXG4gICAgICAgIDB4YmEsIDB4YWUsIDB4ZGMsIDB4ZTYsIDB4YWYsIDB4NDgsIDB4YTAsIDB4M2JcbiAgICAgICAgMHhiZiwgMHhkMiwgMHg1ZSwgMHg4YywgMHhkMCwgMHgzNiwgMHg0MSwgMHg0MVxuXG4gICAgICBfdGVzdEludF9CRV9MRSBAIG4sIDB4MDAsXG4gICAgICAgIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmYsIDB4ZmZcbiAgICAgICAgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZiwgMHhmZVxuICAgICAgICAweGJhLCAweGFlLCAweGRjLCAweGU2LCAweGFmLCAweDQ4LCAweGEwLCAweDNiXG4gICAgICAgIDB4YmYsIDB4ZDIsIDB4NWUsIDB4OGMsIDB4ZDAsIDB4MzYsIDB4NDEsIDB4NDFcblxuXG5cbmZ1bmN0aW9uIF90ZXN0SW50X0JFX0xFKHZhbHVlLCAuLi5hbnN3ZXJfYmUpIDo6XG4gIGFuc3dlcl9iZSA9IFVpbnQ4QXJyYXkuZnJvbSBAIGFuc3dlcl9iZVxuICBjb25zdCBhbnN3ZXJfbGUgPSBhbnN3ZXJfYmUuc2xpY2UoKS5yZXZlcnNlKClcblxuICBjb25zdCB2X2JlX2ltcCA9IGVuY29kZUJpZ0ludCh2YWx1ZSlcbiAgY29uc3Qgdl9iZSA9IGVuY29kZUJpZ0ludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdJbnQodmFsdWUsIHRydWUpXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIHZfYmVfaW1wLCBcIkJpZyBlbmRpYW4gbWlzbWF0Y2ggZXhwbGljaXQgdG8gaW1wbGljaXRcIlxuICBhc3NlcnQuZGVlcEVxdWFsIEAgdl9iZSwgYW5zd2VyX2JlLCBcIkJpZy1lbmRpYW4gZW5jb2RpbmcgZG9lcyBub3QgbWF0Y2ggZXhwZWN0ZWQgYW5zd2VyXCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfbGUsIGFuc3dlcl9sZSwgXCJMaXR0bGUtZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG5cbmZ1bmN0aW9uIF90ZXN0VWludF9CRV9MRSh2YWx1ZSwgLi4uYW5zd2VyX2JlKSA6OlxuICBhbnN3ZXJfYmUgPSBVaW50OEFycmF5LmZyb20gQCBhbnN3ZXJfYmVcbiAgY29uc3QgYW5zd2VyX2xlID0gYW5zd2VyX2JlLnNsaWNlKCkucmV2ZXJzZSgpXG5cbiAgY29uc3Qgdl9iZV9pbXAgPSBlbmNvZGVCaWdVaW50KHZhbHVlKVxuICBjb25zdCB2X2JlID0gZW5jb2RlQmlnVWludCh2YWx1ZSwgZmFsc2UpXG4gIGNvbnN0IHZfbGUgPSBlbmNvZGVCaWdVaW50KHZhbHVlLCB0cnVlKVxuXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2JlLCB2X2JlX2ltcCwgXCJCaWcgZW5kaWFuIG1pc21hdGNoIGV4cGxpY2l0IHRvIGltcGxpY2l0XCJcbiAgYXNzZXJ0LmRlZXBFcXVhbCBAIHZfYmUsIGFuc3dlcl9iZSwgXCJCaWctZW5kaWFuIGVuY29kaW5nIGRvZXMgbm90IG1hdGNoIGV4cGVjdGVkIGFuc3dlclwiXG4gIGFzc2VydC5kZWVwRXF1YWwgQCB2X2xlLCBhbnN3ZXJfbGUsIFwiTGl0dGxlLWVuZGlhbiBlbmNvZGluZyBkb2VzIG5vdCBtYXRjaCBleHBlY3RlZCBhbnN3ZXJcIlxuXG4iLCJmdW5jdGlvbiBkZWNvZGVCaWdJbnQoYnVmZmVyLCBsaXR0bGVFbmRpYW4pIHtcbiAgcmV0dXJuIGxpdHRsZUVuZGlhblxuICAgID8gZGVjb2RlQmlnSW50TEUoKVxuICAgIDogZGVjb2RlQmlnSW50QkUoKX1cblxuZnVuY3Rpb24gZGVjb2RlQmlnSW50TEUoYnVmZmVyKSB7fVxuXG5mdW5jdGlvbiBkZWNvZGVCaWdJbnRCRShidWZmZXIpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGRlY29kZUJpZ0ludDtcbmV4cG9ydCB7IGRlY29kZUJpZ0ludCwgZGVjb2RlQmlnSW50QkUsIGRlY29kZUJpZ0ludExFIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iaWdpbnRfZGVjb2RlLm1qcy5tYXBcbiIsImNvbnN0IHsgYXNzZXJ0IH0gPSByZXF1aXJlKCdjaGFpJylcbmltcG9ydCBiaWdpbnRfZGVjb2RlIGZyb20gJ2JpZ2ludC1jb2RlYy9lc20vYmlnaW50X2RlY29kZS5tanMnXG5cbmRlc2NyaWJlIEAgJ2RlY29kZScsIEA9PiA6OlxuICBpdCBAICdpbXBvcnRhYmxlJywgQD0+IDo6XG4gICAgYXNzZXJ0LmVxdWFsIEAgdHlwZW9mIGJpZ2ludF9kZWNvZGUsICdmdW5jdGlvbidcblxuIl0sIm5hbWVzIjpbImFzc2VydCJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7RUFDQTs7RUFFQTtJQUNFO01BQ0U7O0lBRUY7SUFDQTtJQUNBO01BQ0U7TUFDQTtNQUNBOztJQUVGO01BQ0UsZ0JBQWdCLDBEQUEwRDs7SUFFNUU7TUFDRTtNQUNBO01BQ0E7OztJQUdGO0lBQ0E7O0VBRUY7RUFDQTs7RUFFQTtJQUNFO01BQ0U7O0lBRUY7SUFDQTtJQUNBO01BQ0U7TUFDQTtNQUNBOztJQUVGO01BQ0UsZ0JBQWdCLDBEQUEwRDs7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
