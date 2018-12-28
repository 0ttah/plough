import { CardAPIObject } from "@open-artifact/api-types";
import axios from "axios";
import CDN from "./CDN";
// get set json
export async function getSetJSON(cdn: CDN): Promise<CardAPIObject> {
  console.log("Retrieving set " + cdn.setId, cdn.fullURL);
  return axios
    .get(cdn.fullURL, {
      transformResponse: (data: string) => JSON.parse(data),
    })
    .then((response) => response.data);
}
