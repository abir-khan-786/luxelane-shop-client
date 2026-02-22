import DeleteUserButton from "@/src/components/CoustomBtn/DeleteUserButton";
import RoleButton from "@/src/components/CoustomBtn/RoleButton";
import { prisma } from "@/src/lib/server/prisma";

const Customers = async () => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[#004d4d]">Exclusive Members</h1>
                    <span className="bg-[#004d4d]/10 text-[#004d4d] px-3 py-1 rounded-full text-xs font-medium">
                        Total: {users.length}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">User Info</th>
                                <th className="px-6 py-4 font-semibold text-center">Current Role</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800">{user.name || "No Name"}</span>
                                            <span className="text-sm text-gray-500">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.role === 'ADMIN'
                                            ? "bg-orange-100 text-[#b87333]"
                                            : "bg-blue-100 text-blue-700"
                                            }`}>
                                            {user.role || "user"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end items-center gap-3">
                                            {/* Role Update Button */}
                                            <RoleButton userId={user.id} role={user.role || "user"} />

                                            {/* Delete User Button */}
                                            <DeleteUserButton userId={user.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="p-20 text-center text-gray-400">
                        No members found in the database.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
