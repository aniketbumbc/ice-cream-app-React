import Options from './Options';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../../context/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sundae!!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.total.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}> Order Sundae!</Button>
    </div>
  );
}
