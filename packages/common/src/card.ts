
// Attention: these are linked to translations
export enum CardType {
  Scenario = 'scenario',
  PipelineStep = 'pipeline-step',
  GameRule = 'game-rule',
  Review = 'review'
}
// Attention: these are linked to translations
export enum CardTag {
  DeliveryStep = 'delivery-step',
  ManualStep = 'manual-step',
  DeployStep = 'deploy-step',
  SystemTest = 'system-test',
  Package = 'package',
}

export interface Card {
  type: CardType,
  tags: CardTag[] | null,
  title: string,
  subtitle: string | null
  content: string,
  number: number,
  deckId: string
}

export type CardEntity = Card & {id:string};
