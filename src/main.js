import './style.css'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

document.querySelector('#app').innerHTML = `
  <main class="layout">
    <header class="map-header">
      <p class="kicker">Legendarium Atlas</p>
      <h1>Middle-earth Interactive Map</h1>
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

L.imageOverlay('/middle-earth-hd.jpeg', mapBounds).addTo(map)
map.fitBounds(mapBounds)
map.setMaxBounds([
  [-120, -120],
  [IMAGE_HEIGHT + 120, IMAGE_WIDTH + 120],
])

map.on('mousemove', (event) => {
  const { lat, lng } = event.latlng
  const withinImage = lat >= 0 && lat <= IMAGE_HEIGHT && lng >= 0 && lng <= IMAGE_WIDTH

  if (withinImage) {
    hoverCoords.textContent = `lat: ${lat.toFixed(1)}, lng: ${lng.toFixed(1)}`
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
    name: 'The Shire',
    point: [668, 275],
    lore: '𝕸𝖎𝖈𝖍𝖊𝖑 𝕯𝖊𝖑𝖛𝖎𝖓𝖌, 𝖙𝖍𝖊 𝖑𝖆𝖗𝖌𝖊𝖘𝖙 𝖈𝖎𝖙𝖞 𝖎𝖓 𝖙𝖍𝖊 𝖘𝖍𝖗𝖎𝖗𝖊,𝖑𝖔𝖈𝖆𝖙𝖊𝖉 𝖎𝖓 𝖙𝖍𝖊 𝖜𝖍𝖎𝖙𝖊 𝖉𝖔𝖜𝖓𝖘.𝕻𝖔𝖕𝖚𝖑𝖆𝖙𝖊𝖉 𝖇𝖞 𝖍𝖔𝖇𝖇𝖎𝖙𝖘 ,𝖙𝖍𝖊 𝖒𝖆𝖞𝖔𝖗 𝖎𝖘 𝖂𝖎𝖑𝖑 𝖂𝖍𝖎𝖙𝖋𝖔𝖔𝖙. 𝕬𝖓𝖉 𝖙𝖍𝖊 𝖔𝖓𝖑𝖞 𝖕𝖗𝖎𝖘𝖔𝖓 𝖎𝖓 𝖙𝖍𝖊 𝕾𝖍𝖗𝖎𝖗𝖊 𝖙𝖍𝖊 𝕷𝖔𝖈𝖐𝖍𝖔𝖑𝖊𝖘 𝖆𝖗𝖊 𝖍𝖊𝖗𝖊.',
  },
  {
    name: 'Bree',
    point: [615, 270],
    lore: 'A crossroads town where Rangers watch the road and Strider first joins the Fellowship.',
  },
  {
    name: 'Rivendell',
    point: [655, 320],
    lore: 'Elrond\'s hidden valley, a refuge of lore and healing, and site of the Council of Elrond.',
  },
  {
    name: 'Moria',
    point: [510, 295],
    lore: 'The ancient Dwarven realm of Khazad-dum, where drums in the deep still echo.',
  },
  {
    name: 'Lothlorien',
    point: [475, 340],
    lore: 'Galadriel\'s golden wood, where time seems to flow differently under mallorn boughs.',
  },
  {
    name: 'Isengard',
    point: [490, 250],
    lore: 'Saruman\'s ringed fortress Orthanc, later reclaimed after the Ents\' wrath.',
  },
  {
    name: 'Helm\'s Deep',
    point: [455, 235],
    lore: 'The mountain fortress of Rohan, famed for the long night of siege and sudden dawn.',
  },
  {
    name: 'Minas Tirith',
    point: [410, 330],
    lore: 'The White City of Gondor, standing against Sauron in the War of the Ring.',
  },
  {
    name: 'Mordor / Mount Doom',
    point: [540, 548],
    lore: 'Sauron\'s black land and the fire where the One Ring was forged and unmade.',
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
