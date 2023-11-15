var express = require('express');
var router = express.Router();

// Define a route that renders the gainers.hbs template

router.get("/", async function (req, res) {
  //API keys
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const FINANACE_API_KEY = process.env.FINANACE_API_KEY;

  //fetch the financial modelling prep API response
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${FINANACE_API_KEY}`
  );
  const data = await response.json();
  const Data = [];

  for (let i = 0; i < data.length; i++) {
    const symbol = data[i].symbol;
    const name = data[i].name;
    const change = data[i].change;
    const price = data[i].price;
    const changesPercentage = data[i].changesPercentage;
    Data.push({ symbol, name, change, change, price, changesPercentage});
  }  

  const search = data[1].name;

  //fetch the Youtube API response
  const rsp = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${YOUTUBE_API_KEY}&type=video&q=${search}`
  );
  const data_yt = await rsp.json();

  const videos = data_yt.items;

  for (let i = 0; i < data_yt.items.length; i++) {
    const Vtitle = videos[i].id.videoId;
    Data.push({ Vtitle});
  }

  //fetch the News API response
  const Nresponse = await fetch(
    `https://newsapi.org/v2/everything?q=${search}&from=2023-09-03&sortBy=popularity&apiKey=${NEWS_API_KEY}`
  );
  const data_NEWS = await Nresponse.json();
  console.log(data_NEWS);
  const News = data_NEWS.articles;

  for (let i = 0; i < data_NEWS.totalResults; i++) {
    const author = News[i].author;
    const title = News[i].title;
    const url = News[i].url;
    console.log(url);
    Data.push({ author,title,url});
  }  
  console.log(Data);



  res.render("gainers", { Data });
});

module.exports = router;
