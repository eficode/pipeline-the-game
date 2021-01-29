import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button, Dialog, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { TriggerDialogContainer } from './TriggerReviewDialog.styled';
import { useDispatch } from 'react-redux';
import { actions } from '../../slice';

type Props = {
  isOpen: boolean;
  close: () => void;
};

const TriggerReviewDialog: React.FC<Props> = ({ isOpen, close }) => {
  const t = useTranslate();

  const [showReviewPosition, setShowReviewPosition] = useState(false);

  const dispatch = useDispatch();

  const trigger = useCallback(() => {
    dispatch(actions.setReview(true));
    setShowReviewPosition(true);
  }, [dispatch]);

  const containerProps = useMemo(() => {
    return { showReviewPosition };
  }, [showReviewPosition]);

  return (
    <Dialog
      open={isOpen}
      title={t(!showReviewPosition ? 'game.triggerReview.title' : 'game.triggerReview.reviewTime')}
      DialogContainerComponent={TriggerDialogContainer}
      DialogContainerProps={containerProps}
    >
      <Typography mt={4} variant="content">
        {t(!showReviewPosition ? 'game.triggerReview.subtitle' : 'game.triggerReview.reviewUnlocked')}
      </Typography>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button
          label={t(!showReviewPosition ? 'game.triggerReview.buttonText' : 'game.triggerReview.understood')}
          onClick={!showReviewPosition ? trigger : close}
        />
      </Box>
      {!showReviewPosition && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="clear" color="buttonGrey" label={t('general.cancel')} onClick={close} />
        </Box>
      )}
    </Dialog>
  );
};
TriggerReviewDialog.displayName = 'TriggerReviewDialog';

export default TriggerReviewDialog;
