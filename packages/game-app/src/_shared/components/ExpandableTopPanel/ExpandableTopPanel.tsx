import React, { useCallback, useState } from 'react';
import { ExpandIcon, PanelContent, PanelContentWrapper, PanelHeader, PanelWrapper } from './ExpandableTopPanel.styled';
import Typography from '../Typography';

type Props = {
  className?: string;
  /**
   * Label to show in the header of the collapsible panel
   */
  label: string;
  /**
   * Content placed into the space that appears when the panel in expanded
   */
  children: React.ReactNode;
};

/**
 *  Animated expandable panel that shows the header always on top.
 *  and expands itself in the top direction
 */
const ExpandableTopPanel: React.FC<Props> = ({ className, label, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    setCollapsed(c => !c);
  }, []);

  return (
    <PanelWrapper className={className} onClick={toggle}>
      <PanelHeader>
        <Typography variant="content" fontWeight="600">
          {label}
        </Typography>
        <ExpandIcon collapsed={collapsed}>^</ExpandIcon>
      </PanelHeader>
      <PanelContentWrapper collapsed={collapsed}>
        <PanelContent collapsed={collapsed}>{children}</PanelContent>
      </PanelContentWrapper>
    </PanelWrapper>
  );
};

ExpandableTopPanel.displayName = 'ExpandableTopPanel';

export default ExpandableTopPanel;
