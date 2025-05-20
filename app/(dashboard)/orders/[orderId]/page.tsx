import React from 'react'

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    // 1. Aguarda a Promise de params e extrai orderId
    const { orderId } = await params;                     

    // 2. Faz o fetch usando o orderId
    const res = await fetch(
        `http://localhost:3000/api/orders/${orderId}`
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
        </div>
    )
}

export default OrderDetails