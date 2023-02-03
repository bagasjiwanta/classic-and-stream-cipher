function len(str) {
  return str.length;
}

function print(something) {
  console.log(something);
}

export function playfairEncrypt(text, key) {
  if (key === '') return ''
  let preKey1 = "";
  let preKey2 = "";
  let fixKey = "";
  for (let i = 0; i < len(key); i++) {
    if (key[i] !== "J") {
      //membuang J dari key
      preKey1 += key[i];
    }
  }
  //menghilangkan huruf yang duplicate
  preKey2 = Array.from(
    new Set(
      preKey1.split('')
      )
    ).join('')
  
  //membuat fix key (yang akan digunakan dalam bujur sangkar 5x5)
  let playfair_key = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  fixKey += preKey2;
  for (let i = 0; i < 25; i++) {
    if(fixKey.search(playfair_key[i]) < 0) {
      fixKey += playfair_key[i]
    }
  }
  // let keyMatrix = new Array(26).fill('x');
  // for (let i = 0; i < 25; i++){
  //   if (keyMatrix[i] === 'x'){
      
  //   }
  // }
  let keyMatrix = [
    fixKey.slice(0, 5).split(''),
    fixKey.slice(5, 10).split(''),
    fixKey.slice(10, 15).split(''),
    fixKey.slice(15, 20).split(''),
    fixKey.slice(20, 25).split(''),
  ]


  //membuat fix plain text
  let fixText = ""
  for (let i = 0; i < len(text); i++){
    if (text[i] !== "J"){
      fixText += text[i]
    }else{
      fixText += "I"
    }
  }
  for (let i = 0; i < len(fixText); i+= 2){
    if (fixText[i] === fixText[i+1]){
      fixText = fixText.slice(0,(i+1)) + 'X' + fixText.slice((i+1),len(fixText))
    }
  }
  if ((len(fixText) % 2) !== 0){
    fixText += 'X'
  }
  //proses enkripsi
  let result = ""
  for (let p = 0; p < len(fixText); p+=2){
    let baris1 = 0
    let kolom1 = 0
    let baris2 = 0
    let kolom2 = 0
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++){
        if (keyMatrix[i][j] === fixText[p]){
          baris1 = i
          kolom1 = j
        }
        if (keyMatrix[i][j] === fixText[p+1]){
          baris2 = i
          kolom2 = j
        }
      }
    }
    if (baris1 === baris2){
      result = result + (keyMatrix[baris1][(kolom1 + 1) % 5]) + (keyMatrix[baris2][(kolom2 + 1) % 5])
    }else if (kolom1 === kolom2){
      result = result + (keyMatrix[(baris1 + 1) % 5][kolom1]) + (keyMatrix[(baris2 + 1) % 5][kolom2])
    }else{
      result = result + (keyMatrix[baris1][kolom2]) + (keyMatrix[baris2][kolom1])
    }
  }
  return result
  // print(result)
}

export function playfairDecrypt(text, key) {
  let preKey1 = "";
  let preKey2 = "";
  let fixKey = "";
  for (let i = 0; i < len(key); i++) {
    if (key[i] !== "J") {
      //membuang J dari key
      preKey1 += key[i];
    }
  }
  //menghilangkan huruf yang duplicate
  preKey2 = Array.from(
    new Set(
      preKey1.split('')
      )
    ).join('')
  
  //membuat fix key (yang akan digunakan dalam bujur sangkar 5x5)
  let playfair_key = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  fixKey += preKey2;
  for (let i = 0; i < 25; i++) {
    if(fixKey.search(playfair_key[i]) < 0) {
      fixKey += playfair_key[i]
    }
  }
  let keyMatrix = [
    fixKey.slice(0, 5).split(''),
    fixKey.slice(5, 10).split(''),
    fixKey.slice(10, 15).split(''),
    fixKey.slice(15, 20).split(''),
    fixKey.slice(20, 25).split(''),
  ]


  //membuat fix plain text
  let fixText = ""
  for (let i = 0; i < len(text); i++){
    if (text[i] !== "J"){
      fixText += text[i]
    }else{
      fixText += "I"
    }
  }
  for (let i = 0; i < len(fixText); i+= 2){
    if (fixText[i] === fixText[i+1]){
      fixText = fixText.slice(0,(i+1)) + 'X' + fixText.slice((i+1),len(fixText))
    }
  }
  if ((len(fixText) % 2) !== 0){
    fixText += 'X'
  }
  //proses dekripsi
  let result = ""
  for (let p = 0; p < len(fixText); p+=2){
    let baris1 = 0
    let kolom1 = 0
    let baris2 = 0
    let kolom2 = 0
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++){
        if (keyMatrix[i][j] === fixText[p]){
          baris1 = i
          kolom1 = j
        }
        if (keyMatrix[i][j] === fixText[p+1]){
          baris2 = i
          kolom2 = j
        }
      }
    }
    if (baris1 === baris2){
      result = result + (keyMatrix[baris1][((kolom1 - 1) + 5) % 5]) + (keyMatrix[baris2][((kolom2 - 1) + 5) % 5])
    }else if (kolom1 === kolom2){
      result = result + (keyMatrix[((baris1 - 1) + 5) % 5][kolom1]) + (keyMatrix[((baris2 - 1) +5) % 5][kolom2])
    }else{
      result = result + (keyMatrix[baris1][kolom2]) + (keyMatrix[baris2][kolom1])
    }
  }
  return result
}

// playfairDecrypt("ZBRSFYKUPGLGRKVSNLQV", "JALANGANESHASEPULUH")
