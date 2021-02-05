import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, Typography } from '@pipeline/components';
import { useTranslate } from '@pipeline/i18n';
import { TriggerDialogContainer } from './TriggerReviewDialog.styled';
import { useDispatch } from 'react-redux';
import { actions } from '../../slice';

type Props = {
  isOpen: boolean;
  close: () => void;
  straightToPosition?: boolean;
  inReview: boolean;
};

const TriggerReviewDialog: React.FC<Props> = ({ isOpen, close, straightToPosition = false, inReview }) => {
  const t = useTranslate();

  const [showReviewPosition, setShowReviewPosition] = useState(straightToPosition);

  const dispatch = useDispatch();

  const trigger = useCallback(() => {
    dispatch(actions.setReview(true));
    setShowReviewPosition(true);
  }, [dispatch]);

  const containerProps = useMemo(() => {
    return { showReviewPosition };
  }, [showReviewPosition]);

  useEffect(() => {
    // todo improve this logic
    if (!isOpen && showReviewPosition && straightToPosition !== showReviewPosition) {
      setShowReviewPosition(straightToPosition);
    }
  }, [isOpen, showReviewPosition, straightToPosition]);

  const showPosition = showReviewPosition || inReview;

  return (
    <Dialog
      open={isOpen}
      title={t(!showPosition ? 'game.triggerReview.title' : 'game.triggerReview.reviewTime')}
      DialogContainerComponent={TriggerDialogContainer}
      DialogContainerProps={containerProps}
    >
      <Typography mt={4} variant="content">
        {t(!showPosition ? 'game.triggerReview.subtitle' : 'game.triggerReview.reviewUnlocked')}
      </Typography>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button
          label={t(!showPosition ? 'game.triggerReview.buttonText' : 'game.triggerReview.understood')}
          onClick={!showPosition ? trigger : close}
        />
      </Box>
      {!showPosition && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="clear" color="buttonGrey" label={t('general.cancel')} onClick={close} />
        </Box>
      )}
    </Dialog>
  );
};
TriggerReviewDialog.displayName = 'TriggerReviewDialog';

export default TriggerReviewDialog;
