declare global {
  interface Window {
    logFacilitatorEvent: (cardId: string, state: any) => void;
    logEvent: (cardId: string, state: any) => void;
    isPerfTestRunning?: boolean;
  }
}
export {};
