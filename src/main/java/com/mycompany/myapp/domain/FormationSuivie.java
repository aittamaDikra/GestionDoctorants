package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A FormationSuivie.
 */
@Entity
@Table(name = "formation_suivie")
public class FormationSuivie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "duree", nullable = false)
    private Integer duree;

    @NotNull
    @Column(name = "attestation", nullable = false)
    private String attestation;

    @ManyToOne
    @JsonIgnoreProperties(value = { "formationSuivies" }, allowSetters = true)
    private FormationDoctoranle formationDoctoranle;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "sujet", "user", "promotion", "cursus", "formationDoctorants", "formationSuivies" },
        allowSetters = true
    )
    private Doctorant doctorant;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FormationSuivie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDuree() {
        return this.duree;
    }

    public FormationSuivie duree(Integer duree) {
        this.setDuree(duree);
        return this;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public String getAttestation() {
        return this.attestation;
    }

    public FormationSuivie attestation(String attestation) {
        this.setAttestation(attestation);
        return this;
    }

    public void setAttestation(String attestation) {
        this.attestation = attestation;
    }

    public FormationDoctoranle getFormationDoctoranle() {
        return this.formationDoctoranle;
    }

    public void setFormationDoctoranle(FormationDoctoranle formationDoctoranle) {
        this.formationDoctoranle = formationDoctoranle;
    }

    public FormationSuivie formationDoctoranle(FormationDoctoranle formationDoctoranle) {
        this.setFormationDoctoranle(formationDoctoranle);
        return this;
    }

    public Doctorant getDoctorant() {
        return this.doctorant;
    }

    public void setDoctorant(Doctorant doctorant) {
        this.doctorant = doctorant;
    }

    public FormationSuivie doctorant(Doctorant doctorant) {
        this.setDoctorant(doctorant);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FormationSuivie)) {
            return false;
        }
        return id != null && id.equals(((FormationSuivie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FormationSuivie{" +
            "id=" + getId() +
            ", duree=" + getDuree() +
            ", attestation='" + getAttestation() + "'" +
            "}";
    }
}
