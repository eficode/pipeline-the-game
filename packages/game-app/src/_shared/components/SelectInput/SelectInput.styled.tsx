import styled from 'styled-components';
import Box from '../Box';
import React from 'react';

export const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #d7d2cb;

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

  ${SelectLoadingWrapper} {
    margin-top: 5px;
  }
`;

SelectContainer.displayName = 'SelectContainer';
