export async function sendSlackNotification(groupName: string, language: 'de' | 'en' = 'de') {
  try {
    const response = await fetch('/api/slack-notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ groupName, language }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return { success: false, error };
  }
}