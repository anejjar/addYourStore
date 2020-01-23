mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5lamphciIsImEiOiJjazVxcmZtdm0wNTM2M21ubHAxajE5ejFzIn0.wWSIW0fwGQpLcTnDbVBANg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-9.12, 30.25]
});
//fetch stores from db

async function getStores() {
  const res = await fetch("/api/stores");
  const datas = await res.json();
  const stores = datas.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        icon: "shop",
        storeName: store.name
      }
    };
  });
  loadMap(stores);
}

//add stores to map
function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.25,
        "text-field": "{storeName}",
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}
getStores();
