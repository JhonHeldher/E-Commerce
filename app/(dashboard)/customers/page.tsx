import { DataTable } from '@/components/custom ui/DataTable';
import { columns } from '@/components/customers/CustomerColumns';
import { Separator } from '@/components/ui/separator';
import Customer from '@/lib/models/Customer';
import { connectToDB } from '@/lib/mongoDB'
import React from 'react'

const Customers = async () => {
    await connectToDB();

    // 1. Buscamos com .lean()
    const customersRaw = await Customer.find().sort({ createdAt: "desc" }).lean();

    // 2. Criamos um objeto estrito contendo APENAS strings puras
    const customers = customersRaw.map((customer: any) => ({
        _id: customer._id.toString(), // Garante o ID da linha da tabela
        clerkId: customer.clerkId,
        name: customer.name,
        email: customer.email,
    }));

    return (
        <div className="px-10 py-8 max-w-7xl mx-auto max-sm:px-4">

            <span className="text-3xl text-gray-800 font-bold tracking-tight">Customers</span>
            <Separator className="my-5 bg-gray-200" />

            {/* Agora sim o Next.js recebe um objeto 100% limpo sem arrays de dependências ocultas */}
            <DataTable columns={columns} data={customers} searchKey='name' />
        </div>
    )
}

export default Customers