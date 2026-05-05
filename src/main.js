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

const mapBounds = [
  [0, 0],
  [900, 1296],
]

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1.6,
  maxZoom: 1,
  zoomControl: true,
})

L.imageOverlay('/middle-earth.jpg', mapBounds).addTo(map)
map.fitBounds(mapBounds)
map.setMaxBounds([
  [-120, -120],
  [1020, 1416],
])

map.on('mousemove', (event) => {
  const { lat, lng } = event.latlng
  const withinImage = lat >= 0 && lat <= 900 && lng >= 0 && lng <= 1296

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
// Converted from image pixels (px_x, px_y from top-left of 1296x900):
//   lat = 900 - px_y,  lng = px_x
const locations = [
  {
    name: 'The Shire',
    point: [595, 205],
    lore: 'A green and quiet homeland of Hobbits, where Bilbo and Frodo begin their journeys.',
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

locations.forEach((location) => {
  L.circleMarker(location.point, {
    radius: 5,
    color: '#4a311e',
    weight: 1.5,
    fillColor: '#a5482a',
    fillOpacity: 0.5,
  })
    .addTo(map)
    .bindPopup(`<h2>${location.name}</h2><p>${location.lore}</p>`)
})
