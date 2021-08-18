import "../../css/components/ui/title.css";

const TheTitle = ({ children }) => {
  return (
    <div className="title">
      <h2>{children}</h2>
      <hr />
    </div>
  );
};

export default TheTitle;
