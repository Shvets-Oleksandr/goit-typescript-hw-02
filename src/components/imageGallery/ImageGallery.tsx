import ImageCard from '../imageCard/ImageCard';

import css from './ImageGallery.module.css';

interface Image {
  id: string;
  alt_description?: string;
  urls: {
    small: string;
    full: string;
  };
}

interface ImageGalleryProps {
  imgs: Image[] | null;
  onImageClick: (img: Image) => void;
}

const ImageGallery = ({ imgs, onImageClick }: ImageGalleryProps) => {
  return (
    <section className={css.gellaryContainer}>
      <ul className={css.list}>
        {Array.isArray(imgs) &&
          imgs.map(img => {
            return (
              <li key={img.id} className={css.listItem}>
                <ImageCard img={img} onImageClick={onImageClick} />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default ImageGallery;
