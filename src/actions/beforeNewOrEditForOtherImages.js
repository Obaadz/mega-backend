import { v4 } from "uuid";
import fs from "fs";
import path from "path";

export default (req, ctx) => {
  if (req.method === "post") {
    const otherImages = Object.keys(req.payload)
      .filter((key) => key.startsWith("otherImages."))
      .map((key) => req.payload[key]);

    const otherImagesUploadArray = Object.keys(req.payload)
      .filter((key) => key.startsWith("otherImagesUpload."))
      .map((key) => req.payload[key]);

    otherImagesUploadArray.forEach((image) => {
      const imageNameWithType = `${v4()}-img.png`;
      const imagePath = `public/images/${imageNameWithType}`;
      const imageLink = `${process.env.DOMAIN}/images/${imageNameWithType}`;

      fs.promises.rename(image.path, imagePath);

      otherImages.push(imageLink);
    });

    req.payload.otherImages = otherImages;

    return req;
  }

  return req;
};
