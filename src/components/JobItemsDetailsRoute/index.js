import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobDetails from '../JobDetails'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsView extends Component {
  state = {
    loaderView: apiStatusConstants.initial,
    jobDetailsList: {},
  }

  componentDidMount() {
    this.setState(
      {loaderView: apiStatusConstants.inProgress},
      this.getJobDetails,
    )
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.status === 200) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const convertedSimilarJobsList = similarJobs.map(eachObject => ({
        companyLogoUrls: eachObject.company_logo_url,
        employmentTypes: eachObject.employment_type,
        id: eachObject.id,
        jobDescriptions: eachObject.job_description,
        locations: eachObject.location,
        ratings: eachObject.rating,
        titles: eachObject.title,
      }))
      this.setState({
        loaderView: apiStatusConstants.success,
        jobDetailsList: jobDetails,
        similarJobsList: convertedSimilarJobsList,
      })
    } else {
      this.setState({loaderView: apiStatusConstants.failure})
    }
  }

  renderJobDetailsLoaderView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="70" width="70" />
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {jobDetailsList, similarJobsList} = this.state
    return (
      <div className="li">
        <ul className="job-details-container">
          <JobDetails
            jobDetails={jobDetailsList}
            similarJobsList={similarJobsList}
            key={jobDetailsList.id}
          />
        </ul>
        <div className="similar-head-container">
          <h1 className="similar-heading">Similar Jobs</h1>
        </div>
        <ul className="similar-jobs-ul-container">
          {similarJobsList.map(eachList => (
            <SimilarJobs similarJobsList={eachList} key={eachList.id} />
          ))}
        </ul>
      </div>
    )
  }

  onClickJobsRetryBtn = () => {
    this.setState(
      {loaderView: apiStatusConstants.inProgress},
      this.getJobDetails,
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="jobs-failure-msg-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="jobs-retry-btn"
        type="button"
        onClick={this.onClickJobsRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {loaderView} = this.state

    switch (loaderView) {
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoaderView()
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobDetailsView
