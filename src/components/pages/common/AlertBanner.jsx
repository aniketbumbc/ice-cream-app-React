import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
  const alertMessage = message || 'An unexpected error occured';
  const alerVariant = variant || 'danger';

  return (
    <Alert variant={alerVariant} style={{ backgroundColor: 'red' }}>
      {alertMessage}
    </Alert>
  );
}
