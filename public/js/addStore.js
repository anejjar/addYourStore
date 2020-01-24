
const form = document.getElementById("store-form");
const storeName = document.getElementById("Name");
const storeAdress = document.getElementById("Address");

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5lamphciIsImEiOiJjazVxcmZtdm0wNTM2M21ubHAxajE5ejFzIn0.wWSIW0fwGQpLcTnDbVBANg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 6,
  center: [-9.12, 30.25]
});
function addFeature(coordinates){
  console.log(coordinates);
  map.addLayer({
    id: "points",
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coordinates
          },
          properties: {
            icon: "shop",
            storeName: storeName.value || 'Your Store'
          }
        }]
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
}
map.on('click',function(e){
  if (map.getLayer('points')) map.removeLayer('points');
  if (map.getSource('points')) map.removeSource('points');
  let coordinates = e.lngLat;
  coordinates=[coordinates.lng,coordinates.lat];
  addFeature(coordinates);
})

//add eventlister to change store name when you are typing 
storeName.addEventListener('keyup',function(){
  if(!map.getSource('points')) return;
  const coordinates = map.getSource('points')._data.features[0].geometry.coordinates;
  if(coordinates){
    if (map.getLayer('points')) map.removeLayer('points');
    if (map.getSource('points')) map.removeSource('points');
    addFeature(coordinates);
  }
})


async function addStore(e) {
  e.preventDefault();

  if (storeName.value === "" || storeAdress.value === "" || !map.getSource('points')) {
    alert("fill out the fields");
    return 0;
  }
  const sendBody = {
    name: storeName.value,
    description: storeAdress.value,
    coordinates: map.getSource('points')._data.features[0].geometry.coordinates
  };
  try {
    const res = await fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error("Store exists");
    }
    // 10 main st amesbury ma
    alert("store added");
    window.location.href = "/index.html";
  } catch (err) {
    alert("error");
    console.log("error", err);
    return;
  }
}
form.addEventListener("submit", addStore);
