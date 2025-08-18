import { createContext, useContext, useReducer } from "react";

const CartContext = createContext({});

const initialCart = {
  order: {},
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  tax: 0,
  totalAfterTax: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      return {
        ...state,
        order: action.payload,
      };

    case "ADD_AND_INCREASE": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      const updatedCartItems = existingItem
        ? state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: state.totalAmount + action.payload.price,
        totalQuantity: state.totalQuantity + 1,
      };
    }

    case "DECREASE_AND_REMOVE": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      const updatedCartItems = state.cartItems.reduce((acc, item) => {
        if (item.id === action.payload.id) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity > 0) {
            acc.push({ ...item, quantity: updatedQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: existingItem
          ? state.totalAmount - action.payload.price
          : state.totalAmount,
        totalQuantity:
          existingItem && existingItem.quantity > 0
            ? state.totalQuantity - 1
            : state.totalQuantity,
      };
    }

    case "REMOVE":
      return { ...initialCart };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_AND_INCREASE",
      payload: {
        ...product,
        id: product.dishid, // mapping dishid → id
        price: product.dishprice, // mapping dishprice → price
      },
    });
  };

  const decreaseQuantity = (product) => {
    dispatch({
      type: "DECREASE_AND_REMOVE",
      payload: {
        id: product.dishid,
        price: product.dishprice,
      },
    });
  };

  const createOrder = (order) => {
    dispatch({ type: "CREATE_ORDER", payload: order });
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE" });
  };

  const tax = state.totalAmount * 0.11;

  const value = {
    order: state.order,
    cartItems: state.cartItems,
    totalAmount: state.totalAmount,
    totalQuantity: state.totalQuantity,
    tax: tax,
    totalAfterTax: state.totalAmount + tax,
    addToCart,
    decreaseQuantity,
    createOrder,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
