import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UserService from '../../service/UserService';
import './editProfilePage.css';

const EditProfilePage = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        contactNo: '',
        dob: '',
        address: {
            lineOne: '',
            lineTwo: '',
            city: '',
            state: '',
        },
    });

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const key = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {
        try {
            const result = await UserService.editUser(uid, formData);
            console.log("User updated:", result);
            alert("✅ Profile updated successfully!");
            navigate(`/profile/${uid}`);
        } catch (err) {
            alert(`❌ Failed to update profile: ${err.response?.data?.message || err.message}`);
        }
    };


    return (
        <section className="edit-profile-section">
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <form className="edit-form">
                    <div className="form-grid">
                        <label>
                            Name:
                            <input name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Username:
                            <input name="username" value={formData.username} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input name="email" value={formData.email} onChange={handleChange} readOnly />
                        </label>
                        <label>
                            Contact No:
                            <input name="contactNo" value={formData.contactNo} onChange={handleChange} />
                        </label>
                        <label>
                            Date of Birth:
                            <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
                        </label>
                    </div>

                    <fieldset>
                        <legend>Address</legend>
                        <div className="form-grid">
                            <label>
                                Line One:
                                <input name="address.lineOne" value={formData.address.lineOne} onChange={handleChange} />
                            </label>
                            <label>
                                Line Two:
                                <input name="address.lineTwo" value={formData.address.lineTwo} onChange={handleChange} />
                            </label>
                            <label>
                                City:
                                <input name="address.city" value={formData.address.city} onChange={handleChange} />
                            </label>
                            <label>
                                State:
                                <input name="address.state" value={formData.address.state} onChange={handleChange} />
                            </label>
                        </div>
                    </fieldset>

                    <button type="button" className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditProfilePage;