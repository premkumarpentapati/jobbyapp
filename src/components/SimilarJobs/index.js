import {GoLocation} from 'react-icons/go'
import {CgMail} from 'react-icons/cg'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsList} = props
  const {
    companyLogoUrls,
    employmentTypes,
    jobDescriptions,
    locations,
    ratings,
    titles,
  } = similarJobsList

  return (
    <li className="job-ul-list-container">
      <div className="logo-name-rating-container">
        <img
          src={companyLogoUrls}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="title-rating-container">
          <h1 className="job-title">{titles}</h1>
          <div className="rating-container">
            <AiFillStar className="star-logo" />
            <p className="rating">{ratings}</p>
          </div>
        </div>
      </div>
      <div className="description-container-similar">
        <p className="description-heading">Description</p>
        <p className="job-description">{jobDescriptions}</p>
      </div>
      <div className="location-type-package-container">
        <div className="location-type-container">
          <GoLocation className="location-icon" />
          <p className="location">{locations}</p>
          <CgMail className="location-icon" />
          <p className="location">{employmentTypes}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
