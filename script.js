
var map = L.map('map', {
        minZoom: 1,
        maxZoom: 6
    });

map.setView([37, -96], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/data-maps/cjpcy434i397r2so8007sbne9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF0YS1tYXBzIiwiYSI6ImNqZWpmeXhoajNtb2Eyd3FldG93OGpxejgifQ.xzOcuUd0LChdzHktllsAHw', { 
}).addTo(map);

var client = new carto.Client({
  apiKey: 'f18cab8055a91a04b4b9953a1f0c8fec11fc547c',
  username: 'mappinghighlandny'
});

var source = new carto.source.SQL('SELECT * FROM eia_pipelines_dissolved_240');

var style = new carto.style.CartoCSS(`
 #eia_pipelines_dissolved_240{
  line-color: #0c2a2a;
  line-width: 1;
  line-opacity: 0.9;
}
`);
`);

// Add style to the data
var layer = new carto.layer.Layer(source, style);

// Add the data to the map as a layer
client.addLayer(layer);
client.getLeafletLayer().addTo(map);

var layerPicker = document.querySelector('.layer-picker');

layerPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var operator = e.target.value;
  
  if (operator === 'all') {
    // If the value is "all" then we show all of the features, unfiltered
    source.setQuery("SELECT * FROM eia_pipelines_dissolved_240");
  }
  else {
    // Else the value must be set to a life stage. Use it in an SQL query that will filter to that life stage.
    source.setQuery("SELECT * FROM eia_pipelines_dissolved_240 WHERE operator = '" + operator + "'");
  }
  
  console.log('Dropdown changed to "' + operator + '"');
});
