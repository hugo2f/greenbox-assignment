import React, { useContext } from 'react';
import { Gauge } from '@ant-design/plots';
import customerData from '../../data/customers.json';
import { SchoolContext } from '../../App';

export const ConversionRate = () => {
  const { school, setSchool } = useContext(SchoolContext);

  var rate = 0;
  var reservations = 0, accounts = 0;
  // Each order is one account, and is also a reservation if has pickupDate
  customerData
  .filter((order) => {
    return (school === "All Schools" || order.school === school);
  })
  .forEach((order) => {
    if ("pickupDate" in order) {
      reservations += 1;
    }
    accounts += 1;
  })
  rate = reservations / accounts;
  
  const config = {
    percent: rate,
    innerRadius: 0.85,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => `${Math.round(rate * 100)}%`,
      },
      content: {
        style: {
          fontSize: '20px',
          lineHeight: '100px',
          color: '#4B535E',
        },
        formatter: () => `${reservations} Reservations, ${accounts} Accounts made`,
      },
    },
  };
  return (
    <>
      <Gauge  {...config} />
    </>
  );
};