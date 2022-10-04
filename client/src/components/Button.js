import Style from "./button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        text === "Zatvori" || text === "Obriši" ? Style.deleteBtn : Style.btn
      }
    >
      {text}
    </button>
  );
};

export default Button;
