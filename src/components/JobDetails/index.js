import {GoLocation} from 'react-icons/go'
import {CgMail} from 'react-icons/cg'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'

import Skills from '../Skills'

import './index.css'

const JobDetails = props => {
  const {jobDetails, similarJobsList} = props
  const convertedJobDetails = {
    companyLogoUrl: jobDetails.company_logo_url,
    employmentType: jobDetails.employment_type,
    companyWebsiteUrl: jobDetails.company_website_url,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills,
    lifeAtCompany: jobDetails.life_at_company,
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
  }
  const {
    companyLogoUrl,
    employmentType,
    companyWebsiteUrl,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
  } = convertedJobDetails

  const {title} = similarJobsList[0]

  const convertedSkills = skills.map(eachSkill => ({
    imageUrl: eachSkill.image_url,
    name: eachSkill.name,
  }))

  const convertedLifeAt = {
    lifeAtDescription: lifeAtCompany.description,
    lifeAtImageUrl: lifeAtCompany.image_url,
  }

  const {lifeAtDescription, lifeAtImageUrl} = convertedLifeAt

  return (
    <li className="job-ul-list-container">
      <ul className="job-ul-list-container">
        <li className="logo-name-rating-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="job details company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-logo" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </li>
        <li className="location-type-package-container">
          <div className="location-type-container">
            <GoLocation className="location-icon" />
            <p className="location">{location}</p>
            <CgMail className="location-icon" />
            <p className="location">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </li>
        <hr className="hr" />
        <li className="description-container">
          <div className="description-link-container">
            <h1 className="description-heading">Description</h1>
            <a
              className="link-to-company"
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              <p>Visit</p>
              <FiExternalLink />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
        </li>
        <li className="skills-container">
          <h1 className="description-heading">Skills</h1>
          <ul className="ul-skills-container">
            {convertedSkills.map(eachSkill => (
              <Skills eachSkill={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
        </li>
        <h1 className="description-heading">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="job-description-life">{lifeAtDescription}</p>
          <img
            src={lifeAtImageUrl}
            className="life-at-image"
            alt="life at company"
          />
        </div>
      </ul>
    </li>
  )
}

export default JobDetails
