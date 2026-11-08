const fs = require('node:fs')
const path = require('node:path')

const dbFile = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbFile)) {
  throw new Error('db.json not found. Run this from the grand-atlas project folder.')
}

const original = fs.readFileSync(dbFile, 'utf8')
const db = JSON.parse(original)
const backup = path.join(__dirname, 'db.backup-before-zones.json')
if (!fs.existsSync(backup)) fs.writeFileSync(backup, original)

db.zones = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: 'Cairo',
  image: `/images/zone-cairo-${(index % 4) + 1}.jpg`,
}))

fs.writeFileSync(dbFile, JSON.stringify(db, null, 2) + '\n', 'utf8')
console.log('Zones saved! Existing stats, units, and projects were preserved.')
console.log('Check http://localhost:3001/zones')
