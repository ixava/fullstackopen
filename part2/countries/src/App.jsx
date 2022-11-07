import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries([...res.data]);
      setIsLoaded(true);
    });
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);

  return (
    <div>
      <div>
        find countries <input onChange={handleSearchChange} value={search} />
      </div>
      {search !== "" && isLoaded && (
        <Countries
          countries={countries}
          search={search}
          setSearch={setSearch}
        />
      )}
    </div>
  );
}

const Countries = ({ countries, search, setSearch }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return "Too many matches, specify a more specific filter";
  }

  return filteredCountries.length === 1 ? (
    <Country country={filteredCountries[0]} />
  ) : (
    filteredCountries.map((country) => (
      <CountryName
        key={country.name.official}
        country={country}
        setSearch={setSearch}
      />
    ))
  );
};

const CountryName = ({ country, setSearch }) => (
  <span>
    {country.name.official}{" "}
    <button onClick={() => setSearch(country.name.official)}>show</button>
    <br />
  </span>
);

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.official}</h2>
      capital {country.capital} <br />
      area {country.area} <br />
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      {<img src={country.flags.png} alt="flag of country" />}
      <Weather country={country} />
    </div>
  );
};

const Weather = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [lat, lng] = country.capitalInfo.latlng;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((res) => {
        setWeatherInfo({ ...res.data });
        setIsLoaded(true);
      });
  }, [lat, lng]);

  return isLoaded ? (
    <div>
      <h3>Weather in {country.capital}</h3>
      temperature {weatherInfo.main.temp} Celcius
      <br />
      <img
        src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <br />
      wind {weatherInfo.wind.speed} m/s
    </div>
  ) : (
    <div></div>
  );
};
export default App;
