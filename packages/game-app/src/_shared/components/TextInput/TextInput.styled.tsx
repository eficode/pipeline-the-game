import styled from 'styled-components';
import Box from '../Box';
import React from 'react';
import Typography from '../Typography';
import Input from '../Input';

export const InputContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: column;

  ${Typography} + ${Input} {
    margin-top: 5px;
  }
`;

InputContainer.displayName = 'InputContainer';
