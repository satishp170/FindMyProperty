import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from 'lucide-react';
import './propertygallery.css';

export default function PropertyGallery({ images =[]}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
    if (images.length === 0) {
    return <div className="gallery-placeholder">No images to show</div>;
  }

  return (
    <div className="gallery-container">
      <div className="main-image-wrapper">
        <img src={images[currentIndex]} alt={`Property ${currentIndex + 1}`} className="main-image" />
        <div className="nav-arrows">
          <button onClick={goToPrevious} className="arrow-btn">
            <ChevronLeftIcon />
          </button>
          <button onClick={goToNext} className="arrow-btn">
            <ChevronRightIcon />
          </button>
        </div>
        <button onClick={() => setShowFullScreen(true)} className="fullscreen-btn">
          <ExpandIcon />
        </button>
        <div className="image-counter">{currentIndex + 1} / {images.length}</div>
      </div>

      <div className="thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      {showFullScreen && (
        <div className="fullscreen-modal">
          <button className="close-btn" onClick={() => setShowFullScreen(false)}>×</button>
          <div className="fullscreen-image">
            <img src={images[currentIndex]} alt={`Fullscreen ${currentIndex + 1}`} />
          </div>
          <div className="fullscreen-controls">
            <button onClick={goToPrevious}><ChevronLeftIcon /></button>
            <button onClick={goToNext}><ChevronRightIcon /></button>
          </div>
          <div className="fullscreen-counter">{currentIndex + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}

// PropertyGallery.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
