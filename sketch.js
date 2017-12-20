var latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,

    numeroAgg = -1,
    metriTOT = 0,
    metriPrec = 0,
    veli = 0,
    tempo = 0,

    watchOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    backUpPositionLat = [],
    backUpPositionLon = [],
    backUpPositionDist = [],
    backUpPositionTemp = [];


function preload(){}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  textSize(20);

  watchPosition(positionChanged)
}

function draw() {
  tempo ++

  background("#7bed55");
  textAlign(CENTER);
  textSize(20);

  text('latitude: ' + latitude, width / 2, 30);
  text('longitude: ' + longitude, width / 2, 30 * 2);
  text('accuracy: ' + accuracy, width / 2, 30 * 3);
  text('altitude: ' + altitude, width / 2, 30 * 4);
  text('altitude accuracy: ' + altitudeAccuracy, width / 2, 30 * 5);
  text('heading: ' + heading, width / 2, 30 * 6);
  text('speed: ' + speed, width / 2, 30 * 7);

  text('Aggiornamenti: ' + numeroAgg, width / 2, 30 * 9);
  text('Distanza Totale: ' + metriTOT, width / 2, 30 * 10);
  text('Distanza Precedente: ' + metriPrec, width / 2, 30 * 11);
  text('Tempo Trascorso: ' + Math.round((tempo/60)), width / 2, 30 * 12);
  text('Velocità: ' + veli, width / 2, 30 * 13);
}

function positionChanged(position){

  latitude = position.latitude;
  longitude = position.longitude;
  accuracy = position.accuracy;
  altitude = position.altitude;
  altitudeAccuracy = position.altitudeAccuracy;
  heading = position.heading;
  speed = position.speede;

  numeroAgg++

  backUpPositionLat.push(latitude);
  backUpPositionLon.push(longitude);

  metriPrec = calcGeoDistance(backUpPositionLat[numeroAgg],backUpPositionLon[numeroAgg],backUpPositionLat[numeroAgg-1],backUpPositionLon[numeroAgg-1],"km")

  metriPrec = (metriPrec*1000);

  metriPrec = Math.round(metriPrec*100)/100

  if (numeroAgg>0) {backUpPositionDist.push(metriPrec);}
  metriTOT = backUpPositionDist.sum();

  if (numeroAgg>0) {backUpPositionTemp.push((tempo)/60);}
  veli = metriPrec/(backUpPositionTemp[numeroAgg-1]-backUpPositionTemp[numeroAgg-2])

}

Array.prototype.sum = function() {

var total = 0;

for(var i = 0; i < this.length; i += 1) {

  total += this[i];

}

return total;

};
// }
