import styled from 'styled-components';

export const CreateGameContainer = styled.div`
  background-color: rgb(170, 180, 175, 0.95);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @supports (backdrop-filter: blur(15px)) {
    background-color: rgb(170, 180, 175, 0.4);
    backdrop-filter: blur(15px);
  }
`;

CreateGameContainer.displayName = 'CreateGameContainer';

export const CreateGameContent = styled.div`
  width: 80%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 6px #d7d2cb80;
  border-radius: 10px;
  padding: 24px 40px;
`;

CreateGameContent.displayName = 'CreateGameContent';
