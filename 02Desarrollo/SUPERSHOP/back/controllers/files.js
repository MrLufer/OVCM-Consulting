const aws = require("aws-sdk");

const S3_BUCKET = "ecommercefiles";

const credentials = {
  apiVersion: "2010-12-01",
  accessKeyId: "AKIA2NQJ5KRAG44PB5VT",
  secretAccessKey: "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",
};
aws.config.region = "us-east-2";

async function uploadFile(req, res) {
  const s3 = new aws.S3(credentials);
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const folder = "products";

  const s3Params = {
    Bucket: S3_BUCKET + "/" + folder,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`,
    };

    res.json({ success: true, data: { returnData } });
  });
}

module.exports = {
  uploadFile,
};
