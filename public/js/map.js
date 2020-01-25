mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5lamphciIsImEiOiJjazVxcmZtdm0wNTM2M21ubHAxajE5ejFzIn0.wWSIW0fwGQpLcTnDbVBANg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-9.12, 30.25]
});
//fetch stores from db