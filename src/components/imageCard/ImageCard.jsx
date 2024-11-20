import css from './ImageCard.module.css';

const ImageCard = ({ img, onImageClick }) => {
  return (
    <div className={css.galleryCard}>
      <img
        onClick={() => onImageClick(img)}
        src={img.urls.small}
        alt={img.alt_description}
        width={346}
        height={180}
      />
    </div>
  );
};

export default ImageCard;
