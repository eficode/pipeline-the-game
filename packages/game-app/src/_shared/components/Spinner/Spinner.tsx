import React from 'react';
import { StyledSpinner } from './Spinner.styled';

type Props = {
  className?: string;
};

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <StyledSpinner className={className}>
      <div className="thumb"></div>
      <div className="placeholder"></div>
    </StyledSpinner>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
