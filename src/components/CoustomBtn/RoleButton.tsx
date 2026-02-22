"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";


export default function RoleButton({ userId, role }: { userId: string, role: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggle = () => {




        startTransition(async () => {

            const newRole = role === "ADMIN" ? "USER" : "ADMIN";

            await fetch(`/api/users`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, role: newRole }),
            });

            router.refresh();
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className="ml-auto px-3 py-1 bg-[#004d4d] text-white text-[10px] rounded hover:bg-black disabled:opacity-50"
        >
            {isPending ? "Updating..." : role === "ADMIN" ? "Make User" : "Make Admin"}
        </button>
    );
}
