package nl.hu.adsd.dtmreserveringen;

import com.fasterxml.jackson.databind.util.JSONPObject;
import jakarta.persistence.*;
import java.util.Arrays;

@Entity
@Table(name = "product")
public class Product {

    @Id
    private int id;

    private String name;
    private String description;
    private String details;
    private String contents;
    private Js

    //Transient means there is no corresponding column in the db
    @Transient
    private String[] imagePaths;
    @Transient
    private String[] imageAltTexts;


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
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", details='" + details + '\'' +
                ", contents='" + contents + '\'' +
                ", imageIds=" + Arrays.toString(imageIds) +
                ", imagePaths=" + Arrays.toString(imagePaths) +
                ", imageAltTexts=" + Arrays.toString(imageAltTexts) +
                '}';
    }
}
