const map = L.map("map", { 
    preferCanvas: true,
    zoomControl: false,
    attributionControl: false
}).setView([41.5801, -71.4774], 10);

// const search = new GeoSearch.GeoSearchControl({
//   provider: new GeoSearch.OpenStreetMapProvider(),
//   style: 'bar'
// });

// map.addControl(search);

const roads = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
});

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19,
});

roads.addTo(map);

const baseMaps = {
    "Roads": roads,
    "Satellite": satellite
};

const layersControl = L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);

function updateLayersControlPosition() {
    const isMobile = window.innerWidth <= 800;
    map.removeControl(layersControl);
    layersControl.options.position = isMobile ? "bottomright" : "topright";
    layersControl.addTo(map);
}

updateLayersControlPosition();
window.addEventListener("resize", updateLayersControlPosition);

const miniMap = new L.Control.MiniMap(
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 11,
    }),
    {
        toggleDisplay: false,
        zoomLevelOffset: -4,
    }
).addTo(map);

const canvasRenderer = L.canvas({ padding: 0.5 });
const mapElement = document.getElementById("map");

fetch("walls.geojson")
    .then(response => response.json())
    .then(data => {
        const layer = L.geoJSON(data, {
            renderer: canvasRenderer,
            interactive: false,
            style: {
                color: "#dd0000",
                weight: 1.5,
                opacity: 1
            }
        }).addTo(map);

        mapElement.style.visibility = "visible";
        map.invalidateSize();

        const isMobile = window.innerWidth < 900;
        map.fitBounds(layer.getBounds(), {
            paddingTopLeft: isMobile ? [0, 0] : [300, 20] 
        });
    })
    
const toggleBtn = document.getElementById('panel-toggle');
const panel = document.querySelector('.info-panel');

toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
    
    if (panel.classList.contains('hidden')) {
        toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    } else {
        toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    }
});

const conditionsToggle = document.getElementById('use-conditions');
const conditionsPanel = document.getElementById('conditions-panel');
const conditionsPanelToggle = document.getElementById('conditions-panel-toggle');
const backdrop = document.getElementById('modal-backdrop');

function openModal() {
  conditionsPanel.classList.add('active');
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  conditionsPanel.classList.remove('active');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

conditionsToggle.addEventListener('click', openModal);
conditionsPanelToggle.addEventListener('click', closeModal);

backdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && conditionsPanel.classList.contains('active')) {
    closeModal();
  }
});