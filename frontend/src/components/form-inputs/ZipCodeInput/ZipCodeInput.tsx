interface Props {
  zipCode: string
  setZipCode: (zipCode: string) => void
  required?: boolean
}
function ZipCodeInput({
  zipCode,
  setZipCode,
  required,
}: Props) {
  return (
    <label htmlFor="zipCode">
      Zip Code
      <input
        id="zipCode"
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required={required ? required : false}
      ></input>
    </label>
  )
}

export default ZipCodeInput
