import React from 'react';
import { ExpandableTopPanel, Typography } from '@pipeline/components';

type Props = {};

// TODO add real review content
const ReviewPanel: React.FC<Props> = () => {
  return (
    <ExpandableTopPanel label="Review">
      <Typography variant="contentHead" as="div" mt={2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua
      </Typography>
    </ExpandableTopPanel>
  );
};

ReviewPanel.displayName = 'ReviewPanel';

export default ReviewPanel;
