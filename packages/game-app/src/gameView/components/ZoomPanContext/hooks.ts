import { useContext } from 'react';
import { ZoomPanValuesContext, ZoomPanRefsContext, ZoomPanSetterContext } from './ZoomPanContext';

export function useZoomPanValues() {
  return useContext(ZoomPanValuesContext);
}

export function useZoomPanSetters() {
  return useContext(ZoomPanSetterContext);
}

export function useZoomPanRefs() {
  return useContext(ZoomPanRefsContext);
}
