export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'clothing' | 'accessories' | 'vinyl' | 'coffee';
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  stockCount?: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export const mockProducts: Product[] = [
  {
    id: 'bejaus-tshirt',
    name: 'Camiseta Bejaus Sessions',
    description: 'Camiseta de algodón orgánico 100% con el logo exclusivo de Bejaus Sessions. Perfecta para los amantes de la música y el café.',
    price: 25,
    images: ['/placeholder.svg'],
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Forest Green', 'Beige'],
    inStock: true,
    stockCount: 50,
    featured: true
  },
  {
    id: 'bejaus-hoodie',
    name: 'Hoodie Bejaus Sessions',
    description: 'Sudadera con capucha de alta calidad. Suave por dentro, resistente por fuera. Ideal para las noches de sesiones.',
    price: 45,
    images: ['/placeholder.svg'],
    category: 'clothing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Forest Green', 'Beige'],
    inStock: true,
    stockCount: 30,
    featured: true
  },
  {
    id: 'bejaus-cap',
    name: 'Gorra Bejaus Sessions',
    description: 'Gorra ajustable con bordado de alta calidad. El complemento perfecto para cualquier outfit casual.',
    price: 20,
    images: ['/placeholder.svg'],
    category: 'accessories',
    inStock: true,
    stockCount: 25,
    featured: false
  },
  {
    id: 'bejaus-tote',
    name: 'Tote Bag Bejaus',
    description: 'Bolsa de tela resistente y ecológica. Perfecta para llevar tus discos, café o cualquier cosa que necesites.',
    price: 15,
    images: ['/placeholder.svg'],
    category: 'accessories',
    inStock: true,
    stockCount: 40,
    featured: false
  },
  {
    id: 'bejaus-vinyl',
    name: 'Compilation Vinyl Vol.1',
    description: 'Recopilación en vinilo de los mejores momentos de nuestras sesiones. Edición limitada numerada.',
    price: 35,
    images: ['/placeholder.svg'],
    category: 'vinyl',
    inStock: true,
    stockCount: 100,
    featured: true
  },
  {
    id: 'bejaus-coffee',
    name: 'Café Bejaus Blend',
    description: 'Mezcla exclusiva de café tostado artesanalmente. El mismo café que servimos en nuestras sesiones.',
    price: 12,
    images: ['/placeholder.svg'],
    category: 'coffee',
    inStock: true,
    stockCount: 80,
    featured: false
  }
];
