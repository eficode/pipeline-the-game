import styled from 'styled-components';

export const RulesOverlayContent = styled.div`
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    overflow: visible;
  }
`;

RulesOverlayContent.displayName = 'RulesOverlayContent';

export const RulesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: auto;
  margin-top: 100px;
  overflow-y: scroll;
  scrollbar-width: none;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 20px;
    width: 100%;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

RulesContainer.displayName = 'RulesContainer';

export const RuleMainImage = styled.div`
  svg {
    max-width: 100%;
  }
`;
