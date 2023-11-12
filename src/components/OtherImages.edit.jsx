import * as React from "react";
import { Label, Box, DropZone } from "@adminjs/design-system";
import OtherImagesPreview from "./OtherImages.preview";

const OtherImagesEdit = ({ record, property, onChange, resource, where }) => {
  const [isDropZoneEmpty, setIsDropZoneEmpty] = React.useState(true);

  const handleDropZoneChange = (files) => {
    onChange("otherImagesUpload", files);

    if (files[0]) setIsDropZoneEmpty(false);
    else setIsDropZoneEmpty(true);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Box>
        <Label>{property.label.charAt(0).toUpperCase() + property.label.slice(1)}</Label>
        <DropZone onChange={handleDropZoneChange} multiple={true} />
        {where !== "new" && (
          <div style={{ marginTop: "1rem" }}>
            <OtherImagesPreview
              record={record}
              resource={resource}
              onChange={onChange}
              where={where}
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default OtherImagesEdit;
