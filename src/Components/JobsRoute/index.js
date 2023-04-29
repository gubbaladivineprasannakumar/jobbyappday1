import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {Loader} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Profile from '../Profile'
import JobCard from '../JobCard'
import Header from '../Header'
import SalaryFilter from '../SalaryFilter'
import TypeFilter from '../TypeFilter'

import './index.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    activeSalaryOptionId: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    searchValue: '',
    filterEmployment: [],
    jobProfiles: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobProfiles()
  }

  onClickSalaryOptionId = id => {
    this.setState({activeSalaryOptionId: id}, this.getJobProfiles)
  }

  onClickEmploymentId = id => {
    this.setState(
      prevState => ({
        filterEmployment: [id, ...prevState.filterEmployment],
      }),
      this.getJobProfiles,
    )
  }

  keyFunction = event => {
    const {searchValue} = this.state
    if (event.keydown === 'Enter') {
      this.setState({searchInput: searchValue}, this.getJobProfiles)
    }
  }

  onClickSearchIcon = () => {
    const {searchValue} = this.state
    this.setState({searchInput: searchValue}, this.getJobProfiles)
  }

  onChangeSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  getJobProfiles = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeSalaryOptionId, searchInput, filterEmployment} = this.state
    const filterEmploymentDetails = filterEmployment.join(',')
    console.log(filterEmploymentDetails)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${filterEmploymentDetails}&minimum_package=${activeSalaryOptionId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobProfiles: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiSuccessView = () => {
    const {jobProfiles} = this.state
    return (
      <div className="jobs-container">
        <ul className="jobs-container">
          {jobProfiles.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
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
        onClick={this.getJobProfiles}
        className="logout-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderGetProducts = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderApiSuccessView()
      case apiStatusConstants.failure:
        return this.renderApiFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchValue, jobProfiles} = this.state
    console.log(jobProfiles)
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="filters-and-profile-container">
            <Profile />
            <hr className="line" />
            <ul className="employment-group">
              <h1 className="filter-head">Type of Employment</h1>
              {employmentTypesList.map(eachItem => (
                <TypeFilter
                  typeDetails={eachItem}
                  key={eachItem.employmentTypeId}
                  onClickEmploymentId={this.onClickEmploymentId}
                />
              ))}
            </ul>
            <hr className="line" />
            <ul className="employment-group">
              <h1 className="filter-head">Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <SalaryFilter
                  salaryDetails={eachItem}
                  key={eachItem.salaryRangeId}
                  onClickSalaryOptionId={this.onClickSalaryOptionId}
                />
              ))}
            </ul>
          </div>
          <div>
            <div className="search-container">
              <input
                className="search-input"
                type="search"
                value={searchValue}
                placeholder="Search"
                onClick={this.keyFunction}
                onChange={this.onChangeSearchInput}
              />
              <button
                onClick={this.onClickSearchIcon}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch size={25} className="search-icon" />
              </button>
            </div>
            {this.renderGetProducts()}
          </div>
        </div>
      </>
    )
  }
}
export default JobsRoute
