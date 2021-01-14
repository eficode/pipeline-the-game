export interface Options {
  disabled: boolean;
  transformEnabled: boolean;
  minPositionX?: any;
  maxPositionX?: any;
  minPositionY?: any;
  maxPositionY?: any;
  minScale: number;
  maxScale: number;
  limitToBounds: boolean;
  limitToWrapper: boolean;
  centerContent: boolean;
  wrapperClass: string;
  contentClass: string;
}

export interface Wheel {
  disabled: boolean;
  step: number;
  wheelEnabled: boolean;
  touchPadEnabled: boolean;
  limitsOnWheel: boolean;
}

export interface Pan {
  disabled: boolean;
  panAnimationType: string;
  lockAxisX: boolean;
  lockAxisY: boolean;
  velocity: boolean;
  velocityEqualToMove: boolean;
  velocitySensitivity: number;
  velocityActiveScale: number;
  velocityMinSpeed: number;
  velocityBaseTime: number;
  velocityAnimationType: string;
  padding: boolean;
  paddingSize: number;
  panReturnAnimationTime: number;
  panReturnAnimationType: string;
  disableOnTarget: any[];
}

export interface Pinch {
  disabled: boolean;
}

export interface DoubleClick {
  disabled: boolean;
  step: number;
  mode: string;
  animation: boolean;
  animationType: string;
  animationTime: number;
}

export interface Reset {
  disabled: boolean;
  animation: boolean;
  animationType: string;
  animationTime: number;
}

export interface ScalePadding {
  disabled: boolean;
  size: number;
  animationTime: number;
  animationType: string;
}

export interface TansformRenderProps {
  previousScale: number;
  scale: number;
  positionX: number;
  positionY: number;
  options: Options;
  wheel: Wheel;
  pan: Pan;
  pinch: Pinch;
  doubleClick: DoubleClick;
  reset: Reset;
  scalePadding: ScalePadding;
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
}
