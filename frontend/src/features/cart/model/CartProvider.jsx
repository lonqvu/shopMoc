import { useMemo, useReducer } from 'react'
import { CartContext } from './cartContext'

function cartReducer(state, action) {
  if (action.type === 'cart/itemAdded') {
    const existing = state.items.find((item) => item.id === action.payload.id)
    return {
      ...state,
      items: existing
        ? state.items.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.payload, quantity: 1 }],
    }
  }
  if (action.type === 'cart/quantityChanged') {
    return {
      ...state,
      items: state.items
        .map((item) => item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item)
        .filter((item) => item.quantity > 0),
    }
  }
  if (action.type === 'cart/itemRemoved') {
    return { ...state, items: state.items.filter((item) => item.id !== action.payload) }
  }
  return state
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const value = useMemo(() => ({
    items: state.items,
    itemCount: state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem: (product) => dispatch({ type: 'cart/itemAdded', payload: product }),
    updateQuantity: (id, quantity) => dispatch({ type: 'cart/quantityChanged', payload: { id, quantity } }),
    removeItem: (id) => dispatch({ type: 'cart/itemRemoved', payload: id }),
  }), [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
