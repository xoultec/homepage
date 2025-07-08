import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string || 'Not specified',
      projectType: formData.get('projectType') as string || 'Not specified',
      budget: formData.get('budget') as string || 'Not specified',
      message: formData.get('message') as string,
      timestamp: new Date().toISOString(),
    };

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Mailgun
    const mailgunResult = await sendMailgunEmail(contactData);
    
    // Send Discord notification
    const discordResult = await sendDiscordNotification(contactData);

    console.log('Contact form submission processed:', {
      email: mailgunResult,
      discord: discordResult,
      data: contactData
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send message. Please try again or contact us directly.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

async function sendMailgunEmail(data: any) {
  const MAILGUN_API_KEY = import.meta.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = import.meta.env.MAILGUN_DOMAIN;
  const TO_EMAIL = import.meta.env.TO_EMAIL || 'support@xoultec.com';

  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    console.warn('Mailgun not configured - email not sent');
    return { success: false, reason: 'Mailgun not configured' };
  }

  try {
    const mailgunUrl = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const emailBody = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Project Type: ${data.projectType}
Budget: ${data.budget}

Message:
${data.message}

Submitted: ${data.timestamp}
`;

    const formData = new FormData();
    formData.append('from', `XoulTec Contact <noreply@${MAILGUN_DOMAIN}>`);
    formData.append('to', TO_EMAIL);
    formData.append('subject', `New Contact Form Submission from ${data.name}`);
    formData.append('text', emailBody);

    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: formData,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('Mailgun error:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('Mailgun send error:', error);
    return { success: false, error: error.message };
  }
}

async function sendDiscordNotification(data: any) {
  const DISCORD_WEBHOOK_URL = import.meta.env.DISCORD_WEBHOOK_URL;

  if (!DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook not configured - notification not sent');
    return { success: false, reason: 'Discord webhook not configured' };
  }

  try {
    const embed = {
      title: "🔔 New Contact Form Submission",
      color: 0x3B82F6, // Blue color
      fields: [
        { name: "👤 Name", value: data.name, inline: true },
        { name: "📧 Email", value: data.email, inline: true },
        { name: "🏢 Company", value: data.company, inline: true },
        { name: "🎯 Project Type", value: data.projectType, inline: true },
        { name: "💰 Budget", value: data.budget, inline: true },
        { name: "⏰ Time", value: new Date(data.timestamp).toLocaleString(), inline: true },
        { name: "💬 Message", value: data.message.length > 1000 ? data.message.substring(0, 1000) + "..." : data.message, inline: false }
      ],
      footer: { text: "XoulTec Contact Form" },
      timestamp: data.timestamp
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'XoulTec Contact Bot',
        embeds: [embed]
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorText = await response.text();
      console.error('Discord webhook error:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.error('Discord send error:', error);
    return { success: false, error: error.message };
  }
}