import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product } from '../../shared/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  getCartItemKey: (productId: string, selectedSize?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedSize?: string; selectedColor?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string; selectedSize?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; selectedSize?: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const getCartItemKey = (productId: string, selectedSize?: string) => {
  return selectedSize ? `${productId}-${selectedSize}` : productId;
};

const calculateCartTotals = (items: CartItem[]): { total: number; itemCount: number } => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const itemKey = getCartItemKey(product.id, selectedSize);
      
      const existingItemIndex = state.items.findIndex(item => 
        getCartItemKey(item.product.id, item.selectedSize) === itemKey
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, { 
          product, 
          quantity, 
          selectedSize, 
          selectedColor 
        }];
      }

      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_FROM_CART': {
      const { productId, selectedSize } = action.payload;
      const itemKey = getCartItemKey(productId, selectedSize);
      
      const newItems = state.items.filter(item => 
        getCartItemKey(item.product.id, item.selectedSize) !== itemKey
      );
      
      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity, selectedSize } = action.payload;
      const itemKey = getCartItemKey(productId, selectedSize);

      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { productId, selectedSize } });
      }

      const newItems = state.items.map(item => 
        getCartItemKey(item.product.id, item.selectedSize) === itemKey
          ? { ...item, quantity }
          : item
      );

      const { total, itemCount } = calculateCartTotals(newItems);
      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bejaus-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('bejaus-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, selectedSize, selectedColor } });
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, selectedSize } });
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, selectedSize } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemKey
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
