import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface CartPreviewProps {
  children: React.ReactNode;
}

export function CartPreview({ children }: CartPreviewProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

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
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="text-center py-8">
            <ShoppingCart className="w-12 h-12 text-forest-green/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-forest-green mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-forest-green/70 text-sm mb-4">
              ¡Añade algunos productos para empezar!
            </p>
            <Link to="/shop" onClick={() => setIsOpen(false)}>
              <Button className="bg-terracotta hover:bg-terracotta/90 text-beige">
                Explorar tienda
              </Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b border-forest-green/10">
          <h3 className="text-lg font-semibold text-forest-green">
            Tu carrito ({cart.itemCount}{" "}
            {cart.itemCount === 1 ? "artículo" : "artículos"})
          </h3>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {cart.items.map((item, index) => (
            <div
              key={`${item.product.id}-${item.selectedSize || "no-size"}`}
              className="p-4 border-b border-forest-green/5 last:border-b-0"
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 bg-forest-green/5 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-forest-green text-sm leading-tight mb-1">
                    {item.product.name}
                  </h4>
                  {item.selectedSize && (
                    <p className="text-xs text-forest-green/70 mb-1">
                      Talla: {item.selectedSize}
                    </p>
                  )}
                  {item.selectedColor && (
                    <p className="text-xs text-forest-green/70 mb-2">
                      Color: {item.selectedColor}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1">
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
                        className="w-6 h-6 p-0 border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium text-forest-green">
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
                        className="w-6 h-6 p-0 border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-forest-green">
                        {(item.product.price * item.quantity).toFixed(2)}€
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleRemoveItem(item.product.id, item.selectedSize)
                        }
                        className="w-6 h-6 p-0 text-forest-green/70 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary and Actions */}
        <div className="p-4 bg-forest-green/5 border-t border-forest-green/10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-forest-green/70">Subtotal:</span>
            <span className="text-lg font-bold text-forest-green">
              {cart.total.toFixed(2)}€
            </span>
          </div>

          {cart.total < 50 && (
            <p className="text-xs text-terracotta mb-3">
              Añade {(50 - cart.total).toFixed(2)}€ más para conseguir envío
              gratuito
            </p>
          )}

          <div className="space-y-2">
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block">
              <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-beige">
                Ver carrito completo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block"
            >
              <Button
                variant="outline"
                className="w-full border-terracotta text-terracotta hover:bg-terracotta hover:text-beige"
              >
                Proceder al pago
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
