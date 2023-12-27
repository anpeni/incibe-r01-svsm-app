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




const data = [
  { name: '1Q20', uv: 65, color: '#06B08B' },
  { name: '2Q20', uv: 59, color:  '#EE3131'},
  { name: '3Q20', uv: 80, color: '#CCCA5F' },
  { name: '4Q20', uv: 81, color: '#F48E45' },
  { name: '1Q21', uv: 56, color: '#79CB77' },
  { name: '2Q21', uv: 55, color: '#F04736' },
  { name: '3Q21', uv: 40, color: '#3CACF3' },
  // ... otros datos
];


function GraficoHomeBar({ simbolo }: { simbolo: string }) {

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
          bottom: isMobile ? -10 : 5, }}
      >
        <XAxis
          dataKey="name"
          tick={{ 
            fill: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
          }`, 
          fontSize: isMobile ? 10 : 20 }}
          axisLine={false}
          padding={{ 
            left: isMobile ? 1 : 10, 
            right: isMobile ? 1 : 20 
          }}
          tickLine={false}
          label=""
        />
        <YAxis 
              tick={{ 
                fill: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
              }`,  
              fontSize: isMobile ? 10 : 20, 
            }} 
              axisLine={false}
              padding={{ 
                top: isMobile ? 1 : 30,
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
