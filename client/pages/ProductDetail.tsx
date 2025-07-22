import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { mockProducts } from '../../shared/types';
import { useCart } from '../contexts/CartContext';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, cart } = useCart();
  
  const product = mockProducts.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    
    // Reset selections after adding
    setQuantity(1);
  };

  const getCartItemCount = () => {
    return cart.items
      .filter(item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize
      )
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-beige">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-forest-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-forest-green/70">
            <Link to="/" className="hover:text-forest-green">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-forest-green">Tienda</Link>
            <span className="mx-2">/</span>
            <span className="text-forest-green font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center text-forest-green hover:text-forest-green/80 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la tienda
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden bg-white border-forest-green/10">
              <div className="aspect-square bg-forest-green/5 relative">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-terracotta text-beige border-0">
                    Destacado
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      Agotado
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Image Thumbnails (if multiple images) */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImageIndex === index 
                        ? 'border-forest-green' 
                        : 'border-transparent hover:border-forest-green/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-forest-green mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-forest-green mb-4">
                {product.price}€
              </p>
              <p className="text-forest-green/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <label className="block text-sm font-medium text-forest-green mb-2">
                    Talla *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size 
                          ? "bg-forest-green text-beige hover:bg-forest-green/90" 
                          : "border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <label className="block text-sm font-medium text-forest-green mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        onClick={() => setSelectedColor(color)}
                        className={selectedColor === color 
                          ? "bg-forest-green text-beige hover:bg-forest-green/90" 
                          : "border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                        }
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-forest-green mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium text-forest-green w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={incrementQuantity}
                    className="border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stock Information */}
            {product.stockCount && (
              <div className="text-sm text-forest-green/70">
                {product.stockCount > 10 
                  ? `✓ En stock (${product.stockCount} disponibles)`
                  : product.stockCount > 0
                  ? `⚠️ Últimas ${product.stockCount} unidades`
                  : '❌ Agotado'
                }
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-forest-green hover:bg-forest-green/90 text-beige text-lg py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {getCartItemCount() > 0 
                  ? `Añadir al carrito (${getCartItemCount()} en carrito)` 
                  : 'Añadir al carrito'
                }
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <Card className="p-4 bg-white border-forest-green/10">
              <h3 className="font-semibold text-forest-green mb-2">Detalles del producto</h3>
              <ul className="text-sm text-forest-green/80 space-y-1">
                <li>• Categoría: {
                  {
                    'clothing': 'Ropa',
                    'accessories': 'Accesorios',
                    'vinyl': 'Vinilos',
                    'coffee': 'Café'
                  }[product.category]
                }</li>
                {product.sizes && <li>• Tallas disponibles: {product.sizes.join(', ')}</li>}
                {product.colors && <li>• Colores disponibles: {product.colors.join(', ')}</li>}
                <li>• Envío gratuito en pedidos superiores a 50€</li>
                <li>• Devoluciones gratuitas en 30 días</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-forest-green mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="group overflow-hidden bg-white border-forest-green/10 hover:shadow-lg transition-all duration-300">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square bg-forest-green/5 overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-forest-green mb-2 group-hover:text-forest-green/80">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-forest-green">
                        {relatedProduct.price}€
                      </p>
                    </div>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
