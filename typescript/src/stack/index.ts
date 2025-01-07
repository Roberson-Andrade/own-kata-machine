export class Stack<T> {
  public length: number;
  private head?: StackNode<T>;
  
  constructor() {
      this.head = undefined;
      this.length = 0;
  }

  push(item: T): void {
      const newNode: StackNode<T> = {
          value: item
      }

      this.length++;

      if(!this.head) {
          this.head = newNode;
          return
      } 

      newNode.prev = this.head;
      this.head = newNode;
  }
  pop(): T | undefined {
      this.length = Math.max(0, this.length - 1);
      
      if(!this.head) {
          return undefined;
      }

      const node = this.head;
      this.head = this.head.prev;
      node.prev = undefined;

      return node.value;
  }
  peek(): T | undefined {
      return this.head?.value;
  }
}