import React from 'react';
import { StyledMenu } from './Menu.styled';

type MenuProps = {
  open: boolean;
  children: React.ReactChild[] | React.ReactChild;
};

const Menu: React.FC<MenuProps> = ({ open, children }) => {
  return <StyledMenu open={open}>{children}</StyledMenu>;
};
export default Menu;
