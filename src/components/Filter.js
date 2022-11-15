import React from "react"

const Filter = ({
  searchInput,
  setSearchInput,
  setFiltered,
  setCountries,
  countries,
}) => {


  const regions = [
    {
      name: "Filter by region",
      desc: "All",
    },
    {
      name: "Africa",
      desc: "Africa",
    },
    {
      name: "Americas",
      desc: "Americas",
    },
    {
      name: "Asia",
      desc: "Asia",
    },
    {
      name: "Europe",
      desc: "Europe",
    },
    {
      name: "Oceania",
      desc: "Oceania",
    },
  ]

  // Prevent page reload when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Search countries
  /**
   * It takes a searchValue as an argument, sets the searchInput state to that value, and then filters
   * the countries array to only include countries that have a value that includes the searchValue
   *searchValue - the value of the input field
   */
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredCountries)
    } else {
      setFiltered(countries)
    }
  }

  // Filter by region

  // const filterRegions = async (region) => {
  //   const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
  //   const data = await res.json()
  //   setCountries(data)
  // }

  // useEffect(() => {
  //   filterRegions()
  //   // eslint-disable-next-line
  // }, [])

  return (
    <>
      <form className="form" id="form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Search Country"
          onChange={(e) => searchCountries(e.target.value)}
        />

        <div className="select">
          <select
            name="select"
            id="select"
            // onChange={(e) => filterRegions(e.target.value)}
            value={regions.name}
          >
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Americas">Americas</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
    </>
  )
}

export default Filter
