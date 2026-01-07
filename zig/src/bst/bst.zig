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

        return it.*;
    }

    pub fn contains(self: *Tree, value: u8) bool {
        const target = Self.find(self, value);

        return target != null;
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

    try std.testing.expect(sut.find(10) != null);
    try std.testing.expect(sut.find(5) != null);
    try std.testing.expect(sut.find(8) != null);
    try std.testing.expect(sut.find(1) == null);
}
