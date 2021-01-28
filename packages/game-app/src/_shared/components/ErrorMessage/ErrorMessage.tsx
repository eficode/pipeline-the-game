import React from 'react';
import Box from '../Box';

type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <Box as="span" color="red">
      {message}
    </Box>
  );
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
