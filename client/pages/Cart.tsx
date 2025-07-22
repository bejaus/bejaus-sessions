import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleUpdateQuantity = (
    productId: string,
    newQuantity: number,
    selectedSize?: string,
  ) => {
    updateQuantity(productId, newQuantity, selectedSize);
  };

  const handleRemoveItem = (productId: string, selectedSize?: string) => {
    removeFromCart(productId, selectedSize);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-beige">
        {/* Header */}
        <div className="bg-forest-green text-beige py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/shop"
              className="text-beige/70 hover:text-beige text-sm mb-2 block"
            >
              ← Volver a la tienda
            </Link>
            <h1 className="text-4xl font-bold">Carrito de compras</h1>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-forest-green/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-forest-green mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-forest-green/70 mb-8">
              ¡Descubre nuestros productos únicos y añade algunos a tu carrito!
            </p>
            <Link to="/shop">
              <Button className="bg-terracotta hover:bg-terracotta/90 text-beige text-lg px-8 py-3">
                Explorar tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="bg-forest-green text-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="text-beige/70 hover:text-beige text-sm mb-2 block"
          >
            ← Continuar comprando
          </Link>
          <h1 className="text-4xl font-bold mb-2">Carrito de compras</h1>
          <p className="text-beige/80">
            {cart.itemCount} {cart.itemCount === 1 ? "artículo" : "artículos"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <Card
                key={`${item.product.id}-${item.selectedSize || "no-size"}`}
                className="p-4 bg-white border-forest-green/10"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-forest-green/5 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-semibold text-forest-green hover:text-forest-green/80"
                        >
                          {item.product.name}
                        </Link>
                        {item.selectedSize && (
                          <p className="text-sm text-forest-green/70">
                            Talla: {item.selectedSize}
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm text-forest-green/70">
                            Color: {item.selectedColor}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleRemoveItem(item.product.id, item.selectedSize)
                        }
                        className="text-forest-green/70 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedSize,
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 p-0 border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium text-forest-green">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedSize,
                            )
                          }
                          className="w-8 h-8 p-0 border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-forest-green">
                          {(item.product.price * item.quantity).toFixed(2)}€
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-forest-green/70">
                            {item.product.price}€ cada uno
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white border-forest-green/10 sticky top-8">
              <h2 className="text-xl font-bold text-forest-green mb-4">
                Resumen del pedido
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-forest-green/70">
                  <span>
                    Subtotal ({cart.itemCount}{" "}
                    {cart.itemCount === 1 ? "artículo" : "artículos"})
                  </span>
                  <span>{cart.total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-forest-green/70">
                  <span>Envío</span>
                  <span>{cart.total >= 50 ? "Gratis" : "5.99€"}</span>
                </div>
                <hr className="border-forest-green/20" />
                <div className="flex justify-between text-lg font-bold text-forest-green">
                  <span>Total</span>
                  <span>
                    {(cart.total + (cart.total >= 50 ? 0 : 5.99)).toFixed(2)}€
                  </span>
                </div>
              </div>

              {cart.total < 50 && (
                <div className="bg-terracotta/10 border border-terracotta/20 rounded-md p-3 mb-4">
                  <p className="text-sm text-terracotta">
                    Añade {(50 - cart.total).toFixed(2)}€ más para conseguir
                    envío gratuito
                  </p>
                </div>
              )}

              <Button
                className="w-full bg-terracotta hover:bg-terracotta/90 text-beige text-lg py-3 mb-3"
                onClick={() => {
                  // This will be connected to Square later
                  alert("Checkout será integrado con Square próximamente");
                }}
              >
                Proceder al pago
              </Button>

              <Link to="/shop">
                <Button
                  variant="outline"
                  className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                >
                  Continuar comprando
                </Button>
              </Link>

              {/* Security & Info */}
              <div className="mt-6 space-y-2 text-xs text-forest-green/60">
                <div className="flex items-center">
                  <span className="mr-2">🔒</span>
                  <span>Pago seguro con Square</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📦</span>
                  <span>Envío gratuito en pedidos +50€</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">↩️</span>
                  <span>Devoluciones gratuitas en 30 días</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
