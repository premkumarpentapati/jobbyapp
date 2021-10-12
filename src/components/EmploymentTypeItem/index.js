import './index.css'

const EmploymentItem = props => {
  const {eachList, onClickEmploymentType} = props
  const {label, employmentTypeId} = eachList

  const onClickEmploymentInput = () => {
    onClickEmploymentType(employmentTypeId)
  }

  return (
    <li className="checkbox-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        className="checkbox"
        onClick={onClickEmploymentInput}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentItem
