import {Component} from 'react'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class SimilarJobContainer extends Component {
  state = {
    similarList: [],
  }

  componentDidMount() {
    this.getSimilarList()
  }

  getSimilarList = () => {
    const {similarJobObject} = this.props
    const formattedData = similarJobObject.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({similarList: formattedData})
  }

  render() {
    const {similarList} = this.state
    console.log(similarList)
    return (
      <div className="similar-jobs-container">
        <h1>Similar Jobs</h1>
        <ul className="similar-list-container">
          {similarList.map(eachItem => (
            <SimilarJobs similarJobDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }
}
export default SimilarJobContainer
