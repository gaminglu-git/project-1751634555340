import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface RSVPEmailData {
    name: string;
    email: string;
    phone?: string;
    attendance: string;
    mealPreference?: string;
    allergies?: string;
    plusOne: boolean;
    plusOneName?: string;
    plusOneMeal?: string;
    message?: string;
}

export async function sendRSVPConfirmationEmail(data: RSVPEmailData) {
    const mealNames = {
        meat: 'Fleischgericht (Rinderfilet)',
        fish: 'Fischgericht (Lachsfilet)',
        vegetarian: 'Vegetarisch (Gemüse-Risotto)',
        vegan: 'Vegan (Quinoa-Bowl)',
    };

    const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #f97316; font-size: 28px; margin-bottom: 10px;">💕 Johanna & Lukas</h1>
        <div style="width: 100px; height: 2px; background: linear-gradient(to right, #f97316, #3b82f6); margin: 0 auto;"></div>
      </div>
      
      <h2 style="color: #374151; font-size: 24px; margin-bottom: 20px;">
        ${data.attendance === 'yes' ? '🎉 Vielen Dank für Ihre Zusage!' : '💌 Vielen Dank für Ihre Rückmeldung!'}
      </h2>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Liebe/r ${data.name},
      </p>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        ${
            data.attendance === 'yes'
                ? 'wir freuen uns riesig, dass Sie an unserer Hochzeit teilnehmen werden! Hier ist eine Zusammenfassung Ihrer Anmeldung:'
                : 'vielen Dank für Ihre Rückmeldung. Wir verstehen, dass Sie nicht teilnehmen können, und schätzen es sehr, dass Sie uns Bescheid gegeben haben.'
        }
      </p>
      
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3 style="color: #374151; font-size: 18px; margin-bottom: 15px;">📋 Ihre Anmeldung:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 8px; color: #6b7280;"><strong>Name:</strong> ${data.name}</li>
          <li style="margin-bottom: 8px; color: #6b7280;"><strong>E-Mail:</strong> ${data.email}</li>
          ${data.phone ? `<li style="margin-bottom: 8px; color: #6b7280;"><strong>Telefon:</strong> ${data.phone}</li>` : ''}
          <li style="margin-bottom: 8px; color: #6b7280;"><strong>Teilnahme:</strong> ${data.attendance === 'yes' ? '✅ Ja, ich komme gerne!' : '❌ Leider kann ich nicht'}</li>
          
          ${
              data.attendance === 'yes' && data.mealPreference
                  ? `
            <li style="margin-bottom: 8px; color: #6b7280;"><strong>Menüwahl:</strong> ${mealNames[data.mealPreference as keyof typeof mealNames]}</li>
            ${data.allergies ? `<li style="margin-bottom: 8px; color: #6b7280;"><strong>Allergien/Wünsche:</strong> ${data.allergies}</li>` : ''}
            
            ${
                data.plusOne
                    ? `
              <li style="margin-bottom: 8px; color: #6b7280;"><strong>Begleitung:</strong> ${data.plusOneName}</li>
              <li style="margin-bottom: 8px; color: #6b7280;"><strong>Menü Begleitung:</strong> ${data.plusOneMeal ? mealNames[data.plusOneMeal as keyof typeof mealNames] : 'Nicht angegeben'}</li>
            `
                    : ''
            }
          `
                  : ''
          }
          
          ${data.message ? `<li style="margin-bottom: 8px; color: #6b7280;"><strong>Nachricht:</strong> ${data.message}</li>` : ''}
        </ul>
      </div>
      
      ${
          data.attendance === 'yes'
              ? `
        <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #92400e; font-size: 18px; margin-bottom: 15px;">📅 Wichtige Termine:</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px; color: #92400e;"><strong>Standesamtliche Trauung:</strong> 16. August 2025, Burg Brüggen</li>
            <li style="margin-bottom: 8px; color: #92400e;"><strong>Große Feier:</strong> 5. September 2025, Restaurant Waldau, Bonn</li>
          </ul>
        </div>
      `
              : ''
      }
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 20px 0;">
        ${
            data.attendance === 'yes'
                ? 'Weitere Informationen zur Anfahrt und Unterkunft finden Sie auf unserer Website. Bei Fragen können Sie uns gerne kontaktieren.'
                : 'Wir hoffen, Sie bei einer anderen Gelegenheit zu sehen!'
        }
      </p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 10px;">
          Mit liebsten Grüßen,<br>
          Johanna & Lukas 💕
        </p>
        <div style="font-size: 20px;">👰‍♀️🤵‍♂️💍🎉</div>
      </div>
    </div>
  `;

    try {
        const result = await resend.emails.send({
            from: 'Johanna & Lukas <noreply@your-domain.com>',
            to: [data.email],
            subject:
                data.attendance === 'yes'
                    ? '🎉 Bestätigung Ihrer Hochzeits-Anmeldung - Johanna & Lukas'
                    : '💌 Danke für Ihre Rückmeldung - Johanna & Lukas',
            html: emailContent,
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
}

export async function sendRSVPNotificationEmail(data: RSVPEmailData) {
    const mealNames = {
        meat: 'Fleischgericht',
        fish: 'Fischgericht',
        vegetarian: 'Vegetarisch',
        vegan: 'Vegan',
    };

    const notificationContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #374151;">🔔 Neue RSVP-Anmeldung</h2>
      
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h3>Gast-Details:</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>E-Mail:</strong> ${data.email}</li>
          ${data.phone ? `<li><strong>Telefon:</strong> ${data.phone}</li>` : ''}
          <li><strong>Teilnahme:</strong> ${data.attendance === 'yes' ? 'JA ✅' : 'NEIN ❌'}</li>
          
          ${
              data.attendance === 'yes'
                  ? `
            <li><strong>Menü:</strong> ${data.mealPreference ? mealNames[data.mealPreference as keyof typeof mealNames] : 'Nicht angegeben'}</li>
            ${data.allergies ? `<li><strong>Allergien:</strong> ${data.allergies}</li>` : ''}
            
            ${
                data.plusOne
                    ? `
              <li><strong>Begleitung:</strong> ${data.plusOneName}</li>
              <li><strong>Menü Begleitung:</strong> ${data.plusOneMeal ? mealNames[data.plusOneMeal as keyof typeof mealNames] : 'Nicht angegeben'}</li>
            `
                    : '<li><strong>Begleitung:</strong> Nein</li>'
            }
          `
                  : ''
          }
          
          ${data.message ? `<li><strong>Nachricht:</strong> ${data.message}</li>` : ''}
        </ul>
      </div>
      
      <p style="color: #6b7280; font-size: 14px;">
        Anmeldung eingegangen am: ${new Date().toLocaleString('de-DE')}
      </p>
    </div>
  `;

    try {
        const result = await resend.emails.send({
            from: 'RSVP System <noreply@your-domain.com>',
            to: ['johanna@example.com', 'lukas@example.com'], // Eure E-Mail-Adressen
            subject: `🔔 Neue RSVP: ${data.name} - ${data.attendance === 'yes' ? 'ZUSAGE' : 'ABSAGE'}`,
            html: notificationContent,
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('Error sending notification email:', error);
        return { success: false, error };
    }
}
