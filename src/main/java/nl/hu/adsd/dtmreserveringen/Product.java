package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name="product")
public class Product {

    @Id
    private int id;
    private int typeId;
    private int statusId;

    private String name;
    private String description;
    private String details;
    private String contents;

    //Transient means there is no corresponding column in the db
    @Transient
    String typeString;
    @Transient
    String statusString;
    @Transient
    int[] imageIds;
    @Transient
    String[] imagePaths;
    @Transient
    String[] imageAltTexts;


    public String getStatusString() {
        return statusString;
    }

    public void setStatusString(String statusString) {
        this.statusString = statusString;
    }

    public int[] getImageIds() {
        return imageIds;
    }

    public void setImageIds(int[] imageIds) {
        this.imageIds = imageIds;
    }

    public String[] getImagePaths() {
        return imagePaths;
    }

    public void setImagePaths(String[] imagePath) {
        this.imagePaths = imagePath;
    }

    public String[] getImageAltTexts() {
        return imageAltTexts;
    }

    public void setImageAltTexts(String[] imageAltTexts) {
        this.imageAltTexts = imageAltTexts;
    }

    public String getTypeString() {
        return typeString;
    }

    public void setTypeString(String typeString) {
        this.typeString = typeString;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getStatusId() {
        return statusId;
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
}
