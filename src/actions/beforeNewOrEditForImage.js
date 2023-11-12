import { v4 } from "uuid";
import fs from "fs";
import path from "path";

export default (req, ctx) => {
  if (req.method === "post") {
    const { image, ...otherParams } = req.payload;
    if (!image || typeof image === "string") return req;

    const imageNameWithType = `${v4()}-img.png`;
    const imagePath = `public/images/${imageNameWithType}`;
    const imageLink = `${process.env.DOMAIN}/images/${imageNameWithType}`;

    fs.promises.rename(image.path, imagePath);

    req.payload.image = imageLink;

    return req;
  }

  return req;
};
