import { Task } from "./interfaces";

export const shuffle = (array: any[]) => {
  let currentIndex = array.length,  randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const findById = (array: [],id: string) => array.find(item => item === id)