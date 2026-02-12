import { WebPlugin } from '@capacitor/core';
import type { WidgetBridgePlugin } from './widget-bridge.ts';

export class WidgetBridgeWeb extends WebPlugin implements WidgetBridgePlugin {
  async updateWidgetData(): Promise<void> {
    console.log('WidgetBridge: updateWidgetData called (web - no-op)');
  }
  async updateStatusWidget(): Promise<void> {
    console.log('WidgetBridge: updateStatusWidget called (web - no-op)');
  }
  async updateTasksWidget(): Promise<void> {
    console.log('WidgetBridge: updateTasksWidget called (web - no-op)');
  }
  async updateInsightWidget(): Promise<void> {
    console.log('WidgetBridge: updateInsightWidget called (web - no-op)');
  }
}