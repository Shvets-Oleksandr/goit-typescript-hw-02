import ImageCard from '../imageCard/ImageCard';

import css from './ImageGallery.module.css';

const ImageGallery = ({ imgs, onImageClick }) => {
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
