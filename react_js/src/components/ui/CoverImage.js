import "../../css/components/ui/cover-img.css";

const CoverImage = ({ title, img }) => {
  return (
    <div
      className="cover-img"
      style={{
        backgroundImage: "url(" + img + ")",
      }}
    >
      <div className="wrap">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

export default CoverImage;
