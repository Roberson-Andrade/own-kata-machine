declare type Point = {
  x: number;
  y: number;
}

declare interface StackNode<T> {
  value: T;
  prev?: StackNode<T>;
}

declare type BinaryNode<T> = {
  value: T;
  left: BinaryNode<T> | null;
  right: BinaryNode<T> | null;
};