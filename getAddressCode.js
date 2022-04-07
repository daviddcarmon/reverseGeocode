import axios from "axios"; // used to make the call to google api
import fs from "fs"; // needed to write to our file
import dotenv from "dotenv"; // npm package used to store key so its no public, in .env file
const apiKey = dotenv.config().parsed.apiKey; // replace apiKey with the variable you created in you .env file

// googles geocode parameters are looking for the address concatenated separated by a plus
let address = [
  { masterid: "10019", address: "2335+ROLL+DR,+San+Diego,+California" },
  { masterid: "10563", address: "4380+E+ALAMEDA+AVE,+Denver,+Colorado" },
  { masterid: "19351", address: "22685+RTE+66+N+,+Clinton,+Oklahoma" },
  {
    masterid: "12024",
    address: "16219+SE+12th+St,+Suite+104,+Vancouver,+Washington",
  },
  {
    masterid: "13391",
    address: "1543+NW+19TH+ST,+STE+A,+Lincoln+City,+Oregon",
  },
  { masterid: "14412", address: "2597+BOLKER+DR,+Port+Hueneme,+California" },
];

// our function using axios that returns the formatted address
let runAddress = async () => {
  await address.map((geo) => {
    // console.log(geo)
    // creating a variable to be used in the axios call
    let addressCode = `https://maps.googleapis.com/maps/api/geocode/json?address=${geo.address}&key=${apiKey}`;
    // make the request using axios to get formatted address; we added lat and lng to the address to match back to our request
    axios.get(addressCode).then((res) => {
      // console.log(res.data)
      let addressCode =
        res.data.results[0].formatted_address +
        "," +
        res.data.results[0].geometry.location.lat +
        "," +
        res.data.results[0].geometry.location.lng +
        "," +
        geo.masterid;
      // create writeFile using fs.appendFileSync since we are not using async; we are writing to a .txt file; "\r\n" creates a new line after the data is added
      fs.appendFileSync("addresslogs.txt", addressCode + "\r\n", (err) => {
        if (err) {
          throw err;
        }
        console.log("Saved!");
      });
    });
  });
};

// starting out function
runAddress();
