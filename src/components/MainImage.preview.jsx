import * as React from "react";

const MainImagePreview = (props) => {
  const { record, resource } = props;
  React.useEffect(() => {
    console.log(props);
  }, []);

  return (
    <a href={record.params.mainImage} alt="image" target="_blank">
      <img
        src={record.params.mainImage}
        width={200}
        style={{
          "margin-inline": "50%",
          transform: "translateX(-50%)",
          maxHeight: "400px",
        }}
      />
    </a>
  );
};

export default MainImagePreview;
