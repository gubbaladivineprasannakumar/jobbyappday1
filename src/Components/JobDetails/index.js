import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobContainer from '../SimilarJobContainer'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noJobs: 'NOJOBS',
}

class JobDetails extends Component {
  state = {
    itemData: {},
    skillsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills,
        lifeDescription: data.job_details.life_at_company.description,
        lifeImageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        similarJobs: data.similar_jobs,
        title: data.job_details.title,
      }
      const skillsUpdatedData = updatedData.skills.map(eachSkill => ({
        skillName: eachSkill.name,
        skillImageUrl: eachSkill.image_url,
      }))
      this.setState({
        itemData: updatedData,
        skillsData: skillsUpdatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderApiFailureView = () => (
    <div className="api-failure-container">
      <img
        alt="failure view"
        className="failure-view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        onClick={this.getJobItemData}
        className="logout-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderApiSuccessView = () => {
    const {itemData, skillsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeDescription,
      lifeImageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
      similarJobs,
    } = itemData

    return (
      <div className="job-card-item-container">
        <div className="company-logo-details">
          <img
            className="company-logo"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="employ-and-rating">
            <h1 className="job-card-title">{title}</h1>
            <div className="rating-section">
              <AiFillStar color="#fbbf24" size={20} />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employ-package-box">
          <div className="location-employ-box">
            <div className="location-box">
              <IoLocationSharp />
              <p>{location}</p>
            </div>
            <div className="employ-box">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <div className="package-box">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div className="description-container">
          <div className="description-link-line">
            <h1 className="description-head">Description</h1>
            <a className="anchor-link" href={companyWebsiteUrl}>
              <p>Visit</p>
              <FiExternalLink color=" #6366f1" />
            </a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <div className="skills-container">
          <h1 className="skills-head">Skills</h1>
          <ul className="skills-list-container">
            {skillsData.map(eachSkill => (
              <Skills eachSkill={eachSkill} key={eachSkill.skillName} />
            ))}
          </ul>
        </div>
        <div className="life-container">
          <h1>Life at Company</h1>
          <div className="life-content-container">
            <div className="life-content">
              <p>{lifeDescription}</p>
            </div>
            <div>
              <img
                className="life-image"
                alt="life at company"
                src={lifeImageUrl}
              />
            </div>
          </div>
        </div>
        <div className="similar">
          <SimilarJobContainer similarJobObject={similarJobs} />
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderGetJobDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderApiSuccessView()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.noJobs:
        return this.noJobsView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderGetJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
