import { registerPlugin } from '@capacitor/core';

export interface WidgetBridgePlugin {
  updateWidgetData(options: {
    level: number;
    xp: number;
    xpToNext: number;
    tasks: string;
    insight?: string;
  }): Promise<void>;
  updateStatusWidget(options: {
    level: number;
    xp: number;
    xpToNext: number;
  }): Promise<void>;
  updateTasksWidget(options: {
    tasks: string;
  }): Promise<void>;
  updateInsightWidget(options: {
    insight: string;
  }): Promise<void>;
}

const WidgetBridge = registerPlugin<WidgetBridgePlugin>('WidgetBridge', {
  web: () => import('./widget-bridge-web.ts').then(m => new m.WidgetBridgeWeb()),
});

export default WidgetBridge;