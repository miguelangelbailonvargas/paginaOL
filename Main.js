window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [-667860.2772429928, 4493303.571987728],
            zoom: 11,
            maxZoom: 20,
            minZoom: 4,
            rotation: 0
        }),
        target: 'js-map'
    })


    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: "OSMStandard"
    })

    var view = map.getView();

    map.addLayer(openStreetMapStandard);

    var geolocation = new ol.Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
            enableHighAccuracy: true,
            maxAge: 2000,
        },
        projection: view.getProjection(),
    });


    var positionFeature = new ol.Feature();
    positionFeature.setStyle(
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({ color: 'black' }),
                stroke: new ol.style.Stroke({
                    color: [255, 0, 0], width: 2
                })
            })
        })
    );

    const activador = document.getElementById("track");

    let activaTrackeo;

    map.on('click', function (e) {
        console.log(e.coordinate);

        view.setCenter(e.coordinate);
    })


    activador.addEventListener("change", function () {

        if (activador.checked) {
            activaTrackeo = true;

            console.log("activado");

        } else {
            activaTrackeo = false;
            console.log("Desactivado");

        }

        geolocation.setTracking(activaTrackeo); // here the browser may ask for confirmation
        geolocation.on('change:position', function () {

            if(geolocation.getHeading() == null){
                console.log("Rotacion indefinida");
            }else{
                view.setRotation(geolocation.getHeading());
            }
            
            view.setCenter(geolocation.getPosition());
            view.setZoom(20);
            console.log(geolocation.getPosition());
        });

        geolocation.on('change:heading', function(){
            view.setRotation(geolocation.getHeading());
            console.log(geolocation.getHeading());
        })
    
        geolocation.on('error', function () {
            console.log("No se pudo localizar");
        })
    });


}

