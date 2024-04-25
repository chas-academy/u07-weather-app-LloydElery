import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";

//FIXME Ändra så att unit = metric on render. Just nu är det standard

type HourlyForecastProps = {
  date: string;
  temp: number[];
  icon: string;
  condition: string;
  time: string;
};

const HourlyForecast: React.FC<any> = ({
  date,
  temp,
  unitData,
  icon,
  condition,
  time,
}) => (
  /* Card Container */
  <div className="weatherCards bg-blue-200  w-full h-30">
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
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );
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
      console.log(forecastByHour);
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
      <div className="grid grid-cols-3 sm:grid-cols-6 border border-2 gap-1 w-full items-center">
        {hours.map((element: any, index: any) => {
          const date = new Date((element.dt + forecast.city.timezone) * 1000);

          // Formatting milleseconds to seconds based on the current timezone
          const dayFormatter = new Intl.DateTimeFormat("en", {
            weekday: "short",
          }); // ...formatter for day display
          const day = dayFormatter.format(date);
          const dayByNumber = date.getDate(); // ...display date by number (1-31)
          const month = date.getMonth() + 1; // ...display month by calendar year

          const timeFormatter = new Intl.DateTimeFormat("en", {
            hour: "2-digit",
            minute: "2-digit",
          }); // ...formatter for hour display
          const time = timeFormatter.format(date);
          return (
            <>
              <HourlyForecast
                key={index}
                date={`${dayByNumber}/${month} | ${day}`}
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

/* setUnitToken(unitToken); */
/*     if (forecast === null) {
      setUserPosition({
        latitude: result.city.coord.lat
          ? result.city.coord.lat
          : userPosition.latitude,
        longitude: result.city.coord.lon
          ? result.city.coord.lon
          : userPosition.longitude,
      });
    }
  };

  useEffect(() => {
    getWeatherForecast();
  }, [userPosition, unitData]);

  return <></>; */
/* }; */
export default TodaysHourlyForecast;
