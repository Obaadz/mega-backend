import * as React from "react";
import { Label, Box, DropZone } from "@adminjs/design-system";
import ImagePreview from "./Image.preview";

const ImageEdit = ({ record, property, onChange, resource }) => {
  const [isDropZoneEmpty, setIsDropZoneEmpty] = React.useState(true);

  React.useEffect(() => {
    console.log(record.params.image);
  }, []);

  const handleDropZoneChange = (files) => {
    onChange(property.name, files[0]);

    if (files[0]) setIsDropZoneEmpty(false);
    else setIsDropZoneEmpty(true);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Box>
        <Label>{property.label.charAt(0).toUpperCase() + property.label.slice(1)}</Label>
        <DropZone onChange={handleDropZoneChange} />
        {isDropZoneEmpty && record.params.image && (
          <div style={{ marginTop: "1rem" }}>
            <ImagePreview record={record} resource={resource} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default ImageEdit;
