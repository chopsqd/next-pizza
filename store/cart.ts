import { create } from "zustand";
import type { PizzaSize, PizzaType } from "@/constants";
import { mapPizzaType } from "@/constants";
import { Api } from "@/services/api-client";
import type { CartDTO, CartItemDTO, CreateCartItemDTO } from "@/services/api-client/dto/cart";

interface ICartStateItem {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled: boolean;
  pizzaSize: PizzaSize | null;
  pizzaType: PizzaType | null;
  ingredients: Array<{ name: string; price: number }>;
}

interface ICartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: ICartStateItem[];

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemDTO) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  getCartItemDetails: (item: ICartStateItem) => string;
}

const calcCartItemTotalAmount = ({ productVariant, ingredients, quantity }: CartItemDTO): number => {
  return (productVariant.price + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) * quantity;
};

const getCartDetails = (data: CartDTO) => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcCartItemTotalAmount(item),
    pizzaSize: item.productVariant.size,
    pizzaType: item.productVariant.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map(({ name, price }) => ({ name, price }))
  })) as ICartStateItem[];

  return { items, totalAmount: data.totalAmount || 0 };
};

export const useCartStore = create<ICartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  getCartItemDetails: ({ pizzaSize, pizzaType, ingredients }: ICartStateItem) => {
    let details = "";

    if (pizzaSize && pizzaType) {
      details += `${mapPizzaType[pizzaType]} ${pizzaSize} см`;
    }

    ingredients.forEach((ingredient) => {
      details += `, ${ingredient.name}`;
    });

    return details;
  },

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        )
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
      console.error(error);
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map((item) => ({...item, disabled: false }))
      }));
    }
  },
  addCartItem: async (values: CreateCartItemDTO) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  }
}));