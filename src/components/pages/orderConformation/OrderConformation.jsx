import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../../context/OrderDetails';

export default function OrderConformation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch((err) => {});
  }, []);

  function handleClick() {
    resetOrder();

    setOrderPhase('inProgress');
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank You</h1>
        <p>Your Order number is {orderNumber}</p>
        <p style={{ fontSize: '70%' }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
