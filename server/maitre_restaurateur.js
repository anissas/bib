const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

const parse = data => {
  const $ = cheerio.load(data);
  var tab_maitre = []
  $('div.annuaire_single').each(function (index, element) {
    
    var name = $(element).find('a').text();
    name = name.replace(/\n|  /g,'');
    name = name.split(' (');
    var address = $(element).find('div.single_info3 > div:nth-child(2)').text();
    address = address.replace(/\n|  /g,'');
    var tel = $(element).find('div.single_info3 > div:nth-child(3)').text();
    tel = tel.replace(/\n| /g,'');
    tab_maitre.push(JSON.stringify({ name: name[0], address: address, tel: tel }, null, 2));

  });
  return tab_maitre;
};

module.exports.scrapeRestaurant = async (page) => {
  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/', querystring.stringify({
      page: `${page}`,
      sort: 'undefined',
      request_id: '65d735289ed77565f95d90c43afe5398'

    })
  );
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }
  console.error(status);

  return null;
};


module.exports.get = () => {
  return [];
};