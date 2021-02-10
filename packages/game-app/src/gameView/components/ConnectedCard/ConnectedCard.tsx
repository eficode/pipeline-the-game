import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';
import { Card } from '@pipeline/components';
import { useTranslate, TranslationKeys } from '@pipeline/i18n';

type Props = {
  id: string;
  dragging?: boolean;
  bigger?: boolean;
};

const ConnectedCard: React.FC<Props> = ({ id, dragging, bigger }) => {
  const cardData = useSelector(selectors.getCardById(id))!;
  const t = useTranslate();

  const memoTagsLabels = useMemo(() => {
    let tagsLabels: string[] = [];
    if (cardData && cardData.tags) {
      tagsLabels = cardData.tags.map(tag => t(`card.tag.${tag}` as TranslationKeys));
    }
    return tagsLabels;
  }, [cardData, t]);

  const memoCardTypeLabel = useMemo(() => {
    let memoType = '';
    if (cardData && cardData.type) {
      memoType = t(`card.type.${cardData.type}` as TranslationKeys);
    }
    return memoType;
  }, [cardData, t]);

  return (
    <Card {...cardData} tagsLabels={memoTagsLabels} typeLabel={memoCardTypeLabel} dragging={dragging} bigger={bigger} />
  );
};

ConnectedCard.displayName = 'ConnectedCard';

export default React.memo(ConnectedCard);
