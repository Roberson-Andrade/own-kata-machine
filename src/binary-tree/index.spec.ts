import { BinarySearchTree } from ".";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe("insert", () => {
    it("should insert a value into an empty tree", () => {
      bst.insert(10);
      expect(bst.root?.value).toBe(10);
      expect(bst.root?.left).toBeNull();
      expect(bst.root?.right).toBeNull();
    });

    it("should insert a value smaller than the root to the left", () => {
      bst.insert(10);
      bst.insert(5);
      expect(bst.root?.left?.value).toBe(5);
      expect(bst.root?.right).toBeNull();
    });

    it("should insert a value greater than the root to the right", () => {
      bst.insert(10);
      bst.insert(15);
      expect(bst.root?.right?.value).toBe(15);
      expect(bst.root?.left).toBeNull();
    });

    it("should insert multiple values in the correct position", () => {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(17);

      expect(bst.root?.left?.value).toBe(5);
      expect(bst.root?.left?.left?.value).toBe(3);
      expect(bst.root?.left?.right?.value).toBe(7);
      expect(bst.root?.right?.value).toBe(15);
      expect(bst.root?.right?.left?.value).toBe(12);
      expect(bst.root?.right?.right?.value).toBe(17);
    });

    it("should not insert duplicate values", () => {
      bst.insert(10);
      bst.insert(10); // Duplicate
      expect(bst.root?.value).toBe(10);
      expect(bst.root?.left).toBeNull();
      expect(bst.root?.right).toBeNull();
    });
  });

  describe("find", () => {
    beforeEach(() => {
      bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(7);
      bst.insert(12);
      bst.insert(17);
    });

    it("should find an existing value in the tree", () => {
      const node = bst.find(7);
      expect(node?.value).toBe(7);
    });

    it("should return null if the value is not found in the tree", () => {
      const node = bst.find(99);
      expect(node).toBeNull();
    });

    it("should find the root value", () => {
      const node = bst.find(10);
      expect(node?.value).toBe(10);
    });

    it("should find the minimum value in the tree", () => {
      const node = bst.find(3);
      expect(node?.value).toBe(3);
    });

    it("should find the maximum value in the tree", () => {
      const node = bst.find(17);
      expect(node?.value).toBe(17);
    });
  });

  describe("traversals", () => {
    beforeEach(() => {
      bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(17);
    });

    it("should perform in-order traversal (left, root, right)", () => {
      const result = bst.inOrderTraversal();
      expect(result).toEqual([3, 5, 7, 10, 12, 15, 17]);
    });

    it("should perform pre-order traversal (root, left, right)", () => {
      const result = bst.preOrderTraversal();
      expect(result).toEqual([10, 5, 3, 7, 15, 12, 17]);
    });

    it("should perform post-order traversal (left, right, root)", () => {
      const result = bst.postOrderTraversal();
      expect(result).toEqual([3, 7, 5, 12, 17, 15, 10]);
    });
  });

  describe("BinarySearchTree - findMin and findMax methods", () => {
    let bst: BinarySearchTree<number>;

    beforeEach(() => {
      bst = new BinarySearchTree<number>();
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(12);
      bst.insert(17);
    });

    it("should find the minimum value in the tree", () => {
      const minValue = bst.findMin();
      expect(minValue).toBe(3);
    });

    it("should find the maximum value in the tree", () => {
      const maxValue = bst.findMax();
      expect(maxValue).toBe(17);
    });

    it("should return null when finding min in an empty tree", () => {
      const emptyBst = new BinarySearchTree<number>();
      const minValue = emptyBst.findMin();
      expect(minValue).toBeNull();
    });

    it("should return null when finding max in an empty tree", () => {
      const emptyBst = new BinarySearchTree<number>();
      const maxValue = emptyBst.findMax();
      expect(maxValue).toBeNull();
    });

    it("should find the min and max when there is only one node", () => {
      const singleNodeBst = new BinarySearchTree<number>();
      singleNodeBst.insert(10);

      const minValue = singleNodeBst.findMin();
      const maxValue = singleNodeBst.findMax();

      expect(minValue).toBe(10);
      expect(maxValue).toBe(10);
    });
  });

  describe('BinarySearchTree - getHeight and isBalanced methods', () => {
    let bst: BinarySearchTree<number>;
  
    beforeEach(() => {
      bst = new BinarySearchTree<number>();
    });
  
    describe('getHeight', () => {
      it('should return -1 for an empty tree', () => {
        const height = bst.getHeight();
        expect(height).toBe(-1);
      });
  
      it('should return 0 for a tree with one node', () => {
        bst.insert(10);
        const height = bst.getHeight();
        expect(height).toBe(0);
      });
  
      it('should return the correct height for a multi-level tree', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);
        bst.insert(12);
        bst.insert(17);
  
        const height = bst.getHeight();
        expect(height).toBe(2);
      });
    });

    describe('isBalanced', () => {
      it('should return true for an empty tree', () => {
        const balanced = bst.isBalanced();
        expect(balanced).toBe(true);
      });
  
      it('should return true for a balanced tree', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(15);
        bst.insert(3);
        bst.insert(7);
        bst.insert(12);
        bst.insert(17);
  
        const balanced = bst.isBalanced();
        expect(balanced).toBe(true);
      });
  
      it('should return false for an unbalanced tree', () => {
        bst.insert(10);
        bst.insert(5);
        bst.insert(3);
        bst.insert(2);
  
        const balanced = bst.isBalanced();
        expect(balanced).toBe(false);
      });
    });
  })
});
