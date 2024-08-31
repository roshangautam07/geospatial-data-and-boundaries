const fs = require('fs');
const xml2js = require('xml2js');
const turf = require('@turf/turf');

fs.readFile('files/testBoundery.kml', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    xml2js.parseString(data, (err, result) => {
        if (err) {
            console.error('Error parsing the KML:', err);
            return;
        }

        const polygonCoordinates = result.kml.Document[0].Placemark[0].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0];
        // console.log(polygonCoordinates)
        // Convert the coordinates to an array of [longitude, latitude]
        const coordinatesArray = polygonCoordinates.trim().split(/\s+/).map(coord => {
            const [lon, lat] = coord.split(',').map(Number);  // Ignore the altitude (3rd value)
            return [lon, lat];
        });
        console.log(coordinatesArray)
        // Create a turf polygon
        const polygon = turf.polygon([coordinatesArray]);
 
const yourLongitude = 0;// A longitude within the polygon's bounds
const yourLatitude = 0;// A latitude within the polygon's bounds
        const myLocation = turf.point([yourLongitude, yourLatitude]);

        // Check if your location is within the polygon
        const isWithin = turf.booleanPointInPolygon(myLocation, polygon);

        console.log('Is my location within the boundary?', isWithin);

    });
});
