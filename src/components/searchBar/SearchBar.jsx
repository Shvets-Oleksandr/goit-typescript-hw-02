import css from './SearchBar.module.css';

import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchInput.value.trim();
    if (inputValue === '') {
      toast.error('Please enter search term!');
      return;
    }
    onSubmit(inputValue);
    event.target.reset();
  };
  return (
    <header className={css.searchBar}>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.formBtn} type="submit">
          <IoSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
