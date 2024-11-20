import { useState } from 'react';
import { useEffect } from 'react';

import { axiosImg } from '../../services/api';

import SearchBar from '../searchBar/SearchBar';
import Loader from '../loader/Loader';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ImageGallery from '../imageGallery/ImageGallery';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import ImageModal from '../imageModal/ImageModal';

import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [imgs, setImgs] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;
    const fetchImg = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const { data } = await axiosImg(query, page);
        if (page !== 1) {
          setImgs(prevImgs => [...prevImgs, ...data.results]);
        } else {
          setImgs(data.results);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImg();
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && imgs && imgs.length > 0) {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  }, [imgs]);

  const onSubmit = async inputValue => {
    setQuery(inputValue);
    setPage(1);
    setImgs(null);
  };

  const handleClick = async () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {error && <ErrorMessage />}
      {imgs && imgs.length === 0 && !isLoading && (
        <p>No results found for &quot;{query}&quot;</p>
      )}
      <ImageGallery imgs={imgs} onImageClick={openModal} />
      {isLoading && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn handleClick={handleClick} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          likes={selectedImage.likes}
          autor={selectedImage.user.first_name}
          autorImg={selectedImage.user.profile_image.large}
        />
      )}
    </div>
  );
}

export default App;
