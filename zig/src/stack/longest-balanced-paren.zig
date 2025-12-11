const std = @import("std");

pub fn longestBalancedParenthesis(gpa: std.mem.Allocator, string: []const u8) !usize {
    var pairs: usize = 0;

    var stack = std.array_list.Managed(u8).init(gpa);
    defer stack.deinit();

    for (string) |char| {
        if (char == '(') {
            try stack.append(char);
            continue;
        }

        if (stack.items.len > 0) {
            _ = stack.pop();
            pairs += 1;
        }
    }

    return pairs * 2;
}

test "should work" {
    const alocator = std.testing.allocator;
    try std.testing.expectEqual(12, try longestBalancedParenthesis(alocator, ")()(())()()))())))"));
}
