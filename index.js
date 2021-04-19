import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import VectorTileLayer from 'https://js.arcgis.com/4.18/@arcgis/core/layers/VectorTileLayer.js';
import { greenPony, purplePony } from './icons.js';
import esriConfig from 'https://js.arcgis.com/4.18/@arcgis/core/config.js'
import Basemap from 'https://js.arcgis.com/4.18/@arcgis/core/Basemap.js'
esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


var vectorTileLayer = new VectorTileLayer({
  portalItem: {
    id: 'cbbcb78eb4d94b62879e1384b67e0e08'
  }
});

const basemap = new Basemap({
  baseLayers: [ vectorTileLayer ]
});


const map = new Map({
  basemap: basemap
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-3.690504, 41.670161],
  zoom: 6
});

const hashtag = {
  type: "picture-marker",
  url: greenPony,
  width: 40,
  height: 40
};

var speakersRenderer = {
  type: "simple",
  symbol: hashtag
};

const speakersLayer = new FeatureLayer({
  url: "https://services5.arcgis.com/hZQQbQb2B2y1Wd2F/ArcGIS/rest/services/SpeakersCodenoobsconf/FeatureServer/0",
  renderer: speakersRenderer,
  popupTemplate: {
    title: "<b>{Nombre}</b>",
    content: [
      {
        type:"media",
        mediaInfos: [{
          value: {sourceURL: '{Foto}'}
        }]
      },{
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Twitter",
          label: "<i class='fab fa-twitter'></i>"
        }, {
          fieldName: "Título",
          label: "<i class='far fa-comment'></i>"
        },
      ]
    }]
  }
});

map.add(speakersLayer);
// map.addMany([speakersLayer]);

view.when(() => {
  document.querySelector('.esri-attribution__powered-by a').innerHTML = `<a href="https://developers.arcgis.com/" target="_blank">ESRI</a>`;
});

