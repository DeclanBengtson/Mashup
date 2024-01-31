# Stock Market Analysis and Research Application

**Overview:**

This repository houses a university project focused on creating a unique web application for stock market analysis and research, integrating YouTube to enhance users' understanding of stock movements. The application provides real-time updates on stock markets, offers educational resources through YouTube, and presents relevant news articles explaining stock price movements and financial fundamentals.

**Architecture and Data Flow:**

The application utilizes Express Handlebars, a templating engine, to streamline interactions with APIs and HTML. Primarily server-side operations are handled through an Express Node.js web application, managing requests to external APIs and mapping response data. The initial webpage is served through the index page, enabling users to navigate to other pages and trigger API GET requests.

The file structure, routing, and views are organized within specific folders (routes, views, public) for clarity. Express Handlebars is employed for HTML and CSS, linked to a JavaScript file managing API requests.

**Resources:**

Three distinct API endpoints contribute to the application's functionality:

1. **Financial Modelling Prep API:**
   - [Gainers Endpoint](https://financialmodelingprep.com/api/v3/stock_market/gainers)
   - [Losers Endpoint](https://financialmodelingprep.com/api/v3/stock_market/losers)
   - [Nasdaq Constituent Endpoint](https://financialmodelingprep.com/api/v3/nasdaq_constituent)

   These endpoints populate three different pages. Gainers and losers highlight stocks with the highest and lowest percentage changes, respectively, while the Nasdaq constituent showcases top stocks on the Nasdaq exchange.

2. **YouTube API:**
   - [YouTube Videos Endpoint](https://www.googleapis.com/youtube/v3/videos)

   Linked to the Financial Modelling Prep API, this endpoint fetches YouTube videos relevant to the financial data input.

3. **News API:**
   - [Top Headlines Endpoint](https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY)

   Similar to the YouTube endpoint, this API receives data from the Financial Modelling Prep API, presenting relevant news articles on the page.

**Persistence Service:**

The application employs an S3 bucket for a page view counter. Functions within the application read and update the counter variable stored in the S3 bucket. The counter value is retrieved when the application starts and updated in S3 with each viewed page, ensuring the page view counter relies on the S3 bucket to store its value.

**Hosting and Docker Image:**

- [Amazon Web Services (AWS) EC2 Instance](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#Home):
  Utilized for hosting the application with the AWS Region set to Sydney (ap-southeast-2).

- [Docker Image Repository](https://hub.docker.com/repository/docker/dec03/mashup/general):
  A Docker image was created and stored in a private repository for deployment.

Explore the repository for detailed implementation, code structure, and deployment considerations.
