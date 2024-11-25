import css from './ImageCard.module.css';

interface Image {
 id: string;
  alt_description?: string;
  urls: {
    small: string;
    regular: string;
  };
  likes: number;
  user: {
    first_name: string;
    profile_image: {
      large: string;
    };
  };
}

interface ImageCardProps {
  img: Image;
  onImageClick: (img: Image) => void;
}

const ImageCard = ({ img, onImageClick }: ImageCardProps) => {
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
