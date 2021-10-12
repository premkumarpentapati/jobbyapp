import './index.css'

const ProfileRoute = props => {
  const {profileList} = props

  const {profileImageUrl, name, shortBio} = profileList

  return (
    <div className="profile-card">
      <img
        src={profileImageUrl}
        className="profile-image-url"
        alt="profile avatar"
      />
      <h1 className="profile-name">{name}</h1>
      <p className="bio">{shortBio}</p>
    </div>
  )
}

export default ProfileRoute
