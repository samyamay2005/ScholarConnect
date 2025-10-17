const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeScholarships() {
  const { data } = await axios.get('https://www.buddy4study.com/scholarships');
  const $ = cheerio.load(data);
  const scholarships = [];

  $('.scholarship-card').each((i, el) => {
    scholarships.push({
      name: $(el).find('.title').text(),
      provider: $(el).find('.provider').text(),
      deadline: $(el).find('.deadline').text(),
      link: $(el).find('a').attr('href'),
    });
  });

  console.log(scholarships);
}
scrapeScholarships();