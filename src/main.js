import './style.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

document.querySelector('#app').innerHTML = `
  <main class="layout">
    <header class="map-header">
      <h2>Middle-earth Interactive Map (Created by Mr. Capybara)</h2>
      <p class="subtitle">Pan, zoom, and open popups to revisit key places from The Hobbit and The Lord of the Rings.</p>
      <p id="hover-coords" class="hover-coords">Hover map to see coordinates</p>
    </header>
    <section id="map" aria-label="Middle-earth map"></section>
  </main>
`

const hoverCoords = document.querySelector('#hover-coords')

const IMAGE_WIDTH = 4812
const IMAGE_HEIGHT = 3324
const LEGACY_IMAGE_WIDTH = 1296
const LEGACY_IMAGE_HEIGHT = 900

const mapBounds = [
  [0, 0],
  [IMAGE_HEIGHT, IMAGE_WIDTH],
]

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1.6,
  maxZoom: 1,
  zoomControl: true,
})

const mapImageUrl = `${import.meta.env.BASE_URL}middle-earth-hd.jpeg`

L.imageOverlay(mapImageUrl, mapBounds).addTo(map)
map.fitBounds(mapBounds)
map.setMaxBounds([
  [-120, -120],
  [IMAGE_HEIGHT + 120, IMAGE_WIDTH + 120],
])

map.on('mousemove', (event) => {
  const { lat, lng } = event.latlng
  const withinImage = lat >= 0 && lat <= IMAGE_HEIGHT && lng >= 0 && lng <= IMAGE_WIDTH

  if (withinImage) {
    hoverCoords.textContent = `(lat: ${lat.toFixed(1)}, lng: ${lng.toFixed(1)})`
    return
  }

  hoverCoords.textContent = `lat: ${lat.toFixed(1)}, lng: ${lng.toFixed(1)} (outside image)`
})

map.on('mouseout', () => {
  hoverCoords.textContent = 'Hover map to see coordinates'
})

// Coordinates are [lat, lng] in Leaflet CRS.Simple where [0,0] = bottom-left.
// Converted from image pixels (px_x, px_y from top-left):
//   lat = IMAGE_HEIGHT - px_y,  lng = px_x
const locations = [
  {
    name: 'Annuminas',
    point: [624, 390],
    lore: 'Placeholder lore description for Annuminas.',
  },
  {
    name: 'Bree',
    point: [620, 400],
    lore: 'Placeholder lore description for Bree.',
  },
  {
    name: 'Bywater',
    point: [660, 300],
    lore: 'Placeholder lore description for Bywater.',
  },
  {
    name: 'Cameth Brin',
    point: [632, 370],
    lore: 'Placeholder lore description for Cameth Brin.',
  },
  {
    name: 'Dol Amroth',
    point: [600, 450],
    lore: 'Placeholder lore description for Dol Amroth.',
  },
  {
    name: 'Forlond',
    point: [648, 330],
    lore: 'Placeholder lore description for Forlond.',
  },
  {
    name: 'Fornost Erian',
    point: [628, 380],
    lore: 'Placeholder lore description for Fornost Erian.',
  },
  {
    name: 'Hobbiton',
    point: [664, 290],
    lore: 'Placeholder lore description for Hobbiton.',
  },
  {
    name: 'Methraith',
    point: [636, 360],
    lore: 'Placeholder lore description for Methraith.',
  },
  {
    name: 'Michel Delving',
    point: [670, 280],
    lore: 'Placeholder lore description for Michel Delving.',
  },
  {
    name: 'Minas Ithil',
    point: [612, 420],
    lore: 'Placeholder lore description for Minas Ithil.',
  },
  {
    name: 'Minas Tirith',
    point: [608, 430],
    lore: 'Placeholder lore description for Minas Tirith.',
  },
  {
    name: 'Osgiliath',
    point: [616, 410],
    lore: 'Placeholder lore description for Osgiliath.',
  },
  {
    name: 'Pelargir',
    point: [604, 440],
    lore: 'Placeholder lore description for Pelargir.',
  },
  {
    name: 'Rivendell',
    point: [596, 460],
    lore: 'Placeholder lore description for Rivendell.',
  },
  {
    name: 'Tharbad',
    point: [644, 340],
    lore: 'Placeholder lore description for Tharbad.',
  },
  {
    name: 'The Shire',
    point: [668, 275],
    lore: '𝕸𝖎𝖈𝖍𝖊𝖑 𝕯𝖊𝖑𝖛𝖎𝖓𝖌, 𝖙𝖍𝖊 𝖑𝖆𝖗𝖌𝖊𝖘𝖙 𝖈𝖎𝖙𝖞 𝖎𝖓 𝖙𝖍𝖊 𝖘𝖍𝖗𝖎𝖗𝖊,𝖑𝖔𝖈𝖆𝖙𝖊𝖉 𝖎𝖓 𝖙𝖍𝖊 𝖜𝖍𝖎𝖙𝖊 𝖉𝖔𝖜𝖓𝖘.𝕻𝖔𝖕𝖚𝖑𝖆𝖙𝖊𝖉 𝖇𝖞 𝖍𝖔𝖇𝖇𝖎𝖙𝖘 ,𝖙𝖍𝖊 𝖒𝖆𝖞𝖔𝖗 𝖎𝖘 𝖂𝖎𝖑𝖑 𝖂𝖍𝖎𝖙𝖋𝖔𝖔𝖙. 𝕬𝖓𝖉 𝖙𝖍𝖊 𝖔𝖓𝖑𝖞 𝖕𝖗𝖎𝖘𝖔𝖓 𝖎𝖓 𝖙𝖍𝖊 𝕾𝖍𝖗𝖎𝖗𝖊 𝖙𝖍𝖊 𝕷𝖔𝖈𝖐𝖍𝖔𝖑𝖊𝖘 𝖆𝖗𝖊 𝖍𝖊𝖗𝖊.',
  },
  {
    name: 'The Tower Hill\'s',
    point: [652, 320],
    lore: 'Placeholder lore description for The Tower Hill\'s.',
  },
  {
    name: 'Tuckborough',
    point: [656, 310],
    lore: 'Placeholder lore description for Tuckborough.',
  },
  {
    name: 'Tyrn Gornthad',
    point: [640, 350],
    lore: 'Placeholder lore description for Tyrn Gornthad.',
  },
]

const latScale = IMAGE_HEIGHT / LEGACY_IMAGE_HEIGHT
const lngScale = IMAGE_WIDTH / LEGACY_IMAGE_WIDTH

locations.forEach((location) => {
  const scaledPoint = [location.point[0] * latScale, location.point[1] * lngScale]

  L.circleMarker(scaledPoint, {
    radius: 5,
    color: '#0b4fd9',
    weight: 1.5,
    fillColor: '#2f8bff',
    fillOpacity: 0.65,
  })
    .addTo(map)
    .bindTooltip(location.name, {
      direction: 'top',
      offset: [0, -8],
      opacity: 0.95,
    })
    .bindPopup(`<h2>${location.name}</h2><p>${location.lore}</p>`)
})
