import { createContext, useContext, useState } from "react";

const Context = createContext()

export const useInfo = () => useContext(Context)

export function MutiProvider({ children }) {
  const [isEncode, setIsEncode] = useState(true);
  const [method, setMethod] = useState('vigenere');
  const [encryptKey, setEncryptKey] = useState('')
  const [format, setFormat] = useState('text');
  const [plainText, setPlainText] = useState('');
  const [fileStream, setFileStream] = useState('');

  return (
  <Context.Provider value={{
    isEncode, setIsEncode, method, setMethod, encryptKey, setEncryptKey,
    format, setFormat, plainText, setPlainText, fileStream, setFileStream
  }}>
    { children }
  </Context.Provider>
  )
}
