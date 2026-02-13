import { WebPlugin } from '@capacitor/core';
import type { WidgetPinPlugin } from './widget-pin.ts';

export class WidgetPinWeb extends WebPlugin implements WidgetPinPlugin {
  async pinWidget(): Promise<void> {
    throw new Error('Widget pinning is only available on native Android 8.0+');
  }
  async canPinWidgets(): Promise<{ canPin: boolean; reason: string }> {
    return {
      canPin: false,
      reason: 'Widget pinning is only available on native Android',
    };
  }
}