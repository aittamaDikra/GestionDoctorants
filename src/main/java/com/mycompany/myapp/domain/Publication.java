package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Publication.
 */
@Entity
@Table(name = "publication")
public class Publication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @NotNull
    @Column(name = "date", nullable = false)
    private Integer date;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "type")
    private String type;

    @Lob
    @Column(name = "article")
    private byte[] article;

    @Column(name = "article_content_type")
    private String articleContentType;

    @ManyToOne
    @JsonIgnoreProperties(value = { "internalUser", "publications", "sujets", "membreEquipes" }, allowSetters = true)
    private ExtraUser extraUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Publication id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return this.titre;
    }

    public Publication titre(String titre) {
        this.setTitre(titre);
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Integer getDate() {
        return this.date;
    }

    public Publication date(Integer date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Integer date) {
        this.date = date;
    }

    public String getDescription() {
        return this.description;
    }

    public Publication description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return this.type;
    }

    public Publication type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getArticle() {
        return this.article;
    }

    public Publication article(byte[] article) {
        this.setArticle(article);
        return this;
    }

    public void setArticle(byte[] article) {
        this.article = article;
    }

    public String getArticleContentType() {
        return this.articleContentType;
    }

    public Publication articleContentType(String articleContentType) {
        this.articleContentType = articleContentType;
        return this;
    }

    public void setArticleContentType(String articleContentType) {
        this.articleContentType = articleContentType;
    }

    public ExtraUser getExtraUser() {
        return this.extraUser;
    }

    public void setExtraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
    }

    public Publication extraUser(ExtraUser extraUser) {
        this.setExtraUser(extraUser);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Publication)) {
            return false;
        }
        return id != null && id.equals(((Publication) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Publication{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", date=" + getDate() +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", article='" + getArticle() + "'" +
            ", articleContentType='" + getArticleContentType() + "'" +
            "}";
    }
}
