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
  DialogContainerComponent?: React.ElementType;
  // TODO improve types
  DialogContainerProps?: object;
  AdditionalComponent?: React.ElementType;
  id?: string;
  testId?: string;
};

/**
 * Dialog component that appears at the center of the screen with animation inside a {{GlassOverlay}}
 *
 */
const Dialog: React.FC<Props> & { DialogContainer: typeof DialogContainer } = ({
  open,
  title,
  DialogContainerComponent = DialogContainer,
  DialogContainerProps = {},
  AdditionalComponent,
  id,
  testId,
  children,
}) => {
  return (
    <GlassOverlay open={open} id={id} testId={id || testId}>
      <DialogContainerComponent {...DialogContainerProps}>
        <Typography textAlign="center" variant="dialogHead">
          {title}
        </Typography>
        {children}
      </DialogContainerComponent>
      {AdditionalComponent && <AdditionalComponent />}
    </GlassOverlay>
  );
};

Dialog.displayName = 'Dialog';

Dialog.DialogContainer = DialogContainer;

export default Dialog;
