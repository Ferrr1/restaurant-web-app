import { createContext, useReducer } from "react";

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
      console.log(state);
      return {
        ...state,
        order: action.payload,
      };
    case "ADD_AND_INCREASE":
      return {
        ...state,
        cartItems: state.cartItems.find((item) => item.id === action.payload.id)
          ? state.cartItems.map((item) => {
              if (item.id === action.payload.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          : [...state.cartItems, { ...action.payload, quantity: 1 }],
        totalAmount: state.totalAmount + action.payload.price,
        totalQuantity: state.totalQuantity + 1,
      };
    // case "INCREASE":
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((item) => {
    //       if (item.id === action.payload.id) {
    //         return { ...item, quantity: item.quantity + 1 };
    //       }
    //       return item;
    //     }),
    //     totalAmount: state.totalAmount + action.payload.price,
    //   };
    case "DECREASE_AND_REMOVE":
      return {
        ...state,
        cartItems: state.cartItems.reduce((acc, item) => {
          if (item.id === action.payload.id) {
            const updatedQuantity = item.quantity - 1;
            if (updatedQuantity > 0) {
              acc.push({ ...item, quantity: updatedQuantity });
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []),
        totalAmount: state.cartItems.find(
          (item) => item.id === action.payload.id
        )
          ? state.totalAmount - action.payload.price
          : state.totalAmount,
        totalQuantity:
          state.cartItems.find((item) => item.id === action.payload.id)
            ?.quantity > 0
            ? state.totalQuantity - 1
            : state.totalQuantity,
      };
    case "REMOVE":
      return { ...initialCart };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (product) => {
    dispatch({ type: "ADD_AND_INCREASE", payload: product });
  };

  //   const increaseQuantity = (product) => {
  //     dispatch({ type: "INCREASE", payload: product });
  //   };
  const createOrder = (order) => {
    dispatch({ type: "CREATE_ORDER", payload: order });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE_AND_REMOVE", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE", payload: product });
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
    createOrder,
    decreaseQuantity,
    removeFromCart,
  };
  console.log("value", value);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
