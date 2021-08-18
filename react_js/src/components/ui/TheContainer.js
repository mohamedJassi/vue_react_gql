import "../../css/components/ui/container.css";

const TheContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="content">{children}</div>
    </div>
  );
};

export default TheContainer;
