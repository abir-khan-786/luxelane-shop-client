export interface Product {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    category: string;
    image: string;
    stock: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}
