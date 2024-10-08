interface Node<T> {
  value: T;
  next?: Node<T>;
}

export default class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
      this.head = this.tail = undefined;
      this.length = 0;
  }

  enqueue(item: T): void {
      const newNode: Node<T> = {
          value: item,
      };

      if (!this.tail) {
          this.head = this.tail = newNode;
      } else {
          this.tail.next = newNode;
          this.tail = newNode;
      }

      this.length++;

  }
  deque(): T | undefined {
      if(!this.head) return undefined;
      
      this.length--;
      
      const h = this.head;
      this.head = this.head?.next;

      if(this.length === 0) {
          this.tail = undefined;
      }

      return h.value;
  }
  peek(): T | undefined {
      return this.head?.value;
  }
}
