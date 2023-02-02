import fs from 'fs'
import {v4 as uuidv4} from 'uuid'

export default function handler(req, res) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let second = new Date().getUTCSeconds()
  let result = ''
  for(let i = 0;i <= 50000;i ++) {
    result += characters[Math.floor(Math.random() * second) % 26]
  }
  const filename = uuidv4() + '.txt';
  fs.writeFileSync(
    filename,
    result
  )
  const fileBuffer = fs.readFileSync(
    filename
  )
  res.setHeader('Content-Type', 'text/plain')
  res.send(fileBuffer)
}