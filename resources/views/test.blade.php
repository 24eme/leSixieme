<!DOCTYPE html>
<html>

<head>
    <!--  Include leaflet javascript and css -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet-src.js" crossorigin=""></script>
    <!--  Include targomo leaflet full build -->
    <script src="https://releases.targomo.com/leaflet/latest-full.min.js"></script>
    <!--  Include micro progress bar  -->
    <script src="https://targomo.com/developers/scripts/mipb.min.js"></script>
    <style>
        body,
        html {
            margin: 0;
            width: 100%;
            height: 100%;
        }
        #map {
            width: 100%;
            height: 100%;

        }
        .button-group {
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 1000;
            box-shadow: 0 1px 5px rgba(0, 0, 0, .4);
            background-color: rgba(255, 255, 255, 1);
        }
        .button {
            font-family: sans-serif;
            text-transform: uppercase;
            color: #666;
            cursor: pointer;
            padding: 10px 10px 8px 10px;
            display: inline-block;
            font-size: 14px;
        }
        .button:hover {
            background-color: #EEE;
        }
        .button.active {
            color: #50B0B5;
        }
    </style>
</head>

<body>
    <!--  where the map will live  -->
    <div id="map"></div>
    <div id="selectionBar" class="button-group">
        <div id="btn-walk" onclick="setData('walk')" class="button">walk</div>
        <div id="btn-bike" onclick="setData('bike')" class="button active">bike</div>
        <div id="btn-car" onclick="setData('car')" class="button">car</div>
        <div id="btn-transit" onclick="setData('transit')" class="button">transit</div>
    </div>

    <script>
        // create targomo client
        const client = new tgm.TargomoClient('france', 'TKT7GDUDYYFW3BOCGQ8G336934266');
        // set the progress bar
        const pBar = new mipb({ fg: "#FF8319", style: { zIndex: 500 } });
        // define the basemap
        const tilesUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
        const tileLayer = L.tileLayer(tilesUrl, {
            tileSize: 512, zoomOffset: -1,
            minZoom: 1, crossOrigin: true
        });
        // Coordinates to center the map
        const center = [48.853, 2.333];

        var mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">OpenStreetMap - 24ème</a>'
        });
        var map = L.map('map', {
            center: [48.853, 2.333],
            zoom: 9,
            layers: mapboxTiles
        });

        // set the attribution
        const attributionText = `__targomo_attribution__`
        map.attributionControl.addAttribution(attributionText);

        // polygons time rings
        const travelTimes = [300, 900, 1800];

        // define the starting point
        const sources = [{ id: 0, lat: center[0], lng: center[1] }];

        // Add markers for the sources on the map.
        sources.forEach(source => {
            L.marker([source.lat, source.lng]).addTo(map)
        });

        // define the polygon overlay
        const polygonOverlayLayer = new tgm.leaflet.TgmLeafletPolygonOverlay({ strokeWidth: 20 });
        polygonOverlayLayer.addTo(map);

        async function setData(mode) {
            // show progress bar
            pBar.show();
            const selector = `btn-${mode}`;
            document.getElementsByClassName('active')[0].classList.remove('active');
            document.getElementById(selector).classList.add('active');

            // you need to define some options for the polygon service
            const options = {
                travelType: mode,
                travelEdgeWeights: travelTimes,
                maxEdgeWeight: 1800,
                edgeWeight: 'time',
                transitMaxTransfers: mode === 'transit' ? 5 : null,
                serializer: 'json'
            };

            // get the polygons
            const polygons = await client.polygons.fetch(sources, options);
            // add polygons to overlay
            polygonOverlayLayer.setData(polygons);
            // hide progress bar
            pBar.hide();
            // calculate bounding box for polygons
            const bounds = polygons.getMaxBounds();
            // zoom to the polygon bounds
            map.fitBounds(new L.latLngBounds(bounds.northEast, bounds.southWest));
        }

        setData('bike');
    </script>
</body>

</html>
