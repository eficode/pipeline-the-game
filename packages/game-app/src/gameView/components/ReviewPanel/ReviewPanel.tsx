import React from 'react';
import { Box, ExpandableTopPanel, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';

type Props = {};

const ReviewPanel: React.FC<Props> = () => {
  const t = useTranslate();

  return (
    <ExpandableTopPanel label="Review">
      <Box>
        <Typography variant="content" fontWeight="bold" mt={2}>
          {t('game.review.title1')}
        </Typography>
        <Typography variant="contentHead" mt={2}>
          {t('game.review.content1')}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="contentHead" fontWeight="bold" mt={2}>
          {t('game.review.title2')}
        </Typography>
        <Typography variant="contentHead" mt={2}>
          {t('game.review.content2')}
        </Typography>
      </Box>
    </ExpandableTopPanel>
  );
};

ReviewPanel.displayName = 'ReviewPanel';

export default ReviewPanel;
