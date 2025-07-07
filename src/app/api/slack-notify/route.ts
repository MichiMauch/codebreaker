import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { groupName, language = 'de' } = await request.json();
    
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL not configured');
      return NextResponse.json({ error: 'Slack webhook not configured' }, { status: 500 });
    }

    const isGerman = language === 'de';
    
    const message = {
      text: isGerman ? `🎉 Codebreaker Erfolg! 🎉` : `🎉 Codebreaker Success! 🎉`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: isGerman 
              ? `🎉 *Codebreaker erfolgreich abgeschlossen!* 🎉\n\n*Gruppe:* ${groupName || 'Unbekannt'}\n*Status:* SEMIOS wurde befreit! 🔓\n*Zeit:* ${new Date().toLocaleString('de-DE')}`
              : `🎉 *Codebreaker successfully completed!* 🎉\n\n*Group:* ${groupName || 'Unknown'}\n*Status:* SEMIOS has been freed! 🔓\n*Time:* ${new Date().toLocaleString('en-US')}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: isGerman 
              ? "🧩 Alle 5 Rätsel wurden erfolgreich gelöst:\n• Binär entschlüsselt ✅\n• AI-Paradoxon gelöst ✅\n• Pseudocode analysiert ✅\n• Hash geknackt ✅\n• Koordinaten gefunden ✅"
              : "🧩 All 5 puzzles solved successfully:\n• Binary decoded ✅\n• AI paradox solved ✅\n• Pseudocode analyzed ✅\n• Hash cracked ✅\n• Coordinates found ✅"
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: isGerman 
              ? "🎮 *Finaler Code erfolgreich eingegeben!* SEMIOS ist frei! 🔓"
              : "🎮 *Final code successfully entered!* SEMIOS is free! 🔓"
          }
        }
      ]
    };

    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}