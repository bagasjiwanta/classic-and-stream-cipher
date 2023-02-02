import fs from 'fs'

export default function handler(req, res) {
  fs.writeFileSync(
    'mamah.txt',
    'mamah blog'
  )
  const fileBuffer = fs.readFileSync(
    'mamah.txt'
  )

  res.setHeader('Content-Type', 'text/plain')
  res.send(fileBuffer)
}