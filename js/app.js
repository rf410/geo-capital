let mymap = L.map('map').setView([43, 0], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 2,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibGFsYW45NCIsImEiOiJjand0cjh1angyODNqNDRvNnlnYXBleG1mIn0.zBOzEUoJTNT2BagQJfcRBg'
}).addTo(mymap);

let layerGroup = L.layerGroup().addTo(mymap);

const resultado = document.getElementById('resultado');
mymap.on('click', (ev) => {
    // Creo el marcador y obtengo latitud y longitud
    const latitud = ev.latlng.lat;
    const longitud = ev.latlng.lng
    L.marker([latitud, longitud]).addTo(layerGroup);
    // Validacion
    if (validacion(latitud,longitud)){
        resultado.style.backgroundColor = 'green';
        resultado.textContent = `YEEEEEEEEEEY!!!! Le diste`;
    }else {
        resultado.style.backgroundColor = 'red';
        resultado.textContent = `Fallaste MUAHAHAH`;
    }
    setTimeout(limpiarMapa,2000);

});

validacion = (latClick, lngClick) => {
    // Recibe lat y lng del pais y los compara con la lat y la lng del puntero
    const resultado = puntero.equals([latClick, lngClick], 10);
    L.circle([puntero.lat, puntero.lng], { radius: 200000 }).addTo(layerGroup);
    return resultado;
};

let puntero;
generarPais = async () => {
    // Traigo los datos desde una api publica
    const api = await fetch('http://api.worldbank.org/v2/country?format=json&per_page=227');
    const datos = await api.json();
    // Se elije un pais aleatorio y se crea el puntero
    let numero = Math.round(Math.random() * (227 - 1) + 1);
    const pais = datos[1][numero];
    puntero = L.latLng(pais.latitude, pais.longitude);
    // Se le entrega el pais al usuario en pantalla
    document.getElementById("pais").textContent = pais.name;
    resultado.textContent = '';
};
generarPais();

limpiarMapa = () => {
    layerGroup.clearLayers();
    generarPais();
}
