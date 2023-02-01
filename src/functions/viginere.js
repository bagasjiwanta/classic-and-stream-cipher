function len(str) {
    return str.length;
  }
  
  function print(something) {
    console.log(something);
  }
  
  
  function vigenereEncrypt(text, key) { //proses enkripsi
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
      let pi = text[i].charCodeAt() - 65
      let ki = fixKey[i].charCodeAt() - 65
      let encrypt = ((pi + ki) % 26 ) + 65
      result += String.fromCharCode(encrypt)
    }
    return result
  }
  
  function vigenereDecrypt(text, key) { //proses dekripsi
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
      let ci = text[i].charCodeAt() - 65
      let ki = fixKey[i].charCodeAt() - 65
      let predec = (ci - ki)
      if (predec < 0) {
        predec += 26
      }
      let decrypt = (predec % 26 ) + 65
      result += String.fromCharCode(decrypt)
    }
    return result
  }
  
  // print(vigenereEncrypt("BAGASMUTINGERJAINTUGASKRIPTO", "AKUPINTAR"))
  // print(vigenereDecrypt("BKAPAZNTZNQYGRNBNKUQUHSEBPKO", "AKUPINTAR"))
  