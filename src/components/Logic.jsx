import { createContext, useContext, useEffect, useState } from "react";
import { extendedVigenereFile, vigenereDecrypt, vigenereEncrypt, } from "../functions/vigenere";
import { playfairDecrypt, playfairEncrypt } from "@/functions/playfair";

const Context = createContext()

export const useInfo = () => useContext(Context)

export function MutiProvider({ children }) {
  const [isEncode, _setIsEncode] = useState(true);
  const [method, _setMethod] = useState('vigenere');
  const [encryptKey, setEncryptKey] = useState('')
  const [format, setFormat] = useState('text');
  const [inputText, setInputText] = useState('');
  const [inputFile, setInputFile] = useState(new Uint8Array());
  const [outputText, setOutputText] = useState('');
  const extendedvigenere = method === 'extendedvigenere'

  const generateNewKey = async () => {
    const response = await fetch('/api/randomkey')
    const result = await response.text()
    setEncryptKey(result)
  }

  const clean = () => {
    setInputText('')
    setEncryptKey('')
    setInputFile('')
    setOutputText('')
  }

  const setMethod = (newMethod) => {
    clean()
    _setMethod(newMethod)
  }

  const setIsEncode = (value) => {
    clean()
    _setIsEncode(value)
  }

  const download = (blob, type, name) => {
    const element = document.createElement('a')
    const file = new Blob([blob], {type: type})
    element.href = URL.createObjectURL(file)
    element.download = name
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const downloadFile = () => download(outputText, 'application/octet-stream', 'cipherfile')

  const downloadText = () => download(outputText, 'text/plain', 'cipherfile.txt')

  const downloadKey = () => download(encryptKey, 'text/plain', 'key.txt')

  const alphabetOnly = (string) => /^$|^[a-z]+$/i.test(string)

  const asciiOnly = (string) => /^$|^[\x00-\xFF]+$/i.test(string)

  useEffect(() => {
    const update = async () => {
      if (method === 'vigenere' || method === 'onetimepad'){
        if(isEncode) setOutputText(vigenereEncrypt(inputText, encryptKey, false))
        else setOutputText(vigenereDecrypt(inputText, encryptKey, false))
      }

      else if (method === 'extendedvigenere'){
        if(format === 'file') {
          setOutputText(extendedVigenereFile(inputFile, encryptKey, isEncode))
          console.log(inputFile, outputText);
        } else {
          if(isEncode) setOutputText(vigenereEncrypt(inputText, encryptKey))
          else setOutputText(vigenereDecrypt(inputText, encryptKey))
        }
      }

      else if (method === 'playfair') {
        if (isEncode) setOutputText(playfairEncrypt(inputText, encryptKey))
        else setOutputText(playfairDecrypt(inputText, encryptKey))
      }
    }

    update()
  }, [encryptKey, method, inputText, inputFile])

  
  return (
  <Context.Provider value={{
    isEncode, 
    setIsEncode, 
    method, 
    setMethod, 
    encryptKey, 
    setEncryptKey,
    format, 
    setFormat, 
    inputText, 
    setInputText, 
    inputFile, 
    setInputFile,
    outputText,
    alphabetOnly,
    asciiOnly,
    extendedvigenere,
    downloadFile,
    downloadText,
    generateNewKey,
    downloadKey
  }}>
    { children }
  </Context.Provider>
  )
}
