import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"
import React from 'react'

const OrderDetails = async ({ params }: { params: Promise<{ orderId: string }> }) => {
    const { orderId } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/orders/${orderId}`,
        { cache: 'no-store' }
    ); 
    const { orderDetails, customer } = await res.json()

    const { street, city, state, postalCode, country } = orderDetails.shippingAddress

    return (
        <div className="flex flex-col p-10 gap-5">
            <span className="text-[30px] text-gray-500 font-bold">
                Order ID:
                <span className="text-black font-semibold"> {orderDetails._id}</span>
            </span>
            <span className="text-[20px] text-gray-500 font-bold">Customer name:
                <span className="text-black font-semibold"> {customer.name}</span>
            </span>
            <span className="text-[20px] text-gray-500 font-bold">Shipping address:
                <span className="text-black font-semibold"> {street}, {city}, {state}, {postalCode}, {country}</span>
            </span>
            <span className="text-[20px] text-gray-500 font-bold">Total Paid:
                <span className="text-black font-semibold"> ${orderDetails.totalAmount}</span>
            </span>
            <span className="text-[20px] text-gray-500 font-bold">Shipping rate ID:
                <span className="text-black font-semibold"> {orderDetails.shippingRate}</span>
            </span>

            <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
        </div>
    )
}

export default OrderDetails