import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Completed', value: 50 },
    { name: 'In Progress', value: 30 },
    { name: 'Delayed', value: 10 },
    { name: 'Cancelled', value: 10 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#FF4B4B'];

const Chart = () => {
    return (
        <PieChart width={300} height={250}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default Chart;
