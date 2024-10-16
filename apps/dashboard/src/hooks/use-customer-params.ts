import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export function useCustomerParams() {
  const [params, setParams] = useQueryStates({
    customerId: parseAsString,
    createCustomer: parseAsBoolean,
  });

  return {
    ...params,
    setParams,
  };
}
