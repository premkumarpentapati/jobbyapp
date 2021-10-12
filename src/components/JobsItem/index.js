import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {CgMail} from 'react-icons/cg'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobsItem = props => {
  const {jobList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobList

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-ul-list-container">
        <div className="logo-name-rating-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-logo" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <GoLocation className="location-icon" />
            <p className="location">{location}</p>
            <CgMail className="location-icon" />
            <p className="location">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsItem
