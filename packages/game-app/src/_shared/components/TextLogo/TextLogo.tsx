import React from 'react';
import { ReactComponent as TextLogoImage } from '@assets/images/eficode-text-logo.svg';
import Box from '../Box';
import { useNavigateOutsideTo } from '@pipeline/routing';
import { ExternalUrl } from '@pipeline/models';
import styled from 'styled-components';

type Props = {};

const BoxWithPointer = styled(Box)`
  cursor: pointer;
`;

const TextLogo: React.FC<Props> = () => {
  const goToPipeline = useNavigateOutsideTo(ExternalUrl.PIPELINE, true);

  return (
    <BoxWithPointer width="100px" onClick={goToPipeline}>
      <TextLogoImage />
    </BoxWithPointer>
  );
};

TextLogo.displayName = 'TextLogo';

export default TextLogo;
