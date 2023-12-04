export const addThousandSeparators = (number: string) => {
  const result = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result
}