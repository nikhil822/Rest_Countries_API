import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "../country.css"

const Country = () => {
  const [country, setCountry] = useState([])
  const { name } = useParams()

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const country = await response.json()
      setCountry(country)
    }

    fetchCountryData()
  }, [name])

  return (
    <>
      <section className="country">
        <Link to="/" className="btn btn-light">
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {country.map((c) => {
          const {
            flag,
            name,
            population,
            region,
            capital,
            flags,
            subregion,
            tld,
            currencies,
            languages,
            borders,
          } = c;

          return (
            <article key={flag}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flags.png} alt={name.common} />
                </div>

                <div className="country-details">
                  <div>
                    <h2>{name.common}</h2>
                    <h5>
                      Native Name:
                      <span>{Object.values(name.nativeName)[0].common}</span>
                    </h5>
                    <h5>
                      Population: <span>{population.toLocaleString()}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{capital}</span>
                    </h5>
                  </div>

                  <div>
                    <h5>
                      Top Level Domain: <span>{tld}</span>
                    </h5>
                    <h5>
                      Currencies:{" "}
                      <span>{Object.values(currencies)[0].name}</span>
                    </h5>
                    <h5>
                      Languages: <span>{`${Object.values(languages)}, `}</span>
                    </h5>
                  </div>
                </div>
              </div>

              <div>
                {borders && <h3>Border Countries:</h3>}
                <div className="borders">
                  {borders && borders.map((border) => {
                    return (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  )
}

export default Country
