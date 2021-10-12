import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import './index.css'
import ProfileRoute from '../ProfileRoute'
import JobsItem from '../JobsItem'
import SalaryRange from '../SalaryRange'
import EmploymentItem from '../EmploymentTypeItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class JobsRoute extends Component {
  state = {
    profileLoaderState: apiStatusConstants.initial,
    jobsLoaderState: apiStatusConstants.initial,
    profileList: {},
    jobsList: [],
    filterType: '',
    filterSalary: '',
    searchInput: '',
    checkedEmploymentTypesList: [
      {
        employmentTypeId: 'FULLTIME',
        isChecked: false,
      },
      {
        employmentTypeId: 'PARTTIME',
        isChecked: false,
      },
      {
        employmentTypeId: 'FREELANCE',
        isChecked: false,
      },
      {
        employmentTypeId: 'INTERNSHIP',
        isChecked: false,
      },
    ],
  }

  componentDidMount() {
    this.setState({
      profileLoaderState: apiStatusConstants.inProgress,
      jobsLoaderState: apiStatusConstants.inProgress,
    })
    this.getProfileInfo()
    this.getJobsInfo()
  }

  onClickProfileRetryBtn = () => {
    this.setState(
      {profileLoaderState: apiStatusConstants.inProgress},
      this.getProfileInfo,
    )
  }

  onClickSearchIcon = event => {
    event.preventDefault()
    this.setState(
      {jobsLoaderState: apiStatusConstants.inProgress},
      this.getJobsInfo,
    )
  }

  onClickJobsRetryBtn = () => {
    this.setState(
      {jobsLoaderState: apiStatusConstants.inProgress},
      this.getJobsInfo,
    )
  }

  getProfileInfo = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(url, options)
    const profileData = await profileResponse.json()
    if (profileResponse.ok) {
      const profileDetails = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }
      this.setState({
        profileLoaderState: apiStatusConstants.success,
        profileList: profileDetails,
      })
    } else {
      this.setState({profileLoaderState: apiStatusConstants.failure})
    }
  }

  getJobsInfo = async () => {
    const {filterType, filterSalary, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${filterType}&minimum_package=${filterSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(url, options)
    const jobsData = await jobsResponse.json()
    if (jobsResponse.ok === true) {
      const filteredData = jobsData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsLoaderState: apiStatusConstants.success,
        jobsList: filteredData,
      })
    } else {
      this.setState({jobsLoaderState: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickEmploymentType = id => {
    const {checkedEmploymentTypesList} = this.state
    const filteredCheckedList = checkedEmploymentTypesList.map(eachList => {
      if (eachList.employmentTypeId === id) {
        return {
          employmentTypeId: eachList.employmentTypeId,
          isChecked: !eachList.isChecked,
        }
      }
      return eachList
    })
    const filteredTypeList = []
    filteredCheckedList.filter(eachList => {
      if (eachList.isChecked === true) {
        return filteredTypeList.push(eachList.employmentTypeId)
      }
      return null
    })

    const joinedList = filteredTypeList.join()

    console.log(joinedList)
    this.setState(
      {
        jobsLoaderState: apiStatusConstants.inProgress,
        checkedEmploymentTypesList: filteredCheckedList,
        filterType: joinedList,
      },
      this.getJobsInfo,
    )
  }

  onClickSalaryRange = id => {
    this.setState(
      {filterSalary: id, jobsLoaderState: apiStatusConstants.inProgress},
      this.getJobsInfo,
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0b69ff" height="70" width="70" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileList} = this.state
    return <ProfileRoute profileList={profileList} />
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        className="profile-retry-button"
        type="button"
        onClick={this.onClickProfileRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {profileLoaderState} = this.state

    switch (profileLoaderState) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  noJobsView = () => (
    <div className="no-job-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.noJobsView()
    }
    return (
      <ul className="ul-jobs-container">
        {jobsList.map(eachJob => (
          <JobsItem jobList={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
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

  renderJobsDetails = () => {
    const {jobsLoaderState} = this.state

    switch (jobsLoaderState) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="left-container">
            <div className="profile-container">
              {this.renderProfileDetails()}
            </div>
            <hr className="hr-line" />
            <ul className="ul-job-rote">
              <li className="li-employment-type" key="employment type">
                <ul className="salary-type-container">
                  <h1 className="salary-heading">Type of Employment</h1>
                  {employmentTypesList.map(eachList => (
                    <EmploymentItem
                      eachList={eachList}
                      key={eachList.label}
                      onClickEmploymentType={this.onClickEmploymentType}
                    />
                  ))}
                  <hr className="hr-line" />
                </ul>
              </li>
              <li className="li-employment-type" key="salary range">
                <ul className="salary-type-container">
                  <h1 className="salary-heading">Salary Range</h1>
                  {salaryRangesList.map(eachSalary => (
                    <SalaryRange
                      eachSalary={eachSalary}
                      onClickSalaryRange={this.onClickSalaryRange}
                      key={eachSalary.salaryRangeId}
                    />
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="jobs-card-container">
            <form
              onSubmit={this.onClickSearchIcon}
              className="jobs-search-container"
            >
              <input
                className="search-input"
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
              />
              <button
                className="search-btn"
                type="submit"
                testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </form>
            {this.renderJobsDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
