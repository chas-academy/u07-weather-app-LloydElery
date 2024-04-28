import { useEffect, useState } from "react";
import { useUserLocationStore } from "../stores/useUserLocationStore";
import { useUnitStore } from "../stores/useUnitStore";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
  const [forecastHours, setForecastHours]: any = useState<any>(null);

  const getWeatherForecast = async () => {
    unitData;
    try {
      const APIKEY = import.meta.env.VITE_API_KEY_FORECAST;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${APIKEY}&units=${unitData}`;
      const response = await fetch(forecastUrl);
      const result = await response.json();
      const forecastByHour = result.list.slice(0, 6);
      setForecast(result);
      setForecastHours(forecastByHour);
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

  /* Formattes the 6 coming forecast */
  let date = "";
  let time = "";
  const timeFormatter = (date: any) => {
    const formatDateToTime = new Intl.DateTimeFormat("se", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const time = formatDateToTime.format(date);
    return time;
  };

  const data: any[] = [];
  for (let i = 0; i < forecastHours.length; i++) {
    const timestamp = forecastHours[i];
    const date = new Date((timestamp.dt + forecast.city.timezone) * 1000);
    const time = timeFormatter(date);

    const temp = Math.round(timestamp.main.temp);
    data.push({
      date: time,
      value: temp,
    });
  }

  const customTooltip = ({ active, payload, label }: any) => {
    if (active) {
      return (
        <div className="tooltip">
          <h4>{label}</h4>
          <p>
            {payload[0].value} {unitData === "metric" ? "°C" : "°F"}
          </p>
        </div>
      );
    }
  };

  return (
    <>
      <div className=" grid grid-cols-6 sm:grid-cols-6 absolute bottom-0 gap-2 p-2 w-full items-center">
        {forecastHours.map((element: any, index: any) => {
          const date = new Date((element.dt + forecast.city.timezone) * 1000);

          /* Day formatter */
          const formatDateToDay = new Intl.DateTimeFormat("en", {
            weekday: "short",
          });
          const day = formatDateToDay.format(date);

          /* Time formatter */
          const formatDateToTime = new Intl.DateTimeFormat("se", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const time = formatDateToTime.format(date);

          /* Current temp */
          const temp = Math.round(element.main.temp);

          /* Humidity */
          const humidity = element.main.humidity + "%";

          /* Wind direction */
          function getWindDirection(angle: any) {
            const directions = [
              "↓ N",
              "↙ NE",
              "← E",
              "↖ SE",
              "↑ S",
              "↗ SW",
              "→ W",
              "↘ NW",
            ];
            return directions[Math.round(angle / 45) % 8];
          }
          const windDirection = element.wind.deg;

          /* Wind speed */
          const windSpeed = Math.round(element.wind.speed) + "m/s";

          //TODO Add chart for wind
          //TODO Add chart for humidity

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
              <section className="chart w-full bottom-32 absolute">
                <div className=" border-black ">
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="color" x1={0} y1={0} x2={0} y2={1}>
                          <stop
                            offset="0%"
                            stopColor={temp < 0 ? "#8ad1f5" : "#f3d38a"}
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="75%"
                            stopColor={temp < 0 ? "#8ad1f5" : "#f3d38a"}
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        dataKey="value"
                        stroke={temp < 0 ? "#bac1c4" : "#6d5f60"}
                        fill="url(#color)"
                        type={"monotone"}
                      />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickFormatter={(str) => ""}
                      />
                      <YAxis
                        dataKey="value"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(number) =>
                          number + "°" && unitData == "metric"
                            ? number + "°C"
                            : number + "°F"
                        }
                        tick={{ fontSize: 12, fill: "black" }}
                      />
                      <Tooltip content={customTooltip} />
                      <CartesianGrid opacity={0.1} vertical={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TodaysHourlyForecast;
