import React, { useCallback, useState } from 'react';
import { ExpandIcon, PanelContent, PanelContentWrapper, PanelHeader, PanelWrapper } from './ExpandableTopPanel.styled';
import Typography from '../Typography';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/expandable-box.svg';

type Props = {
  className?: string;
  /**
   * Label to show in the header of the collapsible panel
   */
  label: string;
  /**
   * Boolean to disable interaction
   */
  disabled?: boolean;
  /**
   * Content placed into the space that appears when the panel in expanded
   */
  children: React.ReactNode;
};

/**
 *  Animated expandable panel that shows the header always on top.
 *  and expands itself in the top direction
 */
const ExpandableTopPanel: React.FC<Props> = ({ className, label, disabled, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    if (!disabled) {
      setCollapsed(c => !c);
    }
  }, [disabled]);

  return (
    <PanelWrapper className={className} onClick={toggle} disabled={disabled}>
      <PanelHeader>
        <Typography variant="content" fontWeight="600">
          {label}
        </Typography>
        <ExpandIcon collapsed={collapsed}>
          <ArrowIcon />
        </ExpandIcon>
      </PanelHeader>
      <PanelContentWrapper collapsed={collapsed}>
        <PanelContent collapsed={collapsed}>{children}</PanelContent>
      </PanelContentWrapper>
    </PanelWrapper>
  );
};

ExpandableTopPanel.displayName = 'ExpandableTopPanel';

export default ExpandableTopPanel;
