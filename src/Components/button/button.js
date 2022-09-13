import "./button.css";

const Button = ({ text, onClick }) => {
  return (
    <div className="containerButton" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default Button;
