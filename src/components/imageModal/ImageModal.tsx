import ReactModal from 'react-modal';
import { FaHeart } from 'react-icons/fa';

import css from './ImageModal.module.css';

ReactModal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  alt: string;
  likes: number;
  autor: string;
  autorImg: string;
}

const ImageModal = ({
  isOpen,
  onRequestClose,
  imageUrl,
  alt,
  likes,
  autor,
  autorImg,
}:ImageModalProps) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={css.modal}
    overlayClassName={css.overlay}
  >
    <div>
      <img
        src={imageUrl}
        alt={alt}
        className={css.image}
        width={1280}
        height={670}
      />
      <div className={css.ImageModalInfo}>
        <div className={css.likes}>
          <FaHeart />
          {likes}
        </div>
        <div className={css.autorInfo}>
          <p>Autor: {autor}</p>
          <img
            className={css.autorImg}
            src={autorImg}
            alt="Autor profile foto"
            width={50}
            height={50}
          ></img>
        </div>
      </div>
    </div>
  </ReactModal>
);

export default ImageModal;
