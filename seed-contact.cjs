const fs = require('node:fs')
const path = require('node:path')

const dbPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbPath)) {
  console.error('db.json was not found. Run this command from the grand-atlas project folder.')
  process.exit(1)
}

let db
try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
} catch (error) {
  console.error('Could not read db.json:', error.message)
  process.exit(1)
}

if (Array.isArray(db.messages)) {
  console.log('messages API already configured. No changes made.')
  process.exit(0)
}

if (db.messages !== undefined) {
  console.error('db.json already has a non-array messages field. No changes made.')
  process.exit(1)
}

const backupPath = path.join(__dirname, 'db.backup-before-contact.json')
fs.copyFileSync(dbPath, backupPath)
db.messages = []
fs.writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`)
console.log('Added messages: [] to db.json. Existing data preserved.')
console.log('Backup created:', path.basename(backupPath))
console.log('Test endpoint: http://localhost:3001/messages')
