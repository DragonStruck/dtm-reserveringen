package nl.hu.adsd.dtmreserveringen;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.util.Arrays;

@Entity
@Table(name = "product")
public class Product {

    @Id
    private int id;
    private int typeId;

    private String name;
    private String description;
    private String details;
    private String contents;

    //Transient means there is no corresponding column in the db
    @Transient
    private String typeString;
    @Transient
    private int[] imageIds;
    @Transient
    private String[] imagePaths;
    @Transient
    private String[] imageAltTexts;

    public Product() {

    }

    public Product(String name, String description, String details, String contents, String typeString, String[] imagePaths, String[] imageAltTexts) {
        this.name = name;
        this.description = description;
        this.details = details;
        this.contents = contents;
        this.typeString = typeString;
        this.imagePaths = imagePaths;
        this.imageAltTexts = imageAltTexts;
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

    public String getTypeString() {
        return typeString;
    }

    public void setTypeString(String typeString) {
        this.typeString = typeString;
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

    public void setImagePaths(String[] imagePaths) {
        this.imagePaths = imagePaths;
    }

    public String[] getImageAltTexts() {
        return imageAltTexts;
    }

    public void setImageAltTexts(String[] imageAltTexts) {
        this.imageAltTexts = imageAltTexts;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", typeId=" + typeId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", details='" + details + '\'' +
                ", contents='" + contents + '\'' +
                ", typeString='" + typeString + '\'' +
                ", imageIds=" + Arrays.toString(imageIds) +
                ", imagePaths=" + Arrays.toString(imagePaths) +
                ", imageAltTexts=" + Arrays.toString(imageAltTexts) +
                '}';
    }
}
