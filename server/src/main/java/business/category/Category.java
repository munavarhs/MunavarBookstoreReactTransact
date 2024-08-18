
package business.category;

public record Category(long categoryId, String name) {
    @Override
    public long categoryId() {
        return categoryId;
    }

    @Override
    public String name() {
        return name;
    }
}
