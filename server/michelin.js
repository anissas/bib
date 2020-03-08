const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const links=[];
  const site = $('div.js-restaurant__list_item > a').each((i, element) => {
    const link = $(element).attr('href');
    links.push("https://guide.michelin.com"+link);
  });
  return links;
};

const parsenum = data => {
  const $ = cheerio.load(data);
  const elByPage = $('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status.box-placeholder > div.flex-fill.js-restaurant__stats > h1 > span').text().split('-');
  const el = parseInt(elByPage[1]);
  const numberRest = $('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status.box-placeholder > div.flex-fill.js-restaurant__stats > h1').text().split('\n');
  const n = numberRest[5].split(' ');
  const nRest = parseInt(n[33]);
  const nByPage = Math.round(nRest/el)+1;
  return nByPage;
};

module.exports.scrapeRestaurant = async url => {
  const tab_url=[];
  const response = await axios(url);
  const {data, status} = response;
  const nPage = parsenum(data);
  for (let i = 1; i <= nPage; i++){
    const response = await axios(url + i);
    const {data, status} = response;
    if (status >= 200 && status < 300) {    	
      tab_url.push(parse(data));
    }
  }
  return tab_url;
  console.error(status);
  return null;
};

const parseLink = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  var tel = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > span.flex-fill').text().replace('+33 ', '0');  
  var image=$('body > main > div.masthead.masthead__gallery.masthead__restaurant.js-masthead-gallery > div.masthead__gallery-wrapper.js-gallery-wrapper > div > div:nth-child(1) > noscript').text().replace('<img src="', '');
  image = image.replace('" alt="" />', '');
  var address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text();
  if(address.includes("Offre"))
  {
  	address = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(2)').text();
    tel = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(5) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > span.flex-fill').text().replace('+33 ', '0');
  }
  tel = tel.replace(/\s/g, '');
  return {name, address, tel, image};
};

const scrapeLinkRestaurant = async url => {
  	const response = await axios(url);
    const {data, status} = response;
    if (status >= 200 && status < 300) {
    	return (parseLink(data));
  	}
   	console.error(status);

  	return null;
};

module.exports.getData = async restaurants =>{
	tab = []
	console.log(tab.length);
	for(var rest of restaurants)
    	for(var url of rest){
    		na = await scrapeLinkRestaurant(url);
    		tab.push(na);    		 
    	}
    console.log(tab.length);
    WriteJsonFile(tab, 'infoBib.json');
}


function WriteJsonFile(array, filename) {
	var arrayToString = JSON.stringify(Object.assign([], array));
	fs.writeFileSync(filename, arrayToString);
	return arrayToString;
}

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
