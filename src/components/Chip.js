import classNames from "classnames";

const Chip = ({ name, isSelected, disabled, onClick }) => {
  const enterKey = "Enter";
  const chipClasses = classNames("px-5 py-2 m-2 rounded-lg", {
    "border-blue-700 bg-blue-700 text-white": isSelected,
    "bg-gray-200": !isSelected,
  });
  const handleButtonKeyUp = (event) => {
    if (onClick && event.key === enterKey) {
      onClick();
    }
  };

  const textTruncation = (chipText) => {
    return chipText.length > 30
      ? `${chipText.substring(0, 30)}...`
      : `${chipText} `;
  };

  return (
    <button
      type="button"
      className={chipClasses}
      onClick={onClick}
      disabled={disabled}
      onKeyUp={handleButtonKeyUp}
      aria-label={name}
      aria-pressed={isSelected}
      title={name}
    >
      {textTruncation(name)}
    </button>
  );
};

export default Chip;
