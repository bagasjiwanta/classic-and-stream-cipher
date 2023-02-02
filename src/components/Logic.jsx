import { createContext, useContext, useEffect, useState } from "react";
import { extendedVigenereFile, vigenereDecrypt, vigenereEncrypt, } from "../functions/vigenere";

const Context = createContext()

export const useInfo = () => useContext(Context)

export function MutiProvider({ children }) {
  const [isEncode, setIsEncode] = useState(true);
  const [method, setMethod] = useState('vigenere');
  const [encryptKey, setEncryptKey] = useState('')
  const [format, setFormat] = useState('text');
  const [inputText, setInputText] = useState('');
  const [inputFile, setInputFile] = useState(new Uint8Array());
  const [outputText, setOutputText] = useState('');
  const extendedvigenere = method === 'extendedvigenere'

  const downloadFile = () => {
    // return console.log(outputText)
    const element = document.createElement('a')
    const file = new Blob([outputText], {type: 'application/octet-stream'})
    element.href = URL.createObjectURL(file)
    element.download = 'cipherfile'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const downloadText = () => {
    const element = document.createElement('a')
    const file = new Blob([outputText], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'cipherfile.txt'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const alphabetOnly = (string) => /^$|^[a-z]+$/i.test(string)
  const asciiOnly = (string) => /^$|^[\x00-\xFF]+$/i.test(string)

  useEffect(() => {
    const update = async () => {
      switch(method) {
        case 'vigenere':
          if(isEncode) setOutputText(vigenereEncrypt(inputText, encryptKey, false))
          else setInputText(vigenereDecrypt(outputText, encryptKey))
          break

        case 'extendedvigenere':
          if(format === 'file') {
            // if(isEncode) setOutputText(vigenereEncrypt(inputFile, encryptKey))
            // else setInputText(vigenereDecrypt(outputText, encryptKey))
            setOutputText(
              extendedVigenereFile(
                inputFile,
                encryptKey,
                isEncode
              )
            )
          } else {
            if(isEncode) setOutputText(vigenereEncrypt(inputText, encryptKey))
            else setInputText(vigenereDecrypt(outputText, encryptKey))
          }
          break

        default:
          console.log('hello')
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
    downloadText
  }}>
    { children }
  </Context.Provider>
  )
}
