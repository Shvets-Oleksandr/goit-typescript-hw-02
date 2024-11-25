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
  
  interface ApiResponse {
  results: Image[];
  total_pages: number;
}
  
  const [query, setQuery] = useState < string > ('');
  const [imgs, setImgs] = useState<Image [] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<Image | null >(null);

  useEffect(() => {
    if (!query) return;
    const fetchImg = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const response = await axiosImg(query, page); 
        const data: ApiResponse = response.data;

        if (page !== 1) {
          setImgs(prevImgs => [...(prevImgs || []), ...data.results]);
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

  const onSubmit = async (inputValue: string): Promise<void> => {
    setQuery(inputValue);
    setPage(1);
    setImgs(null);
  };

  const handleClick = async (): Promise<void> => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (img: Image): void => {
    setSelectedImg(img);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImg(null);
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
      {selectedImg && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImg.urls.regular}
          alt={selectedImg.alt_description || 'Image'}
          likes={selectedImg.likes}
          autor={selectedImg.user.first_name}
          autorImg={selectedImg.user.profile_image.large}
        />
      )}
    </div>
  );
} 

export default App;
