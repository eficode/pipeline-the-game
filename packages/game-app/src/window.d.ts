declare global {
  interface Window {
    logFacilitatorEvent: (cardId: string, state: any) => void;
    logEvent: (cardId: string, state: any) => void;
    isPerfTestRunning?: boolean;
    _hsq?: {
      push(
        parms:
          | ['setPath', string]
          | ['trackPageView']
          | [
              'identify',
              {
                email: string;
              } & object,
            ],
      );
    };
  }
}
export {};
