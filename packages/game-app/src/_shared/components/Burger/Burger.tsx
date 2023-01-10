import React from 'react';
import { StyledBurger } from './Burger.styled';
import { Box, TextLogo } from '@pipeline/components';

type BurgerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Burger: React.FC<BurgerProps> = ({ open, setOpen }) => {
  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </>
  );
};
export default Burger;
