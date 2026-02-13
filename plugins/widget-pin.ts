import { registerPlugin } from '@capacitor/core';

export interface WidgetPinPlugin {
  pinWidget(options: { 
    widgetType: 'status' | 'tasks' | 'quickAdd' | 'insight';
    widgetName?: string;
  }): Promise<void>;
  canPinWidgets(): Promise<{ canPin: boolean; reason: string }>;
}

const WidgetPin = registerPlugin<WidgetPinPlugin>('WidgetPin', {
  web: () => import('./widget-pin-web.ts').then(m => new m.WidgetPinWeb()),
});

export default WidgetPin;