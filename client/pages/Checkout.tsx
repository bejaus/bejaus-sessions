import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { SquareCheckout } from '../components/SquareCheckout';

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handlePaymentSuccess = (result: any) => {
    setOrderDetails(result);
    setIsSuccess(true);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-beige">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-forest-green mb-4">¡Pago exitoso!</h1>
            <p className="text-forest-green/70 mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación en breve.
            </p>
            
            {orderDetails?.receipt && (
              <div className="bg-forest-green/5 rounded-md p-4 mb-6">
                <h3 className="font-semibold text-forest-green mb-2">Detalles del pedido</h3>
                <p className="text-sm text-forest-green/70">
                  Número de recibo: {orderDetails.receipt.receiptNumber}
                </p>
                <p className="text-sm text-forest-green/70">
                  Total pagado: {orderDetails.receipt.amount.toFixed(2)}€
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link to="/shop">
                <Button className="bg-terracotta hover:bg-terracotta/90 text-beige">
                  Continuar comprando
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-beige">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/shop" className="inline-flex items-center text-forest-green hover:text-forest-green/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la tienda
          </Link>
          
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-forest-green mb-4">Tu carrito está vacío</h1>
            <p className="text-forest-green/70 mb-6">Añade algunos productos antes de proceder al checkout</p>
            <Link to="/shop">
              <Button className="bg-terracotta hover:bg-terracotta/90 text-beige">
                Explorar tienda
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cart" className="inline-flex items-center text-forest-green hover:text-forest-green/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al carrito
        </Link>

        <h1 className="text-3xl font-bold text-forest-green mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-forest-green mb-6">Información de contacto</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest-green mb-2">
                      Nombre *
                    </label>
                    <Input
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      placeholder="Tu nombre"
                      className="border-forest-green/20 focus:ring-forest-green/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest-green mb-2">
                      Apellidos *
                    </label>
                    <Input
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      placeholder="Tus apellidos"
                      className="border-forest-green/20 focus:ring-forest-green/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest-green mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    placeholder="tu@email.com"
                    className="border-forest-green/20 focus:ring-forest-green/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-forest-green mb-2">
                    Teléfono
                  </label>
                  <Input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    placeholder="+34 600 000 000"
                    className="border-forest-green/20 focus:ring-forest-green/20"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-forest-green/5 rounded-md">
                <h3 className="font-semibold text-forest-green mb-2">Productos en tu carrito</h3>
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} {item.selectedSize && `(${item.selectedSize})`} × {item.quantity}
                      </span>
                      <span>{(item.product.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Payment */}
          <div>
            <SquareCheckout
              customerEmail={customerInfo.email}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
