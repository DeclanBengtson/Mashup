var express = require('express');
var router = express.Router();
const { incrementPageViewCount, getPageViewCount, } = require('../counter');


// Define a route that renders the index.hbs template
router.get("/", async function (req, res) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const FINANACE_API_KEY = process.env.FINANACE_API_KEY;
    // Update the counter in S3

    await incrementPageViewCount();

    // Increment page view counter on each request
    const pageViewCount = getPageViewCount();
    console.log(pageViewCount);
    console.log(FINANACE_API_KEY);

  
  
    //fetch the financial modelling prep API response
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FINANACE_API_KEY}`
    );
    const data = await response.json();
    const data_finance = data;
    console.log(data);

  
    const Data = [];
    
    for (let i = 0; i < 5; i++) {
      const symbol = data_finance[i].symbol;
      const name = data_finance[i].name;
      const sector = data_finance[i].sector;
      Data.push({ symbol, name, sector});
    }  
  
    const search = data[0].name;
    
    //fetch the News API response
    const Nresponse = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&from=2023-09-03&sortBy=popularity&apiKey=${NEWS_API_KEY}`
    );
    const data_NEWS = await Nresponse.json();
    const News = data_NEWS.articles;
    
  
    for (let i = 0; i < 3; i++) {
      const author = News[i].author;
      const title = News[i].title;
      const url = News[i].url;
      console.log(url);
      Data.push({ author, title, url});
    }  
    // Send the page view count as well
    res.render("index", { Data: Data, pageViewCount});
  });
  
  module.exports = router;
  