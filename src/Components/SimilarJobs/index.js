import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {companyLogoUrl, title, rating, jobDescription} = similarJobDetails

  return (
    <li className="similar-item">
      <div className="similar-job-item">
        <div className="image-title-box">
          <img
            className="similar-logo"
            alt="similar job company logo"
            src={companyLogoUrl}
          />
          <div className="title-rating-box">
            <h1 className="similar-title">{title}</h1>
            <div className="rating-box">
              <AiFillStar />
              <p className="similar-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="description-box">
          <h1 className="similar-head">Description</h1>
          <p className="similar-para">{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
