import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Banner, CloseIconWrapper } from './PersistentBanner.styled';
import { ReactComponent as ClearIcon } from '../../../assets/icons/clear-search.svg';
import IconButton from '../IconButton';

type Props = {
  browser: string;
};

// todo do we have to persist the closed banner?
const PersistentBanner: React.FC<Props> = ({ browser, children }) => {
  const [visible, setVisible] = useState<boolean | null>(true);

  const close = useCallback(() => {
    setVisible(false);
    localStorage.setItem(`bannerClosed:${browser}`, 'true');
  }, [browser]);
  // }, []);

  /* for persistence
  useEffect(() => {
    const bannerClosed = localStorage.getItem(`bannerClosed:${key}`);
    setVisible(!(bannerClosed === 'true'))
  }, [key])
  */

  return visible
    ? createPortal(
        <Banner>
          <CloseIconWrapper>
            <IconButton variant="clearSmall" onClick={close}>
              <ClearIcon />
            </IconButton>
          </CloseIconWrapper>
          {children}
        </Banner>,
        document.body,
      )
    : null;
};

PersistentBanner.displayName = 'PersistentBanner';

export default PersistentBanner;
