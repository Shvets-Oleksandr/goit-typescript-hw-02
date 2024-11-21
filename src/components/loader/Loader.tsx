import { FC } from 'react';
import { DNA } from 'react-loader-spinner';

import css from './Loader.module.css';

interface LoaderProps {
  height?: string;
  width?: string;
}

const Loader: FC<LoaderProps> = ({ height = '80', width = '80' }) => {
  return (
    <DNA
      visible={true}
      height={height}
      width={width}
      ariaLabel="dna-loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
