import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import ListingCard from '../../components/listingcard/ListingCard';
import EditProfileModal from '../../components/EditProfile';
import ChangePasswordModal from '../../components/changepassword/ChangePassword';
import './profile.css';

const Profile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [liked, setLiked] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    UserService.getUser(uid)
      .then(setUser)
      .catch(err => console.error("Failed to load user profile:", err));
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.role === 'SELLER' || user.role === 'TRADER') {
      setListings(user.avlProps || []);
    }

    if (user.role === 'BUYER' || user.role === 'TRADER') {
      setLiked([]); // Replace with actual liked properties API
    }
  }, []);

  if (!user) return <p>Loading user...</p>;

  // console.log("ss user: " + user)
  // console.log("ss user: " + user.avlProps.length)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src="https://i.pravatar.cc/150?img=3" alt="User" />
        <div>
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>{user.email}</p>
          <span className="role-badge">{user.role}</span>
          <p>Contact: {user.contactNo}</p>
          <p>DOB: {user.dob}</p>
          <p>Address: {user.address.lineOne}, {user.address.lineTwo}, {user.address.city}, {user.address.state}</p>
          {(user.role === 'GUEST') && (
            <div className="actions">
              <Link to={`/${user.id}/buyplan`}>
                <button onClick={() => setShowEdit(true)}>Buy Plan</button>
              </Link>
            </div>
          )}
          <div className="actions">
            <Link to={`/user/${user.id}/edit`} state={{ user }}>
              <button>Edit Profile</button>
            </Link>
            <button onClick={() => setShowChangePass(true)}>Change Password</button>
          </div>
          {(user.role === 'SELLER' || user.role === 'TRADER') && (
            <div className="actions">
              <Link to={`/${user.id}/addproperty`}>
                <button onClick={() => setShowEdit(true)}>Add Property</button>
              </Link>
            </div>
          )}
        </div>
      </div>



      {(user.role === 'SELLER' || user.role === 'TRADER' || user.role === 'ADMIN') && (
        <div className="profile-section">
          <h3>Your Listed Properties</h3>
          {user.avlProps.length > 0 ? (
            user.avlProps.map((listing, index) => (
              <ListingCard key={index} listing={listing} />
            ))
          ) : (
            <p>No properties listed yet.</p>
          )}
        </div>
      )}

      {(user.role === 'BUYER' || user.role === 'TRADER') && (
        <div className="profile-section">
          <h3>Your Liked Properties</h3>
          {liked.length > 0 ? (
            liked.map((property, index) => (
              <ListingCard key={index} listing={property} />
            ))
          ) : (
            <p>No liked properties yet.</p>
          )}
        </div>
      )}

      {showEdit && <EditProfileModal user={user} onClose={() => setShowEdit(false)} />}
      {showChangePass && <ChangePasswordModal userId={user.id} onClose={() => setShowChangePass(false)} />}
    </div>
  );
};

export default Profile;