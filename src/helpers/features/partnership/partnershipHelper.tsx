export const toggleIdInArrayList = (
  arrayList: number[],
  newId: number,
  setArrayList: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const updatedArrayList = [...arrayList]; // Create a copy of the original array

  if (updatedArrayList.includes(newId)) {
    // If newId is already in the array, remove it
    const index = updatedArrayList.indexOf(newId);
    if (index !== -1) {
      updatedArrayList.splice(index, 1);
    }
  } else {
    // If newId is not in the array, add it
    updatedArrayList.push(newId);
  }

  // Update the state with the updated array
  setArrayList(updatedArrayList);
};
