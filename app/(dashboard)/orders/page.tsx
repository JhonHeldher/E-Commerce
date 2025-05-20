import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orders/OrderColumns"
import { Separator } from "@/components/ui/separator"

const Orders = async () => {
    const res = await fetch("http://localhost:3000/api/orders")
    const orders = await res.json()

    return (
        <div className="px-10 py-5">
            <span className="text-[30px] text-gray-500 font-bold">Orders</span>
            <Separator className="my-5 bg-gray-500" />
            <DataTable columns={columns} data={orders} searchKey="_id"/>
        </div>
    )
}

export default Orders