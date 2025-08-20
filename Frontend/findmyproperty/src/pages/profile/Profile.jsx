import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import ListingCard from '../../components/listingcard/ListingCard';
import EditProfileModal from '../../components/EditProfile';
import ChangePasswordModal from '../../components/changepassword/ChangePassword';
import SaveListService from '../../service/SaveListService';
import ChangeImage from '../../components/changeuserimage/ChangeImage';
import './profile.css';

const Profile = () => {
    const { uid } = useParams();
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [liked, setLiked] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showChangePass, setShowChangePass] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

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
            SaveListService.getSavedProperties(user.id)
                .then(setLiked)
                .catch(err => console.error("Failed to load liked properties:", err));
        }
    }, [user]);

    // const changeImage = async () => {
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = 'image/*';

    //     input.onchange = async (e) => {
    //         const file = e.target.files[0];
    //         if (!file) return;

    //         try {
    //             await UserService.changeImage(user.id, file);
    //             const updatedUser = await UserService.getUser(user.id);
    //             setUser(updatedUser);
    //         } catch (err) {
    //             console.error("Failed to update image:", err);
    //         }
    //     };

    //     input.click();
    // };

    if (!user) return <p>Loading user...</p>;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div>
                    <img src={user.imageUrl} alt="User" />
                    <div className="actions">
                        <button onClick={() => setShowImageModal(true)}>Change dp</button>
                    </div>
                </div>
                {showImageModal && (
                    <ChangeImage
                        userId={user.id}
                        onClose={() => setShowImageModal(false)}
                        onUpdated={async () => {
                            const updatedUser = await UserService.getUser(user.id);
                            setUser(updatedUser);
                        }}
                    />
                )}
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

            {(listings.length > 0) && (user.role === 'SELLER' || user.role === 'TRADER') && (
                <div className="profile-section">
                    <h3>Your Properties Are</h3>
                    <div className="properties-grid">
                        {listings.slice(0, 3).map((property) => (
                            <Link key={property.id} to={`/property/${property.id}`}>
                                <ListingCard property={property} />
                            </Link>
                        ))}
                        <Link
                            to={`/seller/${user.id}/properties`}
                            state={{ listings }}
                            className="view-all-card"
                        >
                            <div className="listing-card view-all">
                                <div className="listing-details">
                                    <h4>View All</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* {(liked.length > 0) && (user.role === 'BUYER' || user.role === 'TRADER') && (
                <div className="profile-section">
                    <h3>Your Properties Are</h3>
                    <div className="properties-grid">
                        {liked.slice(0, 3).map((property) => (
                            <Link key={property.id} to={`/property/${property.id}`}>
                                <ListingCard property={property} />
                            </Link>
                        ))}
                        <Link
                            to={`/user/${user.id}/savelist`}
                            state={{ liked }}
                            className="view-all-card"
                        >
                            <div className="listing-card view-all">
                                <div className="listing-details">
                                    <h4>View All</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )} */}

            {(liked.length > 0) && (user.role === 'BUYER' || user.role === 'TRADER') && (
                <div className="profile-section">
                    <h3>Your Liked Properties</h3>
                    <div className="properties-grid">
                        {liked.slice(0, 3).map((property) => (
                            <Link key={property.id} to={`/property/${property.id}`}>
                                <ListingCard property={property} />
                            </Link>
                        ))}
                        <Link
                            to={`/user/${user.id}/savelist`}
                            state={{ liked }}
                            className="view-all-card"
                        >
                            <div className="listing-card view-all">
                                <div className="listing-details">
                                    <h4>View All</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {showEdit && <EditProfileModal user={user} onClose={() => setShowEdit(false)} />}
            {showChangePass && <ChangePasswordModal userId={user.id} onClose={() => setShowChangePass(false)} />}
        </div>
    );
};

export default Profile;