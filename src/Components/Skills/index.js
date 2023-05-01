import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {skillName, skillImageUrl} = eachSkill

  return (
    <li className="skill-item">
      <img className="skill-logo" alt={skillName} src={skillImageUrl} />
      <h1 className="skill-head">{skillName}</h1>
    </li>
  )
}
export default Skills
