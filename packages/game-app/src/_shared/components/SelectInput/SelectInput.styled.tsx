import styled from 'styled-components';
import { color, ColorProps, variant } from 'styled-system';
import Box from '../Box';
import React from 'react';
import Typography from '../Typography';

export const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  &:focus {
    border: 1px solid ${props => props.theme.colors.activeAccent};
  }
`;

Select.displayName = 'Select';

export const SelectLoadingWrapper = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: row;
  width: 100%;
`;

SelectLoadingWrapper.displayName = 'SelectLoadingWrapper';

export const SelectContainer = styled(Box)<React.ComponentProps<typeof Box>>`
  flex-direction: column;

  ${Typography} + ${SelectLoadingWrapper} {
    margin-top: 5px;
  }
`;

SelectContainer.displayName = 'SelectContainer';
