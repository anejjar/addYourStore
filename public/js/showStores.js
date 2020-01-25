//fetch stores data from api
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
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
});
//add stores to map
function loadMap(stores) {
    if(map){
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


        map.on('mousemove', 'points', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates based on the feature.
            var feature = e.features[0];
            popup
                .setLngLat(feature.geometry.coordinates)
                .setText(feature.properties.storeName)
                .addTo(map);
        });
    }
}
getStores();


