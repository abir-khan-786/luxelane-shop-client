import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Product interface-e quantity add kora hoyeche
interface Product {
    id: string | number;
    name: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number; // Optional quantity property
}

interface CartStore {
    isOpen: boolean;
    cartItems: Product[];
    onOpen: () => void;
    onClose: () => void;
    addItem: (product: Product) => void;
    removeItem: (id: string | number) => void;
    clearCart: () => void;
}

export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            isOpen: false,
            cartItems: [],

            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),

            addItem: (product) => set((state) => {
                const isExist = state.cartItems.find((item) => item.id === product.id);

                if (isExist) {
                    return {
                        cartItems: state.cartItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: (item.quantity || 1) + 1 }
                                : item
                        ),
                    };
                }
                // Notun product-er shathe default quantity 1 set kora hochche
                return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
            }),

            removeItem: (id) => set((state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== id),
            })),

            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'luxelane-cart-storage',
        }
    )
);
