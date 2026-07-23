// "use client"
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

// const SalesChart = ({ data }: { data: any[] }) => {
//     return (
//         <ResponsiveContainer width="100%" height={300}>
//             <LineChart className='w-full h-full' data={data} margin={{ top:5, right:20, bottom:5, left:0 }}>
//                 <Line type="monotone" dataKey="sales" stroke="#8884d8"/>
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip/>
//             </LineChart>
//         </ResponsiveContainer>
//     )
// }

// export default SalesChart




"use client"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

// Customização do Tooltip para exibir em R$ bonitinho
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-md">
        <p className="text-xs text-gray-500 font-medium capitalize">{label}</p>
        <p className="text-sm font-bold text-blue-600">
          R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    )
  }
  return null
}

const SalesChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        {/* Definição do Gradiente */}
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Linhas de grade suaves apenas na horizontal */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

        {/* Eixo X */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          dy={10}
        />

        {/* Eixo Y formatado em R$ */}
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9ca3af', fontSize: 12 }}
          tickFormatter={(value) => `${value}`}
        />

        {/* Tooltip moderno e personalizado */}
        <Tooltip content={<CustomTooltip />} />

        {/* Área preenchida com o gradiente */}
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#2563eb"
          strokeWidth={1}
          fillOpacity={1}
          fill="url(#colorSales)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SalesChart