const map = L.map("map", { 
    preferCanvas: true,
    zoomControl: false,
    attributionControl: false
}).setView([41.5801, -71.4774], 10);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
}).addTo(map);

const canvasRenderer = L.canvas({ padding: 0.5 });
const mapElement = document.getElementById("map");

fetch("walls.geojson")
    .then(response => response.json())
    .then(data => {
        const layer = L.geoJSON(data, {
            renderer: canvasRenderer,
            interactive: false,
            style: {
                color: "#2563eb",
                weight: 1.5,
                opacity: 1
            }
        }).addTo(map);

        mapElement.style.visibility = "visible";
        map.invalidateSize();

        const isMobile = window.innerWidth < 768;
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

conditionsToggle.addEventListener('click', () => {
    conditionsPanel.classList.toggle('active');
    conditionsPanelToggle.classList.toggle('active');
});

conditionsPanelToggle.addEventListener('click', () => {
    conditionsPanel.classList.toggle('active');
    conditionsPanelToggle.classList.toggle('active');
});