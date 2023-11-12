import * as React from "react";
import { Label, Box } from "@adminjs/design-system";

const ContentEdit = ({ record, property, onChange }) => {
  React.useEffect(() => {
    console.log(record.params.image);
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.innerText;
    onChange(property.name, newValue);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <Box>
        <Label>{property.label.charAt(0).toUpperCase() + property.label.slice(1)}</Label>
        <pre
          contentEditable="true"
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            minHeight: "100px",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
          onInput={handleChange}
        >
          {record.params[property.name]}
        </pre>
      </Box>
    </div>
  );
};

export default ContentEdit;
