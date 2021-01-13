
export enum CardTypes {
  Scenario = 'scenario',
  PipelineStep = 'pipeline-step',
  GameRule = 'game-rule',
  Review = 'review'
}

export enum CardTags {
  DeliveryStep= 'delivery-step',
  ManualStep= 'manual-step',
  DeployStep= 'deploy-step',
  SystemTest= 'system-test',
  Package= 'package',
}

export interface Card {
  type: CardTypes,
  tags: CardTags[] | null,
  title: string,
  subtitle: string | null
  content: string,
  number: number,
  deckId: string
}
