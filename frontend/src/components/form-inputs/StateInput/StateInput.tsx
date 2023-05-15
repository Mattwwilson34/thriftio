import states from '@/utils/form-dropdown-data/us-states.json'

interface Props {
  state: string
  setState: (state: string) => void
  required?: boolean
}

function StateInput({ state, setState, required }: Props) {
  return (
    <label htmlFor="state">
      State
      <select id="state" onChange={(e) => setState(e.target.value)} required={required ? required : false}>
        <option value="select" selected disabled>select</option>
        {Object.keys(states).map((state, i) => (
          <option key={i} value={state}>
            {state}
          </option>
        ))}
      </select>
    </label>
  )
}

export default StateInput
