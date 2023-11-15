const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "ap-southeast-2",
});

// Create an S3 client
const s3 = new AWS.S3();

// Specify the S3 bucket and object key
const bucketName = "declan-mashup";
const objectKey = "text.json";

// Initialize page view counter
let pageViewCount = 0;

async function createS3bucket() {
  try {
    await s3.createBucket( { Bucket: bucketName }).promise();
    console.log(`Created bucket: ${bucketName}`);
  } catch(err) {
    if (err.statusCode === 409) {
      console.log(`Bucket already exists: ${bucketName}`);
    } else {
      console.log(`Error creating bucket: ${err}`);
    }
  }
}

// Upload the data to S3
async function uploadToS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
    Body: (pageViewCount + 1).toString(), 
    ContentType: "text/plain", // Set content type
  };

  try {
    await s3.putObject(params).promise();
    console.log("JSON file uploaded successfully.");
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

// Retrieve the object from S3
async function getObjectFromS3() {
  const params = {
    Bucket: bucketName,
    Key: objectKey,
  };

  try {
    const data = await s3.getObject(params).promise();
    // Parse JSON content
    pageViewCount = parseInt(data.Body.toString("utf-8")) || 0;
  } catch (err) {
    console.error("Error:", err);
  }
}

// Call the upload and get functions
(async () => {
  await createS3bucket();
  await uploadToS3();
  await getObjectFromS3();
})();

async function incrementPageViewCount() {
  pageViewCount++;
  // Update the counter in S3
  await uploadToS3();
}

function getPageViewCount() {
  return pageViewCount;
}

module.exports = {
  incrementPageViewCount,
  getPageViewCount,
};