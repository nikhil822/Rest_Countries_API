import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Filter from "./Filter"

const url = "https://restcountries.com/v3.1/all";

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(url)
      const countries = await response.json()
      setCountries(countries)
      setIsLoading(false)
    }

    fetchCountries()
  }, [])

  // const removeCountry = (numericCode) => {
  //   const newCountry = countries.filter(
  //     (country) => country.numericCode !== numericCode
  //   )
  //   setCountries(newCountry)
  // }

  return (
    <>
      <Filter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFiltered={setFiltered}
        setCountries={setCountries}
        countries={countries}
      />
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : /* Checking to see if the search input is greater than 1. If it is, it will return the
      filtered countries. If it is not, it will return all the countries. */
      searchInput.length > 1 ? (
        <section className="countries">
          {filtered.map((country) => {
            const { flag, name, flags, population, region, capital } =
              country

            return (
              <Link to={`/countries/${name.common}`} key={flag}>
                <article>
                  <div className="flag">
                    <img src={flags.png} alt={name} />
                  </div>
                  <div className="details">
                    <h4 className="country-name">
                      Name: <span>{name.common}</span>
                    </h4>
                    <h4>
                      Population: <span>{population.toLocaleString()}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                  </div>
                </article>
              </Link>
            )
          })}
        </section>
      ) : (
        <section className="countries">
          {Array.from(countries).map((country) => {
            const { flag, name, flags, population, region, capital } = country;

            return (
              <Link to={`/countries/${name.common}`} key={flag}>
                <article>
                  <div className="flag">
                    <img src={flags.png} alt={name} />
                  </div>
                  <div className="details">
                    <h4 className="country-name">
                      Name: <span>{name.common}</span>
                    </h4>
                    <h4>
                      Population: <span>{population.toLocaleString()}</span>
                    </h4>
                    <h4>
                      Region: <span>{region}</span>
                    </h4>
                    <h4>
                      Capital: <span>{capital}</span>
                    </h4>
                  </div>
                </article>
              </Link>
            )
          })}
        </section>
      )}
    </>
  )
}

export default Countries
