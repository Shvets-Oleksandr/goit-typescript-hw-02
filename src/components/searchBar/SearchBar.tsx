import { FormEvent } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { IoSearch } from 'react-icons/io5';

import css from './SearchBar.module.css';

type SearchBarProps = {
  onSubmit: (inputValue: string) => Promise<void>
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const inputElement = form.elements.namedItem('searchInput') as HTMLInputElement;

    const inputValue = inputElement?.value.trim();
    if (inputValue === '') {
      toast.error('Please enter search term!');
      return;
    }
    onSubmit(inputValue);
    form.reset();
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
