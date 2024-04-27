import { useUnitStore } from "../stores/useUnitStore";

const ToggleUnitDataButton = () => {
  const { updateUnitValue, unitData }: any = useUnitStore();

  const handleClick = () => {
    updateUnitValue(unitData === "metric" ? "imperial" : "metric");
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick()}>
          {unitData === "metric" ? "°C" : "°F"}
          <span className=" text-gray-600">
            |{unitData === "imperial" ? "°C" : "°F"}
          </span>
        </button>
      </div>
    </>
  );
};

export default ToggleUnitDataButton;
