var express = require('express');
var router = express.Router();

// Define a route that renders the index.hbs template

router.get("/", async function (req, res) {
  const FINANACE_API_KEY = "857a0bfeb685df77e7fdf9d93fa4cea5";
  const YOUTUBE_API_KEY = 'AIzaSyBu5YkuVc8VY1yXMHqoATtDL1yQ_megknM';
  const NEWS_API_KEY = "5a0ca8b1de7a49e2af4b2252fe5f27f7";

  //fetch the financial modelling prep API response
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FINANACE_API_KEY}`
  );
  const data = await response.json();
  const data_finance = data;

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
  console.log(data_NEWS);
  const News = data_NEWS.articles;
  const page_view_counter = 0;

  for (let i = 0; i < 3; i++) {
    const author = News[i].author;
    const title = News[i].title;
    const url = News[i].url;
    console.log(url);
    Data.push({ author, title, url});
  }  
  console.log(Data);
  res.render("index", { Data: Data, page_view_counter});
  console.log(page_view_counter);

});

module.exports = router;
