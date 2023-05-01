import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <ul className="nav-content">
        <Link to="/" className="nav-link">
          <li>
            <img
              className="website-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </li>
        </Link>
        <ul className="list-links">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>

        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
