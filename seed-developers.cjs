// Repeatable mock data seed. Keeps all existing JSON Server collections.
const fs = require('node:fs')
const path = require('node:path')

const dbPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbPath)) {
  throw new Error('db.json not found in the project root.')
}
const original = fs.readFileSync(dbPath, 'utf8')
const db = JSON.parse(original)

if (!Array.isArray(db.zoneProjects) || db.zoneProjects.length < 5) {
  throw new Error('zoneProjects are missing. Run seed-zone-projects.cjs first.')
}

const backupPath = path.join(__dirname, 'db.backup-before-developers.json')
if (!fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, original, 'utf8')
}

const palm = {
  kind: 'palm',
  name: 'Palm Hills Developments',
  subtitle: 'Palm Hills Developments',
  image: '/images/developer-palm-hills.jpg',
  logo: '/images/developer-palm-hills-logo.png',
}
const hayah = {
  kind: 'hayah',
  name: 'Hayah City',
  subtitle: 'Hayah Development',
  image: '/images/developer-hayah-city.jpg',
  logo: '/images/developer-hayah-city-mark.png',
}

// The Figma design repeats these two brands across nine cards.
db.developers = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  ...(index % 3 === 1 ? hayah : palm),
  location: 'New Cairo',
}))

// Keep developer-project associations separate from source project records.
// This avoids changing IDs used by the existing ProjectDetails page.
const zoneIds = [...new Set(db.zoneProjects.map((p) => p.zoneId))]
if (!zoneIds.length) throw new Error('zoneProjects do not have any zoneId values.')

db.developerProjects = db.developers.flatMap((developer, index) => {
  const zoneId = zoneIds[index % zoneIds.length]
  const source = db.zoneProjects.filter((p) => p.zoneId === zoneId).slice(0, 5)
  if (source.length !== 5) {
    throw new Error(`Only ${source.length} zoneProjects found for zone ${zoneId}; expected 5.`)
  }
  return source.map((project, i) => ({
    id: developer.id * 1000 + i + 1,
    developerId: developer.id,
    sourceProjectId: project.id,
    title: project.title,
    image: project.image || '/images/developers-project-card.jpg',
    units: project.units,
    gyms: project.gyms,
    area: project.area,
    description: project.description,
  }))
})

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8')
console.log(`Added ${db.developers.length} developer cards and ${db.developerProjects.length} project associations.`)
console.log('Previous collections preserved. Test http://localhost:3001/developers and http://localhost:3001/developerProjects?developerId=1')
