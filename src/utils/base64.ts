// base64加密解密
const _keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export const Base64 = {
  encode(input: string) {
    let output = ''
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0
    input = this._utf8_encode(input)
    while (i < input.length) {
      chr1 = input.charCodeAt(i++)
      chr2 = input.charCodeAt(i++)
      chr3 = input.charCodeAt(i++)
      // tslint:disable-next-line: no-bitwise
      enc1 = chr1 >> 2
      // tslint:disable-next-line: no-bitwise
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
      // tslint:disable-next-line: no-bitwise
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
      // tslint:disable-next-line: no-bitwise
      enc4 = chr3 & 63
      if (isNaN(chr2)) {
        enc3 = enc4 = 64
      } else if (isNaN(chr3)) {
        enc4 = 64
      }
      output =
        output +
        _keyStr.charAt(enc1) +
        _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) +
        _keyStr.charAt(enc4)
    }
    return output
  },
  decode(input: string) {
    let output = ''
    let chr1, chr2, chr3
    let enc1, enc2, enc3, enc4
    let i = 0
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++))
      enc2 = _keyStr.indexOf(input.charAt(i++))
      enc3 = _keyStr.indexOf(input.charAt(i++))
      enc4 = _keyStr.indexOf(input.charAt(i++))
      // tslint:disable-next-line: no-bitwise
      chr1 = (enc1 << 2) | (enc2 >> 4)
      // tslint:disable-next-line: no-bitwise
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      // tslint:disable-next-line: no-bitwise
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3)
      }
    }
    output = this._utf8_decode(output)
    return output
  },
  _utf8_encode(Str: string) {
    Str = Str.replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < Str.length; n++) {
      const c = Str.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if (c > 127 && c < 2048) {
        // tslint:disable-next-line: no-bitwise
        utftext += String.fromCharCode((c >> 6) | 192)
        // tslint:disable-next-line: no-bitwise
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        // tslint:disable-next-line: no-bitwise
        utftext += String.fromCharCode((c >> 12) | 224)
        // tslint:disable-next-line: no-bitwise
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        // tslint:disable-next-line: no-bitwise
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  _utf8_decode(utftext: string) {
    let Str = ''
    let i = 0
    let c = 0
    let c2 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        Str += String.fromCharCode(c)
        i++
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1)
        // tslint:disable-next-line: no-bitwise
        Str += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        const c3 = utftext.charCodeAt(i + 2)
        Str += String.fromCharCode(
          // tslint:disable-next-line: no-bitwise
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        )
        i += 3
      }
    }
    return Str
  }
}
