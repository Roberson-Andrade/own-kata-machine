const std = @import("std");
const SinglyLinkedList = std.SinglyLinkedList;

pub fn reverse(list: *std.SinglyLinkedList) void {
    var prev: ?*SinglyLinkedList.Node = null;
    var current = list.first;

    while (current) |c| {
        const next = c.next;
        c.next = prev;
        prev = c;
        current = next;
    }

    list.first = prev;
}

test "reverse using std.SinglyLinkedList" {
    const NodeValue = struct {
        data: u32,
        node: SinglyLinkedList.Node = .{},
    };
    var list: SinglyLinkedList = .{};

    var one: NodeValue = .{ .data = 1 };
    var two: NodeValue = .{ .data = 2 };
    var three: NodeValue = .{ .data = 3 };

    list.prepend(&three.node);
    list.prepend(&two.node);
    list.prepend(&one.node);

    const nodes = [_]NodeValue{ one, two, three };

    reverse(&list);

    var testNode = list.first;

    var len: usize = nodes.len;

    while (len > 0) : (len -= 1) {
        const idx = len - 1;

        const expected = nodes[idx].data;
        const actual = @as(*NodeValue, @fieldParentPtr("node", testNode.?)).data;

        try std.testing.expectEqual(expected, actual);

        testNode = testNode.?.next;
    }
}
