import './styles.css';
import { useContext } from 'react';
import customerData from '../../data/customers.json';
import { SchoolContext } from '../../App';

export const UpcomingReservations = () => {
  const { school, setSchool } = useContext(SchoolContext);

  var pickups = {}; // Count [customers, items] on each day
  customerData
    .filter((order) => ('pickupDate' in order && (school === "All Schools" || school === order.school)))
    .forEach((order) => {
      if (order.pickupDate in pickups) {
        pickups[order.pickupDate][0] += 1;
        pickups[order.pickupDate][1] += order.numItems;
      } else {
        pickups[order.pickupDate] = [1, order.numItems];
      }
    });

  // Sort by pickup date and turn into array of objects for each table row
  const pickupArr = Object.entries(pickups).sort((a, b) => {
    if (a[0] <= b[0]) {
      return -1;
    } else{
      return 1; // compare date strings
    }
  }).map((item) => {
    const day = new Date(item[0]);
    return ({
      date: `${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`,
      customers: item[1][0],
      items: item[1][1],
    });
  }).slice(0, 5);

  // Do the same for returns
  var returns = {};
  customerData
    .filter((order) => ('returnDate' in order && (school === "All Schools" || school === order.school)))
    .forEach((order) => {
      if (order.returnDate in returns) {
        returns[order.returnDate][0] += 1;
        returns[order.returnDate][1] += order.numItems;
      } else {
        returns[order.returnDate] = [1, order.numItems];
      }
    })

  // Sort by return date, turn into array of objects for each table row
  const returnArr = Object.entries(returns).sort((a, b) => {
    if (a[0] <= b[0]) {
      return -1;
    } else{
      return 1; // compare date strings
    }
  }).map((item) => {
    const day = new Date(item[0]);
    return ({
      date: `${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`,
      customers: item[1][0],
      items: item[1][1],
    });
  }).slice(0, 5);

  return (
    <>
      <div className="table-wrapper">
        <div>
          <div>Pickups</div>
          <table className="table1">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customers</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {pickupArr.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.customers}</td>
                  <td>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div>Returns</div>
          <table className="table2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customers</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {returnArr.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.customers}</td>
                  <td>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}