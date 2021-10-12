import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="nav-container">
      <Link to="/" className="link-home">
        <li className="li-header-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-logo"
            alt="website logo"
          />
        </li>
      </Link>
      <li className="li-header-logo">
        <div className="options-container">
          <Link className="link" to="/">
            <p className="home-nav">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p className="home-nav">Jobs</p>
          </Link>
        </div>
      </li>
      <li className="li-header-logo">
        <button className="logout-btn" onClick={onClickLogout} type="button">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
