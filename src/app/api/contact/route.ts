import { Resend } from "resend";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Resend API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.EMAIL_FROM || '"Carlos Damota" <contacto@fittwiz.app>';
  const toEmail = process.env.CONTACT_EMAIL || "cdamota.cd@gmail.com";

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const notification = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo mensaje desde tu portfolio</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    if (notification.error) {
      console.error("Error enviando notificación interna:", notification.error);
      return new Response(JSON.stringify({ error: notification.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Gracias por contactarme',
      html: `
        <h3>¡Gracias por tu mensaje, ${name.toUpperCase()}!</h3>
        <p>He recibido tu mensaje y te responderé pronto.</p>
        <p>Saludos,<br>Carlos Damota</p>
      `,
    }).catch((err) => {
      console.error("Error enviando auto-respuesta de cortesía:", err);
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inesperado en /api/contact:", error);
    return new Response(JSON.stringify({ error: "Error al enviar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
