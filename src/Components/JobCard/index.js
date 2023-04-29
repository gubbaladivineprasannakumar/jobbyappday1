import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li>
      <div className="job-card-item">
        <div className="company-logo-details">
          <img
            className="company-logo"
            alt="company logo"
            src={companyLogoUrl}
          />
          <div className="employ-and-rating">
            <h1 className="job-card-title">{title}</h1>
            <div className="rating-section">
              <AiFillStar color="yellow" size={20} />
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
          <h1 className="description-head">Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}
export default JobCard
