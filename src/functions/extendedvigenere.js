function len(str) {
    return str.length;
  }
  
  function print(something) {
    console.log(something);
  }
  
  // const printList = (something) => console.log([...something].map(v => v.charCodeAt()))
  
  function vigenereEncrypt(text, key) {
    //proses enkripsi
    let fixKey = key;
    let result = "";
    if (len(key) !== len(text)) {
      if (len(key) < len(text)) {
        let repeat = Math.floor(len(text) / len(key));
        for (let x = 0; x < repeat - 1; x++) {
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
    for (let i = 0; i < len(text); i++) {
      let pi = text[i].charCodeAt();
      let ki = fixKey[i].charCodeAt();
      let encrypt = ((pi + ki) % 256);
      result += String.fromCharCode(encrypt);
    }
    return result;
  }
  
  function vigenereDecrypt(text, key) {
    //proses dekripsi
    let fixKey = key;
    let result = "";
    if (len(key) !== len(text)) {
      if (len(key) < len(text)) {
        let repeat = Math.floor(len(text) / len(key));
        for (let x = 0; x < repeat - 1; x++) {
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
    for (let i = 0; i < len(text); i++) {
      let ci = text[i].charCodeAt();
      let ki = fixKey[i].charCodeAt();
      let predec = ci - ki;
      if (predec < 0) {
        predec += 256;
      }
      let decrypt = (predec % 256);
      result += String.fromCharCode(decrypt);
    }
    return result;
  }
  // print(vigenereEncrypt("markicob62369*^&^*(", "ApaAja"));
  // print(vigenereDecrypt("®ÑÓ¬ÓÄ°Òsz¿gÈi", "ApaAja"))
  