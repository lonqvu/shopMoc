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
  return state
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const value = useMemo(() => ({
    items: state.items,
    itemCount: state.items.reduce((total, item) => total + item.quantity, 0),
    addItem: (product) => dispatch({ type: 'cart/itemAdded', payload: product }),
  }), [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
