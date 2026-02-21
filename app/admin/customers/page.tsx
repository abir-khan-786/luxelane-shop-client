import RoleButton from "@/src/components/RoleButton/RoleButton";
import { prisma } from "@/src/lib/server/prisma";

const Customers = async () => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-[#004d4d]">Exclusive Members</h1>
            <div className="grid gap-4">
                {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-100 rounded-xl shadow-sm bg-white flex justify-between items-center">
                        <div>
                            <p className="font-bold text-[#004d4d]">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className="text-[10px] uppercase font-black text-[#b87333]">
                                {user.role || "user"}
                            </span>
                        </div>

                        {/* এডমিন চেঞ্জ করার বাটন */}
                        <RoleButton userId={user.id} role={user.role || "user"} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;
