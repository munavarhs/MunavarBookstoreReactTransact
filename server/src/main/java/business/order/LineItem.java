package business.order;

public record LineItem(long orderId, long bookId, int quantity) {
    public LineItem(long orderId, long bookId, int quantity) {
        this.orderId = orderId;
        this.bookId = bookId;
        this.quantity = quantity;
    }

    @Override
    public long orderId() {
        return orderId;
    }

    @Override
    public long bookId() {
        return bookId;
    }

    @Override
    public int quantity() {
        return quantity;
    }
}
