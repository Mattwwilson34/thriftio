import { countries } from '@/utils/form-dropdown-data/countries'

interface Props {
  country: string
  setCountry: (country: string) => void
  required?: boolean
}

function CountryInput({ country, setCountry, required }: Props) {
  return (
    <label htmlFor="country">
      Country
      <select id="country" onChange={(e) => setCountry(e.target.value)} required={required ? required : false}>
        <option value="select" selected disabled>select</option>
        {countries.map((country, i) => (
          <option key={i} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CountryInput
