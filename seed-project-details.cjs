const fs = require('node:fs')
const path = require('node:path')

const dbPath = path.join(__dirname, 'db.json')
if (!fs.existsSync(dbPath)) throw new Error('Cannot find db.json in the project root.')

const oldText = fs.readFileSync(dbPath, 'utf8')
const db = JSON.parse(oldText)
if (!Array.isArray(db.zoneProjects)) {
  throw new Error('Missing zoneProjects. Run seed-zone-projects.cjs first.')
}

const backupPath = path.join(__dirname, 'db.backup-before-project-details.json')
if (!fs.existsSync(backupPath)) fs.writeFileSync(backupPath, oldText, 'utf8')

// The PDF pairs a Sawary project heading with Swiss-villa sample content.
// These fields reproduce the design only; they are NOT verified property facts.
const template = {
  images: [
    '/images/project-details-main.jpg',
    '/images/project-details-room.jpg',
    '/images/project-details-lounge.jpg',
    '/images/project-details-kitchen.jpg',
    '/images/project-details-bath.jpg',
    '/images/project-details-seaview.jpg',
  ],
  propertyTitle: 'Splendid historic Art Nouveau villa',
  location: 'Minusio, Lake Maggiore, Switzerland — ref. LOC1771',
  facts: [
    { label: 'Plot size ca.', value: '589 m²' },
    { label: 'Living area ca.', value: '300 m²' },
    { label: 'Units', value: '3000' },
    { label: 'Man made Lakes', value: '3' },
    { label: 'Playground', value: '8' },
    { label: 'Public gyms', value: '20' },
    { label: 'Schools', value: '50' },
  ],
  overview: 'Nestled in a residential area of Minusio, this magnificent historic villa is for sale, fully renovated and ready to move in. The spacious living areas, flooded with natural light thanks to perfect sun exposure, create a unique and welcoming atmosphere. A well-maintained, low-maintenance garden provides the ideal setting for enjoying outdoor gatherings. Its proximity to essential services and public transport also makes the villa an ideal choice for families.',
}

db.zoneProjects = db.zoneProjects.map((project) => ({
  ...project,
  details: {
    ...template,
    ...project.details,
    heading: project.details?.heading || `${project.title || 'Project'} Project`,
  },
}))

if (Array.isArray(db.futureLandmarks)) {
  db.futureLandmarks = db.futureLandmarks.map((project) => ({
    ...project,
    details: {
      heading: `${project.name} Project`,
      propertyTitle: project.name,
      location: project.location || '',
      images: project.image ? [project.image] : [],
      facts: project.developer ? [{ label: 'Developer', value: project.developer }] : [],
      overview: 'Additional project information is not available yet.',
      ...project.details,
    },
  }))
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8')
console.log(`Updated ${db.zoneProjects.length} zone projects with mock details.`)
console.log('Old database backed up at db.backup-before-project-details.json')
console.log('Example: http://localhost:3001/zoneProjects/101')
