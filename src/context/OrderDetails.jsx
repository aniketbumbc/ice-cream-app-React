import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constant';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

//custom hooks

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      '"useOrderDetails must be used within an OrderDetailsProvider" '
    );
  }
  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props) {
  const [optionCounts, setOptionConts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [total, setTotal] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubtotal('scoops', optionCounts);
    const toppingSubTotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingSubTotal;

    setTotal({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCount = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];

      optionCountsMap.set(itemName, parseInt(newItemCount));
      setOptionConts(newOptionsCount);
    }

    function resetOrder() {
      setOptionConts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    // getter Object containing options count, total and subtotal
    // setter: updateOptionCount
    return [{ ...optionCounts, total }, updateItemCount, resetOrder];
  }, [optionCounts, total]);
  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
