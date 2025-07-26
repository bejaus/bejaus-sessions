import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Loader2, CreditCard, Smartphone } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks/use-toast";
import {
  SquarePaymentRequest,
  SquareConfig,
  DEFAULT_SQUARE_CONFIG,
} from "../../shared/square";

// Declare Square global type
declare global {
  interface Window {
    Square?: any;
  }
}

interface SquareCheckoutProps {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  customerEmail?: string;
}

export function SquareCheckout({
  onSuccess,
  onError,
  customerEmail,
}: SquareCheckoutProps) {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [isSquareLoaded, setIsSquareLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [squareConfig, setSquareConfig] = useState<SquareConfig>(
    DEFAULT_SQUARE_CONFIG,
  );
<<<<<<< HEAD
  const [demoMode, setDemoMode] = useState(false); // Set to true for demo mode, false for real Square payments
  const [squareInitFailed, setSquareInitFailed] = useState(false);
=======
>>>>>>> origin/main
  const cardRef = useRef<HTMLDivElement>(null);
  const googlePayRef = useRef<HTMLDivElement>(null);
  const applePayRef = useRef<HTMLDivElement>(null);
  const [payments, setPayments] = useState<any>(null);
  const [card, setCard] = useState<any>(null);

  // Calculate total in cents
  const totalCents = Math.round(cart.total * 100);
  const shippingCents = cart.total >= 50 ? 0 : 599; // 5.99€ shipping
  const finalTotalCents = totalCents + shippingCents;
  const demoMode = process.env.NODE_ENV !== "production";

  useEffect(() => {
    // Fetch Square configuration from server
    const fetchSquareConfig = async () => {
      try {
        const response = await fetch("/api/square-config");
        if (
          response.ok &&
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const config = await response.json();
          setSquareConfig(config);
        } else {
          console.log(
            "Square config API not available, using default sandbox config",
          );
          // Use default demo config that definitely works
          setSquareConfig({
            applicationId: "sandbox-sq0idb-demo-app-id",
            locationId: "demo-location-id",
            accessToken: "",
          });
        }
      } catch (error) {
        console.log("Failed to fetch Square config, using default:", error);
        // Use default demo config that definitely works
        setSquareConfig({
          applicationId: "sandbox-sq0idb-demo-app-id",
          locationId: "demo-location-id",
          accessToken: "",
        });
      }
    };

    fetchSquareConfig();
  }, []);

  useEffect(() => {
    // Only load Square SDK if not in demo mode and Square init hasn't failed
    if (demoMode || squareInitFailed) {
      console.log("Demo mode active or Square init failed - skipping Square SDK initialization");
      setIsSquareLoaded(true);
      return;
    }

    // Load Square Web Payments SDK
    const loadSquareSDK = async () => {
      if (window.Square) {
        initializeSquare();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://web.squarecdn.com/v1/square.js";
      script.async = true;
      script.onload = () => {
        setIsSquareLoaded(true);
        initializeSquare();
      };
      script.onerror = () => {
        console.error("Failed to load Square SDK");
        toast({
          title: "Error de pago",
          description:
            "No se pudo cargar el sistema de pagos. Inténtalo de nuevo.",
          variant: "destructive",
        });
      };
      document.body.appendChild(script);
    };

    const initializeSquare = async () => {
      if (!window.Square) return;

      try {
        // Validate application ID format
        if (!squareConfig.applicationId || squareConfig.applicationId.includes('your-real-application-id')) {
          throw new Error('Invalid or placeholder Square Application ID');
        }

        const paymentsInstance = window.Square.payments(
          squareConfig.applicationId,
          squareConfig.locationId,
        );
        setPayments(paymentsInstance);

        // Initialize Card payment method
        const cardInstance = await paymentsInstance.card();
        await cardInstance.attach(cardRef.current);
        setCard(cardInstance);

        // Initialize Google Pay (if available)
        try {
          const googlePay = await paymentsInstance.googlePay({
            buttonOptions: {
              buttonColor: "default",
              buttonType: "pay",
            },
          });
          await googlePay.attach(googlePayRef.current);
        } catch (e) {
          console.log("Google Pay not available");
        }

        // Initialize Apple Pay (if available)
        try {
          const applePay = await paymentsInstance.applePay({
            buttonOptions: {
              buttonColor: "black",
              buttonType: "pay",
            },
          });
          await applePay.attach(applePayRef.current);
        } catch (e) {
          console.log("Apple Pay not available");
        }
      } catch (error) {
        console.error("Error initializing Square:", error);

        // Fall back to demo mode if Square initialization fails
        setSquareInitFailed(true);
        setDemoMode(true);

        toast({
          title: "Usando modo demostración",
          description: "Square no está configurado correctamente. Usando pagos simulados.",
        });
      }
    };

    loadSquareSDK();
  }, [squareConfig, demoMode, squareInitFailed]);

  const handlePayment = async (paymentMethod: any) => {
    if (!payments || isProcessing) return;

    setIsProcessing(true);

    try {
      // Tokenize the payment method
      const result = await paymentMethod.tokenize();

      if (result.status === "OK") {
        // Send payment request to your backend
        const paymentRequest: SquarePaymentRequest = {
          amount: finalTotalCents,
          currency: "EUR",
          items: cart.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: Math.round(item.product.price * 100),
          })),
          customer: {
            email: customerEmail,
          },
        };

        const response = await fetch("/api/square-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: result.token,
            ...paymentRequest,
          }),
        });

        const paymentResult = await response.json();

        if (paymentResult.success) {
          // Payment successful
          clearCart();
          toast({
            title: "¡Pago exitoso!",
            description: `Tu pedido ha sido procesado. Número de recibo: ${paymentResult.receipt?.receiptNumber}`,
          });
          onSuccess?.(paymentResult);
        } else {
          throw new Error(paymentResult.error || "Payment failed");
        }
      } else {
        throw new Error(result.errors?.[0]?.detail || "Tokenization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Error en el pago",
        description:
          error instanceof Error
            ? error.message
            : "Ocurrió un error procesando el pago",
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPayment = () => {
    if (demoMode) {
      handleDemoPayment();
    } else if (card) {
      handlePayment(card);
    }
  };

  const handleDemoPayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful payment
      const demoResult = {
        success: true,
        transactionId: `demo_${Date.now()}`,
        receipt: {
          receiptNumber: `DEMO-${Date.now()}`,
          amount: finalTotalCents / 100,
          currency: "EUR",
        },
      };

      clearCart();
      toast({
        title: "¡Pago demo exitoso!",
        description: `Simulación de pago completada. Recibo: ${demoResult.receipt.receiptNumber}`,
      });
      onSuccess?.(demoResult);
    } catch (error) {
      console.error("Demo payment error:", error);
      toast({
        title: "Error en pago demo",
        description: "Error en la simulación de pago",
        variant: "destructive",
      });
      onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-forest-green/70">Tu carrito está vacío</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-semibold text-forest-green mb-4">
            Resumen del pedido
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({cart.itemCount} artículos)</span>
              <span>{cart.total.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>{cart.total >= 50 ? "Gratis" : "5.99€"}</span>
            </div>
            <hr className="border-forest-green/20" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{(finalTotalCents / 100).toFixed(2)}€</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold text-forest-green mb-4">
            Método de pago
          </h3>

          {/* Digital Wallets - Only show in production mode */}
          {!demoMode && (
            <div className="space-y-3 mb-6">
              <div ref={googlePayRef} className="min-h-[40px]"></div>
              <div ref={applePayRef} className="min-h-[40px]"></div>
            </div>
          )}

          {/* Card Payment */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-forest-green/70">
              <CreditCard className="w-4 h-4" />
              <span>
                {demoMode ? "Pago de demostración" : "O paga con tarjeta"}
              </span>
            </div>

            {demoMode ? (
              <div className="min-h-[56px] border border-forest-green/20 rounded-md p-3 bg-forest-green/5 flex items-center justify-center">
                <span className="text-forest-green/70 text-sm">
                  🎭 Modo demostración - simula un pago exitoso
                </span>
              </div>
            ) : (
              <div
                ref={cardRef}
                className="min-h-[56px] border border-forest-green/20 rounded-md p-3"
              ></div>
            )}

            <Button
              onClick={handleCardPayment}
              disabled={(!card && !demoMode) || isProcessing}
              className="w-full bg-terracotta hover:bg-terracotta/90 text-beige"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {demoMode ? "Procesando demo..." : "Procesando pago..."}
                </>
              ) : (
                `${demoMode ? "Simular pago" : "Pagar"} ${(finalTotalCents / 100).toFixed(2)}€`
              )}
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-forest-green/60 text-center">
          {demoMode ? (
            <>
              <p>🎭 Modo demostración activo</p>
              <p>No se procesarán pagos reales</p>
            </>
          ) : (
            <>
              <p>🔒 Pago seguro procesado por Square</p>
              <p>Tus datos están protegidos con cifrado SSL</p>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
