import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {
    profileDetails: {},
    apiStatus: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: true,
      })
    }
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        onClick={this.getProfileDetails}
        className="retry-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-container">
        <img
          className="profile-image"
          alt="profile"
          src={profileDetails.profileImageUrl}
        />
        <h1 className="profile-head">{profileDetails.name}</h1>
        <p className="profile-para">{profileDetails.shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        {apiStatus
          ? this.renderProfileSuccessView()
          : this.renderProfileFailureView()}
      </>
    )
  }
}
export default Profile
