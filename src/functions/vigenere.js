function len(str) {
    return str.length;
  }
  
  
  function vigenereEncrypt(text, key, extended=true) { //proses enkripsi
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
  
  function vigenereDecrypt(text, key, extended=true) { //proses dekripsi
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
  
  console.log(vigenereEncrypt("markicob62369*^&^*(", "ApaAja"));
  console.log(vigenereDecrypt("®ÑÓ¬ÓÄ°Òsz¿gÈi", "ApaAja"))
  console.log(vigenereEncrypt("BAGASMUTINGERJAINTUGASKRIPTO", "AKUPINTAR", false))
  console.log(vigenereDecrypt("BKAPAZNTZNQYGRNBNKUQUHSEBPKO", "AKUPINTAR", false))
  