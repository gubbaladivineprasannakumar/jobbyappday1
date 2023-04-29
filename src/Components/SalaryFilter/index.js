import './index.css'

const SalaryFilter = props => {
  const {salaryDetails, onClickSalaryOptionId} = props
  const {label, salaryRangeId} = salaryDetails
  const optionId = () => {
    onClickSalaryOptionId(salaryRangeId)
  }

  return (
    <li className="filter-item">
      <input onClick={optionId} type="radio" id={salaryRangeId} name="salary" />
      <label className="label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}
export default SalaryFilter
