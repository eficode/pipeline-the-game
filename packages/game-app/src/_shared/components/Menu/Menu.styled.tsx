import styled from 'styled-components';

interface StyledMenuProps {
  open: boolean;
}
export const StyledMenu = styled.nav<StyledMenuProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.backgroundLight};
  text-align: left;
  position: absolute;
  row-gap: 1.5rem;
  padding-top: 6rem;
  top: 0;
  left: 0;
  bottom: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;

StyledMenu.displayName = 'StyledMenu';
