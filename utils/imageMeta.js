'use strict';
const ExifImage = require('exif').ExifImage;

const getCoordinates = (imgFile) => { // imgFile = full path to uploaded image
  return new Promise((resolve, reject) => {
    try {
      // TODO: Use node-exif to get longitude and latitude from imgFile
      // coordinates below should be an array of GPS coordinates in decimal format: [longitude, latitude]
      new ExifImage({ image: imgFile }, (error, exifData) => {
          if (error) {
              reject(error);
          } else {
            console.log('exif data', exifData);
            try {
              const lon = gpsToDecimal(
                exifData.gps.GPSLongitude,
                exifData.gps.GPSLongitudeRef
              );
              const lat = gpsToDecimal(
                exifData.gps.GPSLatitude,
                exifData.gps.GPSLatitudeRef
              );
              const coordinates = [lon, lat];
              resolve(coordinates);
            } catch (error) {
              reject(error);
            }
          }
        });
      } catch (error) {
        reject(error);
      }
  });
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
  getCoordinates,
};