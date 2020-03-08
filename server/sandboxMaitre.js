/* eslint-disable no-console, no-process-exit */
const maitre = require('./maitre_restaurateur');
const fs = require('fs');
const nPage = 155;

async function sandbox(i) {
  try {
    const restaus= await maitre.scrapeRestaurant(i);
    console.log(restaus)
    fs.appendFileSync('infoMaitre.json', restaus);
    fs.appendFileSync('infoMaitre.json', ",");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

async function getData(){
  for (let i = 1; i<= nPage ; i++)
  {
     await sandbox(i);
  }
}

getData();


