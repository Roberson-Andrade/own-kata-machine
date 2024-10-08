export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = [head];

    while (queue.length) {
      const next = queue.shift();

      if (next?.value === needle) {
          return true;
      }

      if (next?.left) {
          queue.push(next.left);
      }

      if (next?.right) {
          queue.push(next.right);
      }
    }

    return false;
}
