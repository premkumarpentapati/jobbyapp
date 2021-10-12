import './index.css'

const SalaryRange = props => {
  const {eachSalary, onClickSalaryRange} = props
  const {salaryRangeId, label} = eachSalary

  const onClickSalaryInput = () => {
    onClickSalaryRange(salaryRangeId)
  }

  return (
    <li className="radial-container">
      <input
        className="salary-type-input"
        type="radio"
        name="salary"
        id={salaryRangeId}
        value={salaryRangeId}
        onClick={onClickSalaryInput}
      />
      <label className="salary-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
