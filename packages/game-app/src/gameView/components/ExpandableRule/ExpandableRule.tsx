import React, { useCallback, useState } from 'react';
import { CollapsibleRuleContent, RuleContent, RuleHeader, RuleWrapper } from './ExpandableRule.styled';
import { Icon, Typography } from '@pipeline/components';
import { ReactComponent as ExpandIcon } from '@assets/icons/accordion-expand.svg';
import { ReactComponent as CollapseIcon } from '@assets/icons/accordion-collapse.svg';

type Props = {
  title: string;
  id: string;
};

const ExpandableRule: React.FC<Props> = ({ title, children, id }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = useCallback(() => {
    setCollapsed(c => !c);
  }, []);

  return (
    <RuleWrapper collapsed={collapsed} id={`rule-${id}`} onClick={toggle}>
      <RuleHeader collapsed={collapsed} p={3}>
        <Icon>{collapsed ? <ExpandIcon /> : <CollapseIcon />}</Icon>
        <Typography variant="dialogHead" fontWeight="600">
          {title}
        </Typography>
      </RuleHeader>
      <CollapsibleRuleContent collapsed={collapsed}>
        <RuleContent id={`rule-${id}-content`}>{children}</RuleContent>
      </CollapsibleRuleContent>
    </RuleWrapper>
  );
};

ExpandableRule.displayName = 'ExpandableRule';

export default ExpandableRule;
