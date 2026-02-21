import { prisma } from "@/src/lib/server/prisma"; // Adjust path to your prisma file

const AllUsers = async () => {
    // Fetch directly from DB [Next.js Server Components](https://nextjs.org)
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-[#004d4d]">Exclusive Members</h1>
            <div className="grid gap-4">
                {users.map((user) => (
                    <div key={user.id} className="p-4 border border-gray-100 rounded-xl shadow-sm bg-white">
                        <p className="font-bold text-[#004d4d]">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className="text-[10px] uppercase font-black text-[#b87333]">{user.role}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
