import multer from "multer";
import aws from "aws-sdk";

import multerS3 from "multer-s3";
import config from "src/config/configuration";
import { ENVV } from "src/types";

const spaces_endpoint = new aws.Endpoint(config.get(ENVV.S3_ENDPOINT));

const s3 = new aws.S3({
  endpoint: spaces_endpoint,
});
const uploader = multer({
  storage: multerS3({
    s3,
    bucket: config.get(ENVV.BUCKET_NAME),
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, {
        fieldname: file.fieldname,
      });
    },
    key: (req, file, cb) => {
      console.log({ file });
      cb(null, file.originalname);
    },
  }),
}).single("upload");

module.exports = { uploader, s3 };
