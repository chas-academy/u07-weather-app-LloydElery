import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";

//TODO Make a lang hook to change information based on lang and location
//TODO Add images based on the time to display the suns position

type HourlyForecastProps = {
  date: string;
  temp: number;
  unitData: string;
  icon: string;
  condition: string;
  time: string;
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({
  date,
  temp,
  unitData,
  icon,
  condition,
  time,
}) => (
  /* Card Container */
  <div className="hourlyForecast w-full h-30">
    {/* Date/Month */}
    <div className="justify-center absolute top-5 ">
      <p>{date}</p>
    </div>
    {/* Temperature */}
    <div className="justify-center absolute bottom-0">
      <p>
        {temp}
        {unitData}
      </p>
    </div>
    {/* Image */}
    <div className=" justify-center absolute top-10 w-14">
      <img src={icon} alt={condition} />
    </div>
    {/* Time */}
    <div className=" justify-center absolute top-0 ">
      <p>{time}</p>
    </div>
  </div>
);

const TodaysHourlyForecast: React.FC = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);

  const unitData = useUnitStore((state: any) => state.unitData);
  const [forecast, setForecast]: any = useState<any>(null);
  const [hours, setHours]: any = useState<any>(null);

  const getWeatherForecast = async () => {
    unitData;
    try {
      const APIKEY = import.meta.env.VITE_API_KEY_FORECAST;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unitData}`;
      const response = await fetch(forecastUrl);
      const result = await response.json();
      const forecastByHour = result.list.slice(0, 6);
      setForecast(result);
      setHours(forecastByHour);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  useEffect(() => {
    getWeatherForecast();
  }, [userPosition, unitData]);

  if (!forecast) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className=" grid grid-cols-6 sm:grid-cols-6 absolute bottom-0 gap-2 p-2 w-full items-center">
        {hours.map((element: any, index: any) => {
          const date = new Date((element.dt + forecast.city.timezone) * 1000);

          // Formatting milleseconds to seconds based on the current timezone
          const dayFormatter = new Intl.DateTimeFormat("en", {
            weekday: "short",
          }); // ...formatter for day display
          const day = dayFormatter.format(date);

          const timeFormatter = new Intl.DateTimeFormat("se", {
            hour: "2-digit",
            minute: "2-digit",
          }); // ...formatter for hour display
          const time = timeFormatter.format(date);
          return (
            <>
              <HourlyForecast
                key={index}
                date={day}
                temp={Math.round(element.main.temp)}
                unitData={unitData === "metric" ? "°C" : "°F"}
                icon={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                condition={element.weather[0].main}
                time={time}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default TodaysHourlyForecast;
