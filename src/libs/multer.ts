import multer from "multer";
import aws from "aws-sdk";

import multerS3 from "multer-s3";
import config from "../config/configuration";
import { ENVV } from "../types";
import { RequestHandler } from "express";

export enum FOLDERS {
  profile = "profile",
  users = "users",
}

class MulterService {
  spaces_endpoint = new aws.Endpoint(config.get(ENVV.S3_ENDPOINT));
  s3 = new aws.S3({
    endpoint: this.spaces_endpoint,
  });
  NAME_INPUT: string = "upload";
  
  constructor() {

    console.log(config.get(ENVV.BUCKET_NAME));

  }

  uploadSingle = (folder: FOLDERS): RequestHandler => {
    return multer({
      storage: multerS3({
        s3: this.s3,
        bucket: config.get(ENVV.BUCKET_NAME),
        contentType: multerS3.AUTO_CONTENT_TYPE,

        acl: "public-read",
        metadata: (req, file, cb) => {
          cb(null, {
            fieldname: file.fieldname,
          });
        },
        key: (req, file, cb) => {
          console.log("UPLOAD SINGLE",{file});
          cb(
            null,
            `${folder}/${Date.now().toString()}-${file.originalname.replace(
              /\s+/g,
              ""
            )}`
          );
        },
      }),
    }).single(this.NAME_INPUT);
  };
}

/* export const uploadArray = (folder:FOLDERS):RequestHandler=>{
  return multer({
    storage: multerS3({
      s3,
      bucket: config.get(ENVV.BUCKET_NAME),
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      metadata: (req, file, cb) => {
        cb(null, {
          fieldname: file.fieldname,
        });
      },
      key: (req, file, cb) => {
        cb(
          null,
          `${folder}/${Date.now().toString()}-${file.originalname.replace(
            /\s+/g,
            '',
          )}`,
        );
      },
    }),
  }).array(NAME_INPUT);
}
 */

export default MulterService;
