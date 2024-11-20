import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className={css.loadBtn} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
