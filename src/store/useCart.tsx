import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// প্রোডাক্টের টাইপ নির্ধারণ
interface Product {
    id: string | number;
    name: string;
    price: number;
    img: string;
    category?: string;
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

            // কার্ট ওপেন এবং ক্লোজ হ্যান্ডলার
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),

            // প্রোডাক্ট যোগ করা
            addItem: (product) => set((state) => {
                const isExist = state.cartItems.find((item) => item.id === product.id);
                if (isExist) return state; // যদি অলরেডি থাকে তবে আর যোগ হবে না
                return { cartItems: [...state.cartItems, product] };
            }),

            // প্রোডাক্ট রিমুভ করা
            removeItem: (id) => set((state) => ({
                cartItems: state.cartItems.filter((item) => item.id !== id),
            })),

            // কার্ট খালি করা
            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'luxelane-cart-storage', // লোকাল স্টোরেজে এই নামে সেভ হবে
        }
    )
);
