import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orders/OrderColumns"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"

const Orders = async () => {
    let orders = []

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/orders`,
            { cache: 'no-store' }
        )
        if (res.ok) {
            orders = await res.json()
        }
    } catch (error) {
        console.error("[ORDERS_GET_ERROR]", error)
    }

    return (
        <div className="px-10 py-8 max-w-7xl mx-auto max-sm:px-4">
            <span className="text-3xl text-gray-800 font-bold tracking-tight">Orders</span>

            <Separator className="my-5 bg-gray-200" />

            <DataTable columns={columns} data={orders} searchKey="_id" />
        </div>
    )
}

export default Orders