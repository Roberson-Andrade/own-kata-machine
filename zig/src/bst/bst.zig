const std = @import("std");

const Allocator = std.mem.Allocator;
const ArenaAlloc = std.heap.ArenaAllocator;

const TreeNode = struct { left: ?*TreeNode, right: ?*TreeNode, value: u8 };

const Tree = struct {
    arena: ArenaAlloc,
    head: ?*TreeNode,

    const Self = @This();

    pub fn init(gpa: Allocator) Tree {
        return Tree{ .head = null, .arena = ArenaAlloc.init(gpa) };
    }

    pub fn deinit(self: *Tree) void {
        self.arena.deinit();
    }

    pub fn insert(self: *Tree, value: u8) !void {
        var it = &self.head;

        while (it.*) |node| {
            if (value > node.value) {
                it = &node.right;
            } else {
                it = &node.left;
            }
        }

        const node = try self.createNode(value);
        it.* = node;
    }

    pub fn find(self: *Tree, value: u8) ?*TreeNode {
        const targetRef = Self.findRef(self, value);

        return targetRef.*;
    }

    pub fn findRef(self: *Tree, value: u8) *?*TreeNode {
        var it = &self.head;

        while (it.*) |node| {
            if (value == node.value) {
                break;
            }

            if (value > node.value) {
                it = &node.right;
            } else {
                it = &node.left;
            }
        }

        return it;
    }

    pub fn delete(self: *Tree, value: u8) void {
        _ = self.deleteRecursive(self.head, value);
    }

    fn deleteRecursive(self: *Tree, current: ?*TreeNode, value: u8) ?*TreeNode {
        const curr = current orelse return null;

        if (value > curr.value) {
            curr.right = deleteRecursive(self, curr.right, value);
        } else if (value < curr.value) {
            curr.left = deleteRecursive(self, curr.left, value);
        } else {
            const isLeaf = curr.left == null and curr.right == null;

            if (isLeaf) {
                self.arena.allocator().destroy(curr);
                return null;
            }

            if (curr.left == null) {
                self.arena.allocator().destroy(curr);
                return curr.right;
            }

            if (curr.right == null) {
                self.arena.allocator().destroy(curr);
                return curr.left;
            }
        }

        return curr;
    }

    pub fn contains(self: *Tree, value: u8) bool {
        const target = Self.find(self, value);

        return target != null;
    }

    pub fn max(self: *Tree) ?*TreeNode {
        var target = self.head;

        while (target != null and target.?.right != null) {
            target = target.?.right;
        }

        return target;
    }

    pub fn min(self: *Tree) ?*TreeNode {
        var target = self.head;

        while (target != null and target.?.left != null) {
            target = target.?.left;
        }

        return target;
    }

    fn createNode(self: *Tree, value: u8) !*TreeNode {
        const node = try self.arena.allocator().create(TreeNode);

        node.* = .{ .value = value, .left = null, .right = null };

        return node;
    }
};

const testAlloc = std.testing.allocator;

test "insert" {
    var sut = Tree.init(testAlloc);
    defer sut.deinit();

    try sut.insert(10);
    try sut.insert(5);
    try sut.insert(8);
    try sut.insert(4);
    try sut.insert(1);
    try sut.insert(12);

    //            10
    //          /    \
    //         5      12
    //       /   \
    //      4     8
    //     /
    //    1

    try std.testing.expectEqual(@as(u8, 10), sut.head.?.value);
    try std.testing.expectEqual(@as(u8, 5), sut.head.?.left.?.value);
    try std.testing.expectEqual(@as(u8, 8), sut.head.?.left.?.right.?.value);
    try std.testing.expectEqual(@as(u8, 4), sut.head.?.left.?.left.?.value);
    try std.testing.expectEqual(@as(u8, 1), sut.head.?.left.?.left.?.left.?.value);
    try std.testing.expectEqual(@as(u8, 12), sut.head.?.right.?.value);
}

test "contains" {
    var sut = Tree.init(testAlloc);
    defer sut.deinit();

    try sut.insert(10);
    try sut.insert(5);
    try sut.insert(8);

    //        10
    //       /
    //      5
    //       \
    //        8

    try std.testing.expect(sut.contains(10));
    try std.testing.expect(sut.contains(5));
    try std.testing.expect(sut.contains(8));
    try std.testing.expect(sut.contains(1) == false);
}

test "find" {
    var sut = Tree.init(testAlloc);
    defer sut.deinit();

    try sut.insert(10);
    try sut.insert(5);
    try sut.insert(8);

    //        10
    //       /
    //      5
    //       \
    //        8

    try std.testing.expect(sut.find(10) != null);
    try std.testing.expect(sut.find(5) != null);
    try std.testing.expect(sut.find(8) != null);
    try std.testing.expect(sut.find(1) == null);
}

test "max/min" {
    var sut = Tree.init(testAlloc);
    defer sut.deinit();

    try sut.insert(10);
    try sut.insert(5);
    try sut.insert(8);
    try sut.insert(4);
    try sut.insert(1);
    try sut.insert(12);

    //            10
    //          /    \
    //         5      12
    //       /   \
    //      4     8
    //     /
    //    1

    try std.testing.expect(sut.max().?.value == 12);
    try std.testing.expect(sut.min().?.value == 1);
}

test "Delete" {
    var sut = Tree.init(testAlloc);
    defer sut.deinit();

    try sut.insert(10);
    try sut.insert(5);
    try sut.insert(15);
    try sut.insert(3);
    try sut.insert(1);
    try sut.insert(7);
    try sut.insert(6);
    try sut.insert(9);
    try sut.insert(17);

    //                10
    //              /    \
    //             5      15
    //           /   \       \
    //          3     7       17
    //         /     / \
    //        1     6   9

    // Delete leaf node
    try std.testing.expect(sut.find(1).?.value == 1);
    sut.delete(1);
    try std.testing.expect(sut.find(1) == null);

    // delete 1 child node
    try std.testing.expect(sut.find(15).?.value == 15);
    sut.delete(15);
    try std.testing.expect(sut.find(15) == null);
}
