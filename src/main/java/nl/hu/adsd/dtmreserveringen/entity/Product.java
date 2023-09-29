package nl.hu.adsd.dtmreserveringen.entity;

import jakarta.persistence.*;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String details;
    private String contents;

    //Transient means there is no corresponding column in the db
    @Transient
    private List<String> imagePaths;
    @Transient
    private List<String> imageAltTexts;


    @OneToMany(mappedBy = "product")
    private List<Item> items;

    @OneToMany(mappedBy = "product")
    private List<ImagePathFromId> imagePathFromIds;

    protected Product() {

    }

    public Product(int id, String name, String description, String details, String contents, String imageIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.details = details;
        this.contents = contents;
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

//    public List<Integer> getImageIds() {
//        JSONObject imageIdsJson = new JSONObject(imageIds);
//        String ids = imageIdsJson.getString("ids");
//        String[] idsArray = ids.split(",");
//
//        List<Integer> idsList = new ArrayList<>(idsArray.length);
//        for (String idString : idsArray) {
//            idsList.add(Integer.parseInt(idString));
//        }
//        return idsList;
//    }

//    //public void setImageIds(String imageIds) {
//        this.imageIds = imageIds;
//    }

    public List<String> getImagePaths() {
        return imagePaths;
    }

    public void setImagePaths(List<String> imagePaths) {
        this.imagePaths = imagePaths;
    }

    public List<String> getImageAltTexts() {
        return imageAltTexts;
    }

    public void setImageAltTexts(List<String> imageAltTexts) {
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
                ", imagePaths=" + imagePaths + '\'' +
                ", imageAltTexts=" + imageAltTexts +
                '}';
    }
}

