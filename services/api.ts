import { Capacitor } from '@capacitor/core';

const API_BASE_URL = Capacitor.isNativePlatform() 
  ? 'https://life-physics-architect-222612925549.us-west1.run.app' 
  : '';

export const generateTaskAI = async (prompt: string): Promise<{ result: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/generate-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI content');
  }

  return response.json();
};