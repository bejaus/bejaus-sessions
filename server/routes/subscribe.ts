import { Request, Response } from "express";

interface SubscribeRequest {
  name: string;
  email: string;
}

export async function handleSubscribe(req: Request, res: Response) {
  try {
    const { name, email }: SubscribeRequest = req.body;

    // Validate input
    if (!email || !email.includes("@")) {
      return res.status(400).json({
        error: "Email inválido",
        message: "Por favor, introduce un email válido.",
      });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        error: "Nombre requerido",
        message: "Por favor, introduce tu nombre.",
      });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      console.error("MAILERLITE_API_KEY not found in environment variables");
      return res.status(500).json({
        error: "Error de configuración",
        message: "No se pudo procesar la suscripción.",
      });
    }

    // MailerLite API endpoint for adding subscribers
    const response = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email.trim(),
          fields: {
            name: name.trim(),
          },
          groups: [], // You can add group IDs here if you want to add subscribers to specific groups
          status: "active",
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("MailerLite API error:", errorData);

      // Handle specific MailerLite errors
      if (response.status === 409) {
        return res.status(409).json({
          error: "Ya suscrito",
          message: "Este email ya está suscrito a nuestra newsletter.",
        });
      }

      return res.status(500).json({
        error: "Error del servidor",
        message: "No se pudo completar la suscripción. Inténtalo de nuevo.",
      });
    }

    const data = await response.json();
    console.log("Successfully subscribed:", data);

    res.status(200).json({
      success: true,
      message: "¡Gracias por suscribirte a nuestra newsletter!",
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({
      error: "Error interno",
      message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
    });
  }
}
