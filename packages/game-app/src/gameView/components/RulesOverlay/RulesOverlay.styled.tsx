import styled from 'styled-components';

export const RulesOverlayContent = styled.div`
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
