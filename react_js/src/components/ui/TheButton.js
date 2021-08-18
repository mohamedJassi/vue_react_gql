import "../../css/components/ui/button.css";

const TheButton = ({ children, click }) => {
  return (
    <button className="the-button" onClick={click}>
      {children}
    </button>
  );
};

export default TheButton;
