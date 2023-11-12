import * as React from "react";
import { Label, Box, DropZone } from "@adminjs/design-system";
import MainImagePreview from "./MainImage.preview";

const MainImageEdit = ({ record, property, onChange, resource }) => {
  const [isDropZoneEmpty, setIsDropZoneEmpty] = React.useState(true);

  React.useEffect(() => {
    console.log(record.params.mainImage);
  }, []);

  const handleDropZoneChange = (files) => {
    console.log("change");
    onChange(property.name, files[0]);

    if (files[0]) setIsDropZoneEmpty(false);
    else setIsDropZoneEmpty(true);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Box>
        <Label>
          {property.isRequired ? "* " : ""}
          {property.label.charAt(0).toUpperCase() + property.label.slice(1)}
        </Label>
        <DropZone onChange={handleDropZoneChange} />
        {isDropZoneEmpty && record.params.mainImage && (
          <div style={{ marginTop: "1rem" }}>
            <MainImagePreview record={record} resource={resource} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default MainImageEdit;
