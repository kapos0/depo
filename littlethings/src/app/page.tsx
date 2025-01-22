import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();
    return (
        <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
            <p className="text-gray-600">Signed in as:</p>
            <p className="font-medium text-gray-700">{session?.user?.email}</p>
        </div>
    );
}
