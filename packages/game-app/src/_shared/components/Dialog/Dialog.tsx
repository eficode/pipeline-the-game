import React from 'react';
import GlassOverlay from '../GlassOverlay';
import { DialogContainer } from './Dialog.styled';
import Typography from '../Typography';

type Props = {
  /**
   * If the dialog is open or not.
   * When you change this prop the dialog will disappear using an aniamation
   */
  open?: boolean;
  /**
   * The dialog title
   */
  title: string;
  /**
   * Content placed inside the dialog under the title
   */
  children?: React.ReactNode;
};

/**
 * Dialog component that appears at the center of the screen with animation inside a {{GlassOverlay}}
 *
 */
const Dialog: React.FC<Props> = ({ open, title, children }) => {
  return (
    <GlassOverlay open={open}>
      <DialogContainer>
        <Typography variant="dialogHead">{title}</Typography>
        {children}
      </DialogContainer>
    </GlassOverlay>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
