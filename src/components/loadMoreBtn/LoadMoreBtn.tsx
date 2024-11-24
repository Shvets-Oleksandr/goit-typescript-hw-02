import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  handleClick: () => Promise<void>
}

const LoadMoreBtn = ({ handleClick }: LoadMoreBtnProps) => {
  return (
    <button onClick={handleClick} className={css.loadBtn} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
