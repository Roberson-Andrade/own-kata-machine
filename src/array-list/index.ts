/* eslint-disable for-direction */
export class ArrayList<T> {
  public length: number;
  private capacity: number;
  private array: T[];

  constructor(capacity: number) {
      this.capacity = capacity;
      this.array = new Array(this.capacity);
      this.length = 0;
  }

  prepend(item: T): void {
      this.length++;

      if(this.length > this.capacity) {
          this.growArray();
      }

      for(let i = this.length - 1; i > 0; i--) {
          this.array[i] = this.array[i - 1];
      }

      this.array[0] = item;
      
  }
  insertAt(item: T, idx: number): void {
      if(!this.checkIndexInBoundary(idx)) return;

      this.length++;

      if(this.length > this.capacity) {
          this.growArray();
      }

      for(let i = this.length - 1; i < idx; i--) {
          this.array[i] = this.array[i - 1];
      }
      
      this.array[idx] = item;
  }
  append(item: T): void {
      this.length++;

      if(this.length > this.capacity) {
          this.growArray();
      }

      this.array[this.length - 1] = item;
  }
  remove(item: T): T | undefined {
      if(this.length === 0) {
          return undefined;
      }

      const foundIndex = this.array.findIndex(arrItem => arrItem === item);

      if(foundIndex === -1) return undefined;

      this.length--;

      for(let i = foundIndex; i < this.length - 1; i++) {
          this.array[i] = this.array[i + 1]; 
      }

      return item;
  }
  get(idx: number): T | undefined {
      if(!this.checkIndexInBoundary(idx)) return undefined;
      
      return this.array[idx];
  }
  removeAt(idx: number): T | undefined {
      if(!this.checkIndexInBoundary(idx)) return undefined;
      

      if(idx === this.length - 1) {
          this.length--;

          return this.array[this.length];
      }

      const removedItem = this.array[idx];

      for(let i = idx; i < this.length - 1; i++) {
          this.array[i] = this.array[i + 1]; 
      }

      this.length--;

      return removedItem;
  }

  private growArray() {
      this.capacity *= 2;

      const newArray = new Array(this.capacity);

      for(const [i, oldItems] of this.array.entries()) {
          newArray[i] = oldItems
      }

      this.array = newArray;
  }

  private checkIndexInBoundary(idx: number): boolean {
      return idx >= 0 && idx < this.length
  }
}
