// importing required libraries
import React, { useState } from "react";
import axios from "axios";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // declaring consts for later use
  const apiKey = "4a4fe1a82a77cc10f93fc16ba59fa5f9";
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=5&&units=metric&appid=${apiKey}`;

  // funtion to handle event using axios
  const searchLocation = (event) => {
    setLoading(true);
    setError(false);

    axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      }, setLocation(""))
      .catch((err) => {
        // eslint-disable-next-line eqeqeq
        if (err.response.status == "404") {
          alert(err.response.data.message);
          console.log(err);
        }
        setError(true);
      });
  };

  return (
    <div className="main">
      <div className="glass">
        <h1>Weather app</h1>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter a Location"
          type="text"
        />
        <button type="submit" onClick={() => searchLocation()}>
          Search
        </button>
        {loading === true && (
          <div>
            <h3>Current temperature in {data.name}</h3>
            <h1> {data.main ? data.main.temp.toFixed() + "°C" : null} </h1>
            <div className="flex">
              <p>
                &#128293; Temp max.:{" "}
                {data.main ? data.main.temp_max.toFixed() + "°C" : null}{" "}
              </p>
              <p>
                &#127784; Temp min.:{" "}
                {data.main ? data.main.temp_min.toFixed() + "°C" : null}{" "}
              </p>
            </div>
            <div className="flex">
              <p>
                &#127777; Pressure:{" "}
                {data.main ? data.main.pressure + "mb" : null}{" "}
              </p>
              <p>
                &#128167; Humidity:{" "}
                {data.main ? data.main.humidity + "%" : null}{" "}
              </p>
            </div>
            <div className="flex">
              {/* utilising new Date() to make Unix timestamps, human friendly */}
              <p>
                &#127749; Sunrise:{" "}
                {data.sys
                  ? new Date(data.sys.sunrise * 1000).toLocaleTimeString(
                      "en-GB"
                    ) + " AM"
                  : null}{" "}
              </p>
              <p>
                &#127751; Sunset:{" "}
                {data.sys
                  ? new Date(data.sys.sunset * 1000).toLocaleTimeString(
                      "en-GB"
                    ) + " PM"
                  : null}{" "}
              </p>
            </div>
          </div>
        )}

        {error === true && (
          <div style={{ color: `red` }}>
            <h3>&#10060; Please enter a valid location &#10060;</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
