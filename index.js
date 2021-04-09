import Map from "https://js.arcgis.com/4.18/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.18/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.18/@arcgis/core/layers/FeatureLayer.js";
import { greenPony, purplePony } from './icons.js';

const map = new Map({
  basemap: "dark-gray-vector"
  // basemap: "dark-gray-vector"
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-3.690504, 41.670161],
  zoom: 6
});

const hashtag = {
  type: "picture-marker",
  url: purplePony,
  width: 40,
  height: 40
};

var gasStationRenderer = {
  type: "simple",
  symbol: hashtag
};

const speakersLayer = new FeatureLayer({
  url: "https://services5.arcgis.com/hZQQbQb2B2y1Wd2F/ArcGIS/rest/services/SpeakersCodenoobsconf/FeatureServer/0",
  renderer: gasStationRenderer,
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

view.when(() => {
  document.querySelector('.esri-attribution__powered-by a').innerHTML = `<a href="https://developers.arcgis.com/" target="_blank">ESRI</a>`;
});
