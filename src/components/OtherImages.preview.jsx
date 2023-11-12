import * as React from "react";
import { Label, Box, DropZone } from "@adminjs/design-system";

const OtherImagesPreview = (props) => {
  const { record, resource, where, onChange } = props;
  const [otherImagesArray, setOtherImagesArray] = React.useState(
    Object.keys(record.params)
      .filter((key) => key.startsWith("otherImages."))
      .map((key) => record.params[key])
  );

  return (
    <>
      {where && where !== "list" && (
        <Label
          style={{
            display: "block",
            color: "rgb(137, 138, 154)",
            marginBottom: "1rem",
            marginTop: "1rem",
            fontWeight: 300,
          }}
        >
          Other Images
          {console.log(where)}
        </Label>
      )}
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        {otherImagesArray.map((image) => (
          <div style={{ position: "relative" }}>
            {where !== "new" && where !== "list" && where !== "show" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  cursor: "pointer",
                  backgroundColor: "#eeeeee",
                  zIndex: 99,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={(e) => {
                  const newOtherImagesArray = otherImagesArray.filter(
                    (imageFromArray) => imageFromArray !== image
                  );

                  onChange("otherImages", newOtherImagesArray);

                  setOtherImagesArray(newOtherImagesArray);
                }}
              >
                x
              </div>
            )}
            <a key={image} href={image} alt="image" target="_blank">
              <img
                src={image}
                width={where === "list" ? 100 : 200}
                style={{
                  "margin-inline": "50%",
                  transform: "translateX(-50%)",
                  maxHeight: "400px",
                }}
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default OtherImagesPreview;
