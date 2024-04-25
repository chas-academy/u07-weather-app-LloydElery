import { useUnitStore } from "../stores/useUnitStore";

const ToggleUnitDataButton = () => {
  const { updateUnitValue, unitData }: any = useUnitStore();

  const handleClick = () => {
    updateUnitValue(unitData === "metric" ? "imperial" : "metric");
  };

  return (
    <>
      <div>
        <button
          className="primaryButton rounded-2xl w-11"
          onClick={() => handleClick()}
        >
          <span className="primaryButtonSpan rounded-2xl w-8 self-center flex flex-col items-center">
            {unitData === "metric" ? "°F" : "°C"}
          </span>
        </button>
      </div>
    </>
  );
};

export default ToggleUnitDataButton;
