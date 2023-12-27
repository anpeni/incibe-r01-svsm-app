import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { vars } from '../../../../../packages/app/src/themes/variables';
import { useTheme, useMediaQuery } from '@material-ui/core';



interface DataPoint {
  name: string;
  color: string;
  uv: number;
}
interface GraficoHomeBarProps {
  data: DataPoint[];
  simbolo: string;
}

function GraficoHomeBar({ data, simbolo }: GraficoHomeBarProps) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));
  const isLaptop = useMediaQuery(theme.breakpoints.down(1500));
  const formatYAxis = (tickItem: number) => {
    return `${tickItem}${simbolo}`; // Agrega el símbolo de porcentaje
  };

  return (

    <ResponsiveContainer 
    width="100%" 
    height={isMobile ? 150 : 300}

    >
      <BarChart
        data={data}
        margin={{ 
          top: 20, 
          right: isMobile ? 1 : isLaptop ? 5 : 30, 
          left: isMobile ? -25 : 20, 
          bottom: isMobile ? -10 : -10, }}

      >
        <XAxis
          dataKey="name"
          tick={{ 
            fill: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
          }`, 
          fontSize: isMobile ? 10 : 15 }}
          axisLine={false}
          padding={{ 
            left: isMobile ? 1 : -15, 
            right: isMobile ? 1 : -20 
          }}
          tickLine={false}
          label=""
        />
        <YAxis 
              tick={{ 
                fill: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
              }`,  
              fontSize: isMobile ? 10 : 15, 
            }} 
              axisLine={false}
              padding={{ 
                top: isMobile ? 1 : 0,
                bottom: isMobile ? 1 : 10}}
              tickLine={false}
              tickFormatter={formatYAxis}
              label=""
        />
        <Tooltip />
        
        <Bar dataKey="uv" barSize={isMobile ? 5 : isLaptop ? 20 : 40} radius={[20, 20, 20, 20]}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`}  fill={entry.color} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default GraficoHomeBar;
