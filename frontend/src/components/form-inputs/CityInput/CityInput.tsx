interface Props {
  city: string;
  setCity: (city: string) => void;
  required?: boolean;
}
function CityInput({ city, setCity, required }: Props) {
  return (
      <label htmlFor="city">
        City
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required={required ? required : false}
        ></input>
      </label>
  );
}

export default CityInput;
