import React from 'react';
import { DialogEmailContainer, DialogEmailContent, DialogEmailHeader } from './DialogForEmailContainer.styled';
import Icon from '../Icon';
import { ReactComponent as EmailIcon } from '@assets/icons/mail.svg';

type Props = {};

const DialogForEmailContainer: React.FC<Props> = ({ children }) => {
  return (
    <DialogEmailContainer>
      <DialogEmailHeader>
        <Icon color="white" width="80px" height="60px">
          <EmailIcon />
        </Icon>
      </DialogEmailHeader>
      <DialogEmailContent>{children}</DialogEmailContent>
    </DialogEmailContainer>
  );
};

DialogForEmailContainer.displayName = 'DialogForEmailContainer';

export default DialogForEmailContainer;
