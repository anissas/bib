const michelin = require('./michelin');
const urlMichelin = 'https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/';
async function sandbox (searchLink) {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);

    const restaurant = await michelin.scrapeRestaurant(searchLink);
    na = await michelin.getData(restaurant);
    console.log('done');
    return restaurant;
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;

const restau = sandbox(urlMichelin);




