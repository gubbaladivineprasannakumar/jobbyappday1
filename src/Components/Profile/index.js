import {Component} from 'react'

import './index.css'

class Profile extends Component {
  state = {
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/profile')
    const data = await response.json()
    console.log(data)
    this.setState({profileDetails: data})
  }

  render() {
    const {profileDetails} = this.state
    console.log(profileDetails)
    return <h1>dfghjk</h1>
  }
}
export default Profile
