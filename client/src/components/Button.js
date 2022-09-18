const Button = ({ text, onClick, cssStyle }) => {
  return (
    <button onClick={onClick} className={cssStyle}>
      {text}
    </button>
  );
};

export default Button;
