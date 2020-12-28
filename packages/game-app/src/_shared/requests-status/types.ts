export interface RequestStatus {
  loading: boolean;
  error?: {
    message: string;
    code: string;
  };
  success: boolean;
}

export type GeneralHookResponse<T extends Array<any>> = {
  loading: boolean;
  success: boolean;
  error?: { message: string; code: string };
  translatedError?: string;
  call: (...args: T) => void;
  reset: () => void;
};
