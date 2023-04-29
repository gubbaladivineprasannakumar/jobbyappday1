import './index.css'

const TypeFilter = props => {
  const {typeDetails, onClickEmploymentId} = props
  const {label, employmentTypeId} = typeDetails
  const onClick = () => {
    onClickEmploymentId(employmentTypeId)
  }

  return (
    <li className="filter-item">
      <input
        onClick={onClick}
        type="checkbox"
        id={employmentTypeId}
        value={label}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}
export default TypeFilter
