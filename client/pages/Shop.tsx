import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, Filter, Grid3X3, List } from 'lucide-react';
import { mockProducts, Product } from '../../shared/types';
import { useCart } from '../contexts/CartContext';

export default function Shop() {
  const { addToCart, cart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'featured'>('featured');

  const categories = [
    { id: 'all', name: 'Todos los productos' },
    { id: 'clothing', name: 'Ropa' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'vinyl', name: 'Vinilos' },
    { id: 'coffee', name: 'Café' }
  ];

  const filteredProducts = mockProducts
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'featured':
          return Number(b.featured) - Number(a.featured);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const getCartItemCount = (productId: string) => {
    return cart.items
      .filter(item => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <div className="bg-forest-green text-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-beige/70 hover:text-beige text-sm mb-2 block">
                ← Volver al inicio
              </Link>
              <h1 className="text-4xl font-bold mb-2">Tienda Bejaus</h1>
              <p className="text-beige/80">Productos únicos para amantes de la música y el café</p>
            </div>
            <Link to="/cart" className="relative">
              <Button variant="outline" size="lg" className="border-beige text-beige hover:bg-beige hover:text-forest-green">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Carrito
                {cart.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-terracotta text-beige border-0 text-xs">
                    {cart.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-forest-green text-beige hover:bg-forest-green/90" 
                  : "border-forest-green text-forest-green hover:bg-forest-green hover:text-beige"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-forest-green/20 rounded-md px-3 py-2 bg-white text-forest-green focus:ring-2 focus:ring-forest-green/20"
            >
              <option value="featured">Destacados</option>
              <option value="name">Nombre A-Z</option>
              <option value="price">Precio: menor a mayor</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-forest-green/20 rounded-md overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' 
                  ? "bg-forest-green text-beige" 
                  : "text-forest-green hover:bg-forest-green/10"
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' 
                  ? "bg-forest-green text-beige" 
                  : "text-forest-green hover:bg-forest-green/10"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-6"
        }>
          {filteredProducts.map(product => (
            <Card key={product.id} className={`group overflow-hidden bg-white border-forest-green/10 hover:shadow-lg transition-all duration-300 ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              {/* Product Image */}
              <div className={`bg-forest-green/5 overflow-hidden ${
                viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
              }`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-terracotta text-beige border-0">
                    Destacado
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Agotado</Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-forest-green mb-2 hover:text-forest-green/80 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-forest-green/70 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-forest-green">
                    {product.price}€
                  </span>
                  {product.sizes && (
                    <span className="text-xs text-forest-green/60">
                      {product.sizes.join(', ')}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 bg-forest-green hover:bg-forest-green/90 text-beige"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {getCartItemCount(product.id) > 0 
                      ? `En carrito (${getCartItemCount(product.id)})` 
                      : 'Añadir'
                    }
                  </Button>
                  
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-beige">
                      Ver
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-forest-green/70 text-lg mb-4">No se encontraron productos en esta categoría</p>
            <Button 
              onClick={() => setSelectedCategory('all')}
              className="bg-forest-green hover:bg-forest-green/90 text-beige"
            >
              Ver todos los productos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
