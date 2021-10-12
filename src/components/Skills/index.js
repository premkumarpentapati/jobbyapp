import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {imageUrl, name} = eachSkill

  return (
    <li className="li-skills-container">
      <img src={imageUrl} className="skill-image" alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
