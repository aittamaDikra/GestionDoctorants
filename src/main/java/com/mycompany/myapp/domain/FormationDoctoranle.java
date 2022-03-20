package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A FormationDoctoranle.
 */
@Entity
@Table(name = "formation_doctoranle")
public class FormationDoctoranle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "thematique", nullable = false)
    private String thematique;

    @Column(name = "date_de_formation")
    private LocalDate dateDeFormation;

    @Column(name = "duree_de_formation")
    private Integer dureeDeFormation;

    @OneToMany(mappedBy = "formationDoctoranle")
    @JsonIgnoreProperties(value = { "formationDoctoranle", "doctorant" }, allowSetters = true)
    private Set<FormationSuivie> formationSuivies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FormationDoctoranle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getThematique() {
        return this.thematique;
    }

    public FormationDoctoranle thematique(String thematique) {
        this.setThematique(thematique);
        return this;
    }

    public void setThematique(String thematique) {
        this.thematique = thematique;
    }

    public LocalDate getDateDeFormation() {
        return this.dateDeFormation;
    }

    public FormationDoctoranle dateDeFormation(LocalDate dateDeFormation) {
        this.setDateDeFormation(dateDeFormation);
        return this;
    }

    public void setDateDeFormation(LocalDate dateDeFormation) {
        this.dateDeFormation = dateDeFormation;
    }

    public Integer getDureeDeFormation() {
        return this.dureeDeFormation;
    }

    public FormationDoctoranle dureeDeFormation(Integer dureeDeFormation) {
        this.setDureeDeFormation(dureeDeFormation);
        return this;
    }

    public void setDureeDeFormation(Integer dureeDeFormation) {
        this.dureeDeFormation = dureeDeFormation;
    }

    public Set<FormationSuivie> getFormationSuivies() {
        return this.formationSuivies;
    }

    public void setFormationSuivies(Set<FormationSuivie> formationSuivies) {
        if (this.formationSuivies != null) {
            this.formationSuivies.forEach(i -> i.setFormationDoctoranle(null));
        }
        if (formationSuivies != null) {
            formationSuivies.forEach(i -> i.setFormationDoctoranle(this));
        }
        this.formationSuivies = formationSuivies;
    }

    public FormationDoctoranle formationSuivies(Set<FormationSuivie> formationSuivies) {
        this.setFormationSuivies(formationSuivies);
        return this;
    }

    public FormationDoctoranle addFormationSuivie(FormationSuivie formationSuivie) {
        this.formationSuivies.add(formationSuivie);
        formationSuivie.setFormationDoctoranle(this);
        return this;
    }

    public FormationDoctoranle removeFormationSuivie(FormationSuivie formationSuivie) {
        this.formationSuivies.remove(formationSuivie);
        formationSuivie.setFormationDoctoranle(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FormationDoctoranle)) {
            return false;
        }
        return id != null && id.equals(((FormationDoctoranle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FormationDoctoranle{" +
            "id=" + getId() +
            ", thematique='" + getThematique() + "'" +
            ", dateDeFormation='" + getDateDeFormation() + "'" +
            ", dureeDeFormation=" + getDureeDeFormation() +
            "}";
    }
}
