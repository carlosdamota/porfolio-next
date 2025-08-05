import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "cdamota.cd@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al enviar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}