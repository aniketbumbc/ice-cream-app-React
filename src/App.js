import Container from 'react-bootstrap/Container';
import OrderEntry from './components/pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary page and entry page need provider*/}
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
