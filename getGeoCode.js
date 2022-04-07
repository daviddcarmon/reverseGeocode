import axios from "axios"; // used to make the call to google api
import fs from "fs"; // needed to write to our file
import dotenv from "dotenv"; // npm package used to store key so its no public, in .env file
const apiKey = dotenv.config().parsed.apiKey; // replace apiKey with the variable you created in you .env file

// googles geocode parameters are looking for the lat and long concatenated separated by a comma
let latLongs = [
  '44.0902195,-69.2359785',
  '34.182357,-118.370734',
  '39.7731572,-104.8485174',
  '35.1169469,-106.5771446',
  '42.1658416,-78.7431706',
  '39.866027,-105.0246248',
  '43.614293,-70.5253579',
  '42.499507,-78.9575266',
  '39.6959973,-105.0528647',
  '39.6791961,-104.9196305',
  '35.9867356,-96.1129644',
  '35.9444348,-96.0606897',
  '43.371974,-79.7611474',
  '36.114049,-95.9755353',
  '47.6926977,-114.1307583',
  '39.7721655,-104.9217749',
  '38.5567491,-90.3951995',
  '39.7083543,-104.8749473',
  '35.9890643,-96.0228868'  
];

// our function using axios that returns the formatted address
let runLatLong = async () => {
    await latLongs.map((geo) => {
    // creating a variable to be used in the axios call
      let geoCode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geo}&key=${apiKey}`;
      
      let addressCode = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    // make the request using axios to get formatted address; we added lat and lng to the address to match back to our request 
    axios.get(geoCode).then((res) => {
      let address =
        res.data.results[0].formatted_address +
        "," +
        res.data.results[0].geometry.location.lat +
        "," +
        res.data.results[0].geometry.location.lng+
        "," +
        geo;
      // create writeFile using fs.appendFileSync since we are not using async; we are writing to a .txt file; "\r\n" creates a new line after the data is added
      fs.appendFileSync("geologs.txt", address + "\r\n", (err) => {
        if (err) {
          throw err;
        }
        console.log("Saved!");
      });
    });
  });
};

// starting out function
runLatLong()