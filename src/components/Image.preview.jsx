import * as React from "react";

const ImagePreview = (props) => {
  const { record, resource } = props;
  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <a href={record.params.image} alt="image" target="_blank">
      <img
        src={record.params.image}
        width={resource?.name === "Testimonial" ? 400 : 100}
        style={{
          "margin-inline": "50%",
          transform: "translateX(-50%)",
          maxHeight: resource?.name === "Testimonial" ? "400px" : "200px",
        }}
      />
    </a>
  );
};

export default ImagePreview;
