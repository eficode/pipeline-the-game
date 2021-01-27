import React, { useCallback, useState } from 'react';
import { CollapsibleRuleContent, RuleContent, RuleHeader, RuleWrapper } from './ExpandableRule.styled';
import { Icon, Typography } from '@pipeline/components';
import { ReactComponent as ExpandIcon } from '@assets/icons/accordion-expand.svg';
import { ReactComponent as CollapseIcon } from '@assets/icons/accordion-collapse.svg';

type Props = {
  title: string;
};

const ExpandableRule: React.FC<Props> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    setCollapsed(c => !c);
  }, []);

  return (
    <RuleWrapper collapsed={collapsed}>
      <RuleHeader collapsed={collapsed} p={3} onClick={toggle}>
        <Icon>{collapsed ? <ExpandIcon /> : <CollapseIcon />}</Icon>
        <Typography variant="title" fontWeight="600">
          {title}
        </Typography>
      </RuleHeader>
      <CollapsibleRuleContent collapsed={collapsed}>
        <RuleContent>
          <Typography variant="contentHead">{children}</Typography>
        </RuleContent>
      </CollapsibleRuleContent>
    </RuleWrapper>
  );
};

ExpandableRule.displayName = 'ExpandableRule';

export default ExpandableRule;
