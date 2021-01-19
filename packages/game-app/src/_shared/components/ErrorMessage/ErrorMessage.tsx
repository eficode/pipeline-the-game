import React from 'react';

type Props = {
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <span className="error-message">{message}</span>;
};

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
