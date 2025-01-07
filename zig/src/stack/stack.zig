pub fn Stack(comptime T: type) type {
    return struct {
        const this = @This();

        const Node = struct { data: T, next: ?*Node };
    };
}
