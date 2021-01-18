import React from 'react';
import { ExpandableTopPanel, Typography } from '@pipeline/components';
import { useSelector } from 'react-redux';
import { selectors } from '../../slice';

type Props = {};

const ScenarioPanel: React.FC<Props> = ({}) => {
  const scenario = useSelector(selectors.getScenario);

  return (
    <ExpandableTopPanel label="Scenario">
      <Typography variant="title" as="h2">
        {scenario?.title}
      </Typography>
      <Typography variant="contentHead" as="div" mt={2}>
        {scenario?.content}
      </Typography>
    </ExpandableTopPanel>
  );
};

ScenarioPanel.displayName = 'ScenarioPanel';

export default ScenarioPanel;
