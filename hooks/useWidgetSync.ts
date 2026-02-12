import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import WidgetBridge from '../plugins/widget-bridge.ts';
import { Task } from '../types.ts';

export function useWidgetSync(
  level: number,
  xp: number,
  xpToNextLevel: number,
  tasks: Task[]
) {
  useEffect(() => {
    // Only run on native platforms
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const syncWidgets = async () => {
      try {
        // Filter pending tasks and take top 3
        const pendingTasks = tasks
          .filter(t => t.status === 'pending')
          .slice(0, 3)
          .map(t => ({
            id: t.id,
            title: t.title,
            difficulty: t.difficulty,
            status: t.status
          }));

        // Convert tasks to JSON string
        const tasksJson = JSON.stringify(pendingTasks);

        // Generate insight text based on task count
        const insight = pendingTasks.length > 2
          ? 'HIGH ENTROPY DETECTED IN RECENT HABITS'
          : pendingTasks.length > 0
          ? 'SYSTEM FLOW STABILIZING'
          : 'SYSTEM ALIGNED AND BALANCED';

        // Update all widgets
        await WidgetBridge.updateWidgetData({
          level,
          xp,
          xpToNext: xpToNextLevel,
          tasks: tasksJson,
          insight
        });

        console.log('Widgets synced successfully');
      } catch (error) {
        console.error('Failed to sync widgets:', error);
      }
    };

    // Sync immediately
    syncWidgets();

    // Sync on a timer (every 5 minutes)
    const interval = setInterval(syncWidgets, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [level, xp, xpToNextLevel, tasks]);
}