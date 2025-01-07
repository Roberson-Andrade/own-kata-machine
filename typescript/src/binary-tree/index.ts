export class BinarySearchTree<T> {
  root: BinaryNode<T> | null;

  constructor() {
    this.root = null;
  }

  // Inserts a value into the tree
  insert(value: T): void {
    if (this.root === null) {
      this.root = { value, left: null, right: null };
      return;
    }

    const recursiveInsert = (node: BinaryNode<T>) => {
      if (value === node.value) return;

      if (value > node.value) {
        if (node.right === null) {
          node.right = this.newNode(value);
          return;
        }

        recursiveInsert(node.right);
      }

      if (value <= node.value) {
        if (node.left === null) {
          node.left = this.newNode(value);
          return;
        }

        recursiveInsert(node.left);
      }
    };

    return recursiveInsert(this.root);
  }

  // Finds a value in the tree, returns the node if found, null if not
  find(value: T): BinaryNode<T> | null {
    const findRecursively = (
      node: BinaryNode<T> | null
    ): BinaryNode<T> | null => {
      if (node === null) return null;

      if (node.value === value) {
        return node;
      }

      if (value > node.value) {
        return findRecursively(node.right);
      }

      return findRecursively(node.left);
    };

    return findRecursively(this.root);
  }

  // Deletes a value from the tree
  delete(value: T): void {
    // Not implemented
  }

  // Performs an in-order traversal (left, root, right)
  inOrderTraversal(): T[] {
    const arr: T[] = [];

    const recursively = (node: BinaryNode<T> | null) => {
      if (!node) return;

      recursively(node.left);
      arr.push(node.value);
      recursively(node.right);
    };

    recursively(this.root);

    return arr;
  }

  // Performs a pre-order traversal (root, left, right)
  preOrderTraversal(): T[] {
    const arr: T[] = [];

    const recursively = (node: BinaryNode<T> | null) => {
      if (!node) return;

      arr.push(node.value);
      recursively(node.left);
      recursively(node.right);
    };

    recursively(this.root);

    return arr;
  }

  // Performs a post-order traversal (left, right, root)
  postOrderTraversal(): T[] {
    const arr: T[] = [];

    const recursively = (node: BinaryNode<T> | null) => {
      if (!node) return;

      recursively(node.left);
      recursively(node.right);
      arr.push(node.value);
    };

    recursively(this.root);

    return arr;
  }

  // Returns the minimum value in the tree
  findMin(): T | null {
    if (this.root === null) return null;

    const findMinRecursively = (node: BinaryNode<T>): T | null => {
      if (!node?.left) return node?.value ?? null;

      return findMinRecursively(node.left);
    };

    return findMinRecursively(this.root);
  }

  // Returns the maximum value in the tree
  findMax(): T | null {
    if (this.root === null) return null;

    const findMaxRecursively = (node: BinaryNode<T>): T | null => {
      if (!node?.right) return node?.value ?? null;

      return findMaxRecursively(node.right);
    };

    return findMaxRecursively(this.root);
  }

  // Returns the height of the tree 
  getHeight(): number {
    const dfs = (node: BinaryNode<T> | null): number => {
      if (!node) return 0;

      const leftH = dfs(node.left);
      const rightH = dfs(node.right);

      return Math.max(leftH, rightH) + 1;
    };

    return dfs(this.root);
  }

  // Checks if the tree is balanced
  isBalanced(): boolean {
    const checkBalance = (node: BinaryNode<T> | null): number => {
      if (!node) {
        return 0; // Base case: The height of an empty subtree is 0
      }
  
      const leftHeight = checkBalance(node.left);
      const rightHeight = checkBalance(node.right);
  
      // If any subtree is unbalanced, propagate -1 upwards
      if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
  
      // Return the height of the current node
      return Math.max(leftHeight, rightHeight) + 1;
    };
  
    // A tree is balanced if checkBalance does not return -1
    return checkBalance(this.root) !== -1;
  }

  private newNode(value: T): BinaryNode<T> {
    return {
      left: null,
      right: null,
      value,
    };
  }
}
