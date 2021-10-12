import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const HomeRoute = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-description-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link className="link" to="/jobs">
          <button className="find-jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default HomeRoute
