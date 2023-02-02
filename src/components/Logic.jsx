import { createContext, useContext, useEffect, useState } from "react";
import { extendedVigenereFile, vigenereDecrypt, vigenereEncrypt, } from "../functions/vigenere";

const Context = createContext()

export const useInfo = () => useContext(Context)

export function MutiProvider({ children }) {
  const [isEncode, setIsEncode] = useState(true);
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

  const setMethod = (newMethod) => {
    setInputText('')
    setEncryptKey('')
    setInputFile('')
    setOutputText('')
    _setMethod(newMethod)
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
        else setInputText(vigenereDecrypt(outputText, encryptKey))
      }

      else if (method === 'extendedvigenere'){
        if(format === 'file') {
          setOutputText(extendedVigenereFile(inputFile, encryptKey, isEncode))
        } else {
          if(isEncode) setOutputText(vigenereEncrypt(inputText, encryptKey))
          else setInputText(vigenereDecrypt(outputText, encryptKey))
        }
      }

      else if (method === 'playfair') {
        console.log('playfair')
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
