// ১. প্রতিটি প্রোডাক্ট আইটেমের ইন্টারফেস
export interface OrderItem {
    id: string | number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
}

// ২. মেইন অর্ডার ইন্টারফেস (আপনার Prisma Model অনুযায়ী)
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[]; // Prisma-র 'Json' কে আমরা এখানে 'OrderItem[]' হিসেবে ডিফাইন করছি
    totalAmount: number;
    status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED"; // আপনার Enum অনুযায়ী
    createdAt: string | Date;
}