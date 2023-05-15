interface Props {
  zipCode: string
  setZipCode: (zipCode: string) => void
  required?: boolean
  handleBlur?: () => void
}
function ZipCodeInput({
  zipCode,
  setZipCode,
  required,
  handleBlur,
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
        onBlur={handleBlur ? handleBlur : () => {}}
      ></input>
    </label>
  )
}

export default ZipCodeInput
