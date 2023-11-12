import { v4 } from "uuid";
import fs from "fs";
import path from "path";

export default (req, ctx) => {
  if (req.method === "post") {
    const { mainImage, ...otherParams } = req.payload;
    if (!mainImage || typeof mainImage === "string") return req;

    const imageNameWithType = `${v4()}-img.png`;
    const imagePath = `public/images/${imageNameWithType}`;
    const imageLink = `${process.env.DOMAIN}/images/${imageNameWithType}`;

    fs.promises.rename(mainImage.path, imagePath);

    req.payload.mainImage = imageLink;

    return req;
  }

  return req;
};
