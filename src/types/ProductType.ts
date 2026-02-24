export interface IProduct {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    category: string;
    image: string;
    stock: number;
    createdAt: string
    updatedAt: string
}
