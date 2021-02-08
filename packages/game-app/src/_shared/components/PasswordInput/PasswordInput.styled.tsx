import styled from 'styled-components';
import Box from '../Box';
import React from 'react';
import Input from '../Input';

export const InputContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: column;
  ${Input} {
    margin-top: 5px;
  }
`;

export const LabelContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: row;
  justify-content: space-between;
  display: flex;
`;
