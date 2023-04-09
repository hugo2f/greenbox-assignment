import React, { useState, useContext } from 'react';
import { Column } from '@ant-design/plots';
import customerData from '../../data/customers.json';
import { SchoolContext } from '../../App';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import 'moment/locale/en-gb';

export const RevenueChart = () => {
  const { RangePicker } = DatePicker;
  // Time range considered: dates[0] to dates[1]
  // Default past 3 months, can go back and forward at most 6 months
  const [dates, setDates] = useState([moment().subtract(6, 'months').startOf('month'), moment().endOf('month')]);
  const { school, setSchool } = useContext(SchoolContext);

  const handleDateChange = (date, dateString) => {
    if (dateString.length === 2) {
      setDates([date[0], date[1]]);
    }
  }  

  const disabledDate = (current) => {
    const sixMonthsAgo = moment().subtract(6, 'months').startOf('month');
    const sixMonthsFromNow = moment().add(6, 'months').startOf('month');
    const currentMonth = moment(current).startOf('month');
    return currentMonth.isBefore(sixMonthsAgo) || currentMonth.isAfter(sixMonthsFromNow);
  }
  
  const updateRevenue = (pickupDate, returnDate, monthlyCost) => {
    // For each month stored, add monthlyCost to the month's revenue
    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);

    // Months are 0 based
    var curYear = startDate.getFullYear();
    var curMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    while (curYear < endYear || curMonth < endMonth) {
      const key = `${curYear}-${curMonth}`
      if (key in revenue) {
        revenue[key] += monthlyCost;
      }
      else {
        revenue[key] = monthlyCost
      }
      curMonth += 1
      if (curMonth > 12) {
        curMonth -= 12
        curYear += 1
      }
    }
  }

  const revenue = {} // revenue["year-month"] = revenue that month
  customerData
    .filter((order) => {
      return (school === "All Schools" || order.school === school);
    })
    .forEach((order) => { // Loop through orders
      order.pickupDate && updateRevenue(order.pickupDate, order.returnDate, order.monthlyCost);
    })

  var curYear = dates[0].year();
  var curMonth = dates[0].month() + 1; // moment object months are 0 based
  var toYear = dates[1].year();
  var toMonth = dates[1].month() + 1;

  if (dates[1] < dates[0]) {
    var data = [];
  } else {
    var data = new Array((toYear - curYear) * 12 + toMonth - curMonth + 1); // TODO: date range can change
  }
  for (var idx = 0; idx < data.length; idx++) {
    if (curMonth > 12) {
      curMonth -= 12;
      curYear += 1;
    }
    const date = `${curYear}-${curMonth}`
    data[idx] = {
      month: date,
      revenue: revenue[date] || 0,
    };
    curMonth += 1;
  }

  const config = {
    data,
    title: {
      text: "REVENUE",
    },
    xField: 'month',
    yField: 'revenue',
    xAxis: {
      label: {
        autoHide: false,
        autoRotate: true,
      },
    },
    meta: {
      month: {
        alias: 'month',
      },
      revenue: {
        alias: 'revenue',
      },
    },
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Revenue</h2>
        <RangePicker
          picker="month"
          onChange={handleDateChange}
          value={[dates[0], dates[1]]}
          disabledDate={disabledDate}
        />
      </div>
      <Column  {...config} />
    </>

  );
};