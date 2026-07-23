import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UsersRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-10 py-8 max-w-7xl mx-auto max-sm:px-4">
      <h1 className="text-3xl text-gray-800 font-bold tracking-tight">
        Dashboard
      </h1>
      <Separator className="my-5 bg-gray-200" />

      {/* Grid: 2 colunas até LG (Tablet/Celular) e 3 colunas em Telas Grandes (Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Total Revenue - Ocupa 2 linhas (row-span-2) até a tela LG */}
        <Card className="row-span-2 lg:row-span-1 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow border-gray-100">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500">
              Total Revenue
            </CardTitle>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CircleDollarSign className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent className="my-auto">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              R${" "}
              {totalRevenue?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              }) || "0,00"}
            </span>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-100">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500">
              Total Orders
            </CardTitle>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-gray-900">
              {totalOrders || 0}
            </span>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-100">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-sm font-semibold text-gray-500">
              Total Customers
            </CardTitle>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <UsersRound className="w-5 h-5" />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold text-gray-900">
              {totalCustomers || 0}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Card do Gráfico */}
      <Card className="mt-8 shadow-sm hover:shadow-md transition-shadow border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Sales Chart (R$)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
