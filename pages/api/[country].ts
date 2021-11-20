import { VercelRequest, VercelResponse } from "@vercel/node";
import { parse } from "node-html-parser";
import fetch from "node-fetch";
export default async (request: VercelRequest, response: VercelResponse) => {
  const {country} = request.query;
  const res = await fetch(
      `https://www.worldometers.info/coronavirus/country/${country}/`
  );
  const html = await res.text();
  const domTree = parse(html);
  const el = domTree.querySelectorAll(".maincounter-number");
  response.json(
    JSON.stringify({
      Cases: getNumber(el[0].text),
      Deaths: getNumber(el[1].text),
      Recovered: getNumber(el[2].text),
      Active: getNumber(el[0].text) - getNumber(el[2].text) - getNumber(el[1].text),
    })
  );
};

const getNumber = (data: string) => {
  let number = "";
  for (let i = 0; i < data.length; i++) {
    number += isNumber(data[i]);
  }
  return parseInt(number);
};
const isNumber = (data: string) => (data < "0" || data > "9" ? "" : data);
