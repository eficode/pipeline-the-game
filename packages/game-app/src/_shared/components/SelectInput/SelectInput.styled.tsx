import styled from 'styled-components';
import Box from '../Box';
import React from 'react';
import dropdownArrow from '@assets/icons/dropdown-arrow.svg';

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

  &:first-child {
    color: #7a7a7a;
  }

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${dropdownArrow});
  background-size: 14px 14px;
  background-repeat: no-repeat;
  background-position-x: calc(100% - 18px);
  background-position-y: 12px;
  background-color: #fff;
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
