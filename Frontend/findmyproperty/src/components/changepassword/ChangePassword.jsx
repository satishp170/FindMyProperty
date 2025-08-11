import { useState } from 'react';
import UserService from '../../service/UserService';
import './changePassword.css';

const ChangePasswordModal = ({ userId, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const payload = {
        oldPassword,
        newPassword
      };

      const response = await UserService.changePassword(userId, payload);
      setSuccess(response.message || 'Password changed successfully');
      setTimeout(onClose, 2000); // Auto-close after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div className="modal">
      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="Current Password"
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <button onClick={handleChangePassword}>Change</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ChangePasswordModal;