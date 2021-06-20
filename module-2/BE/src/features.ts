export const shuffle = (array: any[]) => {
  let currentIndex = array.length; let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const findById = (array: any,id: string) => array.find((item: any) => item === id)