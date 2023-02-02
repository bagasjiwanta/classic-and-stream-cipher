function len(str) {
    return str.length;
  }
  
  export function vigenereEncrypt(text, key, extended=true) { //proses enkripsi

    if (!(key && text)) return ""

    let min = 65;
    let max = 26;
  
    if(extended) {
      min = 0
      max = 256
    }

    let fixKey = key;
    let result = ""
    if (len(key) !== len(text)) {
      if (len(key) < len(text)) {
        let repeat = Math.floor(len(text) / len(key));
        for (let x = 0; x < (repeat - 1); x++) {
          fixKey += key;
        }
        if (len(fixKey) < len(text)) {
          let remain = len(text) - len(fixKey);
          for (let i = 0; i < remain; i++) {
            fixKey += key[i];
          }
        }
      } else {
        fixKey = key.slice(0, len(text));
      }
    }
    for (let i = 0; i < len(text); i++){
      let pi = text[i].charCodeAt() - min
      let ki = fixKey[i].charCodeAt() - min
      let encrypt = ((pi + ki) % max ) + min
      result += String.fromCharCode(encrypt)
    }
    return result
  }
  
  export function vigenereDecrypt(text, key, extended=true) { //proses dekripsi

    if (!(key && text)) return ""

    let min = 65;
    let max = 26;
  
    if(extended) {
      min = 0
      max = 256
    }
    let fixKey = key;
    let result = ""
    if (len(key) !== len(text)) {
      if (len(key) < len(text)) {
        let repeat = Math.floor(len(text) / len(key));
        for (let x = 0; x < (repeat - 1); x++) {
          fixKey += key;
        }
        if (len(fixKey) < len(text)) {
          let remain = len(text) - len(fixKey);
          for (let i = 0; i < remain; i++) {
            fixKey += key[i];
          }
        }
      } else {
        fixKey = key.slice(0, len(text));
      }
    }
    for (let i = 0; i < len(text); i++){
      let ci = text[i].charCodeAt() - min
      let ki = fixKey[i].charCodeAt() - min
      let predec = (ci - ki)
      if (predec < 0) {
        predec += max
      }
      let decrypt = (predec % max ) + min
      result += String.fromCharCode(decrypt)
    }
    return result
  }
  
const calcCaesar = (encrypt=true, key, value) => {
  if (encrypt) {
    return (key + value) % 256
  } else {
    return (key - value + 256) % 256
  }
}
  
export function extendedVigenereFile(fileArray = new Uint8Array(), key = '', encrypt=true) {
  if(fileArray.length === 0 || key === '') {
    return []
  }
  const multiplier = Math.floor(fileArray.length / key.length)
  const remainder = fileArray.length % key.length

  let fixKey = ""
  for (let x = 0;x < multiplier;x ++) {
    fixKey += key
  }
  fixKey + key.slice(0, remainder)

  const encoder = new TextEncoder()
  const keyArray = encoder.encode(fixKey)

  const output = new Uint8Array(fileArray.length)

  fileArray.forEach((value, index) => {
    const encrypted = calcCaesar(encrypt, keyArray[index], value)
    output[index] = encrypted
  })

  return output
}

  // console.log(vigenereEncrypt("markicob62369*^&^*(", "ApaAja"));
  // console.log(vigenereDecrypt("®ÑÓ¬ÓÄ°Òsz¿gÈi", "ApaAja"))
  // console.log(vigenereEncrypt("BAGASMUTINGERJAINTUGASKRIPTO", "AKUPINTAR", false))
  // console.log(vigenereDecrypt("BKAPAZNTZNQYGRNBNKUQUHSEBPKO", "AKUPINTAR", false))
  