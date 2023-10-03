package nl.hu.adsd.dtmreserveringen;

public class ProductDto {
    private int id;
    private String name;
    private String description;
    private String details;
    private String contents;
    private String imageIds;

    public ProductDto(int id, String name, String description, String details, String contents, String imageIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.details = details;
        this.contents = contents;
        this.imageIds = imageIds;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getImageIds() {
        return imageIds;
    }

    public void setImageIds(String imageIds) {
        this.imageIds = imageIds;
    }
}
