import styled from 'styled-components';
import Box from '../Box';
import React from 'react';
import Typography from '../Typography';

export const IconDiv = styled.div`
  position: relative;
  width: 100%;

  & input + button {
    //TODO improve here
    position: absolute;
    right: 4px;
  }
`;

export const InputContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: column;

  ${Typography} + ${IconDiv} {
    margin-top: 5px;
  }
`;
