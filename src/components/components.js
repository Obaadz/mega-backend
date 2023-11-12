import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  ImagePreview: componentLoader.add("ImagePreview", "./Image.preview"),
  MainImagePreview: componentLoader.add("MainImagePreview", "./MainImage.preview"),
  OtherImagesPreview: componentLoader.add("OtherImagesPreview", "./OtherImages.preview"),
  ImageEdit: componentLoader.add("ImageEdit", "./Image.edit"),
  MainImageEdit: componentLoader.add("MainImageEdit", "./MainImage.edit"),
  OtherImagesEdit: componentLoader.add("OtherImagesEdit", "./OtherImages.edit"),
  ContentEdit: componentLoader.add("ContentEdit", "./Content.edit"),
};

export { componentLoader, Components };
