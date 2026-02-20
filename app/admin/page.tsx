import React from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }: any) => (
    <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-2xl space-y-4">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-[#004d4d]/5 rounded-xl text-[#004d4d]">{icon}</div>
            <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
        </div>
        <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">{title}</p>
            <h3 className="text-3xl font-serif text-[#004d4d] mt-1">{value}</h3>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="space-y-10">
            {/* Welcome Header */}
            <div className="space-y-2">
                <h1 className="font-serif text-4xl text-[#004d4d]">Morning, <span className="italic text-[#b87333]">Admin.</span></h1>
                <p className="text-gray-400 text-sm">Heres whats happening in LuxeLane today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$42,500" icon={<DollarSign size={24} />} trend="+12%" />
                <StatCard title="Orders" value="154" icon={<ShoppingCart size={24} />} trend="+8%" />
                <StatCard title="Active Items" value="48" icon={<Package size={24} />} trend="0%" />
                <StatCard title="Customers" value="1,240" icon={<Users size={24} />} trend="+5%" />
            </div>

            {/* Recent Orders Placeholder */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h4 className="font-serif text-xl text-[#004d4d] mb-6">Recent Transactions</h4>
                <div className="text-center py-20 text-gray-300 italic font-light">
                    Connecting to database for live orders...
                </div>
            </div>
        </div>
    );
}
