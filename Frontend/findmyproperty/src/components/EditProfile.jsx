
const EditProfile = ({ onClose }) => {
  return (
    <div className="modal">
      <h3>Edit Profile</h3>
      <input type="text" placeholder="Full Name" />
      <input type="text" placeholder="Email" />
      <button onClick={() => alert('Profile updated!')}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditProfile;
