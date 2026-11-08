const fs = require('node:fs')
const path = require('node:path')

const dbPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbPath)) {
  throw new Error('db.json not found. Copy this file into your grand-atlas root folder.')
}

const original = fs.readFileSync(dbPath, 'utf8')
const db = JSON.parse(original)
if (!Array.isArray(db.zones) || db.zones.length === 0) {
  throw new Error('No zones found. Run the previous seed-zones.cjs script first.')
}

const backupPath = path.join(__dirname, 'db.backup-before-zone-projects.json')
if (!fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, original, 'utf8')
}

const exampleDescription =
  'Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views.'

db.zoneProjects = db.zones.flatMap((zone) =>
  Array.from({ length: 5 }, (_, index) => ({
    id: Number(zone.id) * 100 + index + 1,
    zoneId: Number(zone.id),
    title: 'Sawary Family Villa',
    image: '/images/zone-project-card.png',
    units: 50,
    gyms: 7,
    area: '15,000m',
    description: exampleDescription,
  }))
)

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8')
console.log(`Added ${db.zoneProjects.length} mock zone projects for ${db.zones.length} zones.`)
console.log('Existing data preserved. Test: http://localhost:3001/zoneProjects?zoneId=1')
