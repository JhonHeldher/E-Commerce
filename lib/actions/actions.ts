import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongoDB";

export const getTotalSales = async () => {
    await connectToDB();

    const orders = await Order.find()
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);


    return { totalOrders, totalRevenue };
}

export const getTotalCustomers = async () => {
    await connectToDB();

    const customers = await Customer.find();
    const totalCustomers = customers.length;

    return totalCustomers;
}

export const getSalesPerMonth = async () => {
    await connectToDB()
    const orders = await Order.find()

    const salesPerMonth = orders.reduce((acc, order) => {
        const monthIndex = new Date(order.createdAt).getMonth()
        acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;

        return acc
    }, {})

    const graphData = Array.from({ length: 12}, (_, i) => {
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(0, i))
        const totalSales = salesPerMonth[i] || 0;
        
        return { name: month.replace('.', ''), sales: Number(totalSales.toFixed(2))}
    })

    return graphData
}