import { useState } from 'react';
import UserService from '../../service/UserService';
import './changeimage.css';

const ChangeImage = ({ userId, onClose, onUpdated }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Optional: Validate image size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2MB");
            return;
        }

        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedImage) return;
        setLoading(true);
        try {
            await UserService.changeImage(userId, selectedImage);
            await onUpdated(); // refresh parent
            onClose();
        } catch (err) {
            console.error("Failed to update image:", err);
        } finally {
            setLoading(false);
        }
    };

    const resetSelection = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        const input = document.getElementById('imageInput');
        if (input) input.value = null;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Change Profile Picture</h3>

                {!selectedImage && (
                    <button aria-label="Upload Image" onClick={() => document.getElementById('imageInput').click()}>
                        Upload Image
                    </button>
                )}

                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {previewUrl && (
                    <div className="preview-section">
                        <img src={previewUrl} alt="Selected profile preview" className="preview-image" />
                        <div className="action-buttons">
                            <button onClick={handleUpload} disabled={loading}>
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <button onClick={resetSelection}>Change</button>
                        </div>
                    </div>
                )}

                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ChangeImage;