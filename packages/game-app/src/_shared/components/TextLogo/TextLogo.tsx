import React from 'react';
import { ReactComponent as TextLogoImage } from '@assets/images/eficode-text-logo.svg';
import Box from '../Box';

type Props = {};

const TextLogo: React.FC<Props> = ({}) => {
  return (
    <Box width="100px">
      <TextLogoImage />
    </Box>
  );
};

TextLogo.displayName = 'TextLogo';

export default TextLogo;
