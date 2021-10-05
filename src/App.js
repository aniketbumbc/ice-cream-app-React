import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import OrderEntry from './components/pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';

import OrderConformation from '../src/components/pages/orderConformation/OrderConformation';
import OrderSummary from '../src/components/pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;

  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConformation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
