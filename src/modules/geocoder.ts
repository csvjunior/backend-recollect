import { Client } from "@googlemaps/google-maps-services-js";
import MESSAGE from "../constants/messages";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client();

const getLocation = async (address: string) => {
  return client
    .geocode({
      params: {
        address,
        key: process.env.API_KEY || "KEY_NOT_FOUND",
      },
    })
    .then((response) => {
      return response.data.results[0].geometry.location;
    })
    .catch((error) => {
      console.log(MESSAGE.ERROR.GEOCODE_FAILURE + error);
    });
};

export default getLocation;
