"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({ userId }: { userId: string }) {
    const router = useRouter();

    const confirmDelete = () => {
        // Opening a custom toast with confirmation buttons
        toast((t) => (
            <div className="flex flex-col gap-3">
                <span className="text-sm font-medium  ">
                    Are you sure you want to delete this user?
                </span>
                <div className="flex justify-end gap-2">
                    {/* Cancel Button */}
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 text-xs   "
                    >
                        Cancel
                    </button>
                    {/* Confirm Delete Button */}
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id); // Close the confirmation toast
                            await handleDelete(); // Call the actual delete function
                        }}
                        className="px-3 py-1 text-xs bg-red-600  rounded-md hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: "top-center",
        });
    };

    const handleDelete = async () => {
        const loadingId = toast.loading("Deleting user...");
        try {
            const res = await fetch(`/api/user?userId=${userId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("User deleted successfully!", { id: loadingId });
                router.refresh();
            } else {
                toast.error("Failed to delete user!", { id: loadingId });
            }
        } catch (error) {
            toast.error("An error occurred on the server!", { id: loadingId });
        }
    };

    return (
        <button
            onClick={confirmDelete}
            className="text-gray-400 hover:text-red-600 p-2 transition-all"
        >
            {/* Trash Icon */}
            <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
        </button>
    );
}
