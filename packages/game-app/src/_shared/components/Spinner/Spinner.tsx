import React from 'react';
import { StyledSpinner } from './Spinner.styled';

type Props = {};

const Spinner: React.FC<Props> = ({}) => {
  return (
    <StyledSpinner>
      <div className="thumb"></div>
      <div className="placeholder"></div>
    </StyledSpinner>
  );
};

Spinner.displayName = 'Spinner';

export default Spinner;
