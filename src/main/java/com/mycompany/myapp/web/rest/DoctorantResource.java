package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Doctorant;
import com.mycompany.myapp.repository.DoctorantRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Doctorant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DoctorantResource {

    private final Logger log = LoggerFactory.getLogger(DoctorantResource.class);

    private static final String ENTITY_NAME = "doctorant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DoctorantRepository doctorantRepository;

    private UserRepository userRepository;

    public DoctorantResource(UserRepository userRepository, DoctorantRepository doctorantRepository) {

        this.userRepository = userRepository;
        this.doctorantRepository = doctorantRepository;
    }
    /**
     * {@code POST  /doctorants} : Create a new doctorant.
     *
     * @param doctorant the doctorant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new doctorant, or with status {@code 400 (Bad Request)} if the doctorant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/doctorants")
    public ResponseEntity<Doctorant> createDoctorant(@Valid @RequestBody Doctorant doctorant) throws URISyntaxException {
        log.debug("REST request to save Doctorant : {}", doctorant);
        if (doctorant.getId() != null) {
            throw new BadRequestAlertException("A new doctorant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        doctorant.setUser(userRepository.getByLogin(SecurityUtils.getCurrentUserLogin().get()));

        Doctorant result = doctorantRepository.save(doctorant);
        return ResponseEntity
            .created(new URI("/api/doctorants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /doctorants/:id} : Updates an existing doctorant.
     *
     * @param id the id of the doctorant to save.
     * @param doctorant the doctorant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated doctorant,
     * or with status {@code 400 (Bad Request)} if the doctorant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the doctorant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/doctorants/{id}")
    public ResponseEntity<Doctorant> updateDoctorant(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Doctorant doctorant
    ) throws URISyntaxException {
        log.debug("REST request to update Doctorant : {}, {}", id, doctorant);
        if (doctorant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, doctorant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!doctorantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        doctorant.setUser(userRepository.getByLogin(SecurityUtils.getCurrentUserLogin().get()));
        Doctorant result = doctorantRepository.save(doctorant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, doctorant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /doctorants/:id} : Partial updates given fields of an existing doctorant, field will ignore if it is null
     *
     * @param id the id of the doctorant to save.
     * @param doctorant the doctorant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated doctorant,
     * or with status {@code 400 (Bad Request)} if the doctorant is not valid,
     * or with status {@code 404 (Not Found)} if the doctorant is not found,
     * or with status {@code 500 (Internal Server Error)} if the doctorant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/doctorants/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Doctorant> partialUpdateDoctorant(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Doctorant doctorant
    ) throws URISyntaxException {
        log.debug("REST request to partial update Doctorant partially : {}, {}", id, doctorant);
        if (doctorant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, doctorant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!doctorantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Doctorant> result = doctorantRepository
            .findById(doctorant.getId())
            .map(existingDoctorant -> {
                if (doctorant.getCne() != null) {
                    existingDoctorant.setCne(doctorant.getCne());
                }
                if (doctorant.getEtatProfessionnel() != null) {
                    existingDoctorant.setEtatProfessionnel(doctorant.getEtatProfessionnel());
                }
                if (doctorant.getPhotoCNEPile() != null) {
                    existingDoctorant.setPhotoCNEPile(doctorant.getPhotoCNEPile());
                }
                if (doctorant.getPhotoCNEPileContentType() != null) {
                    existingDoctorant.setPhotoCNEPileContentType(doctorant.getPhotoCNEPileContentType());
                }
                if (doctorant.getPhotoCNEFace() != null) {
                    existingDoctorant.setPhotoCNEFace(doctorant.getPhotoCNEFace());
                }
                if (doctorant.getPhotoCNEFaceContentType() != null) {
                    existingDoctorant.setPhotoCNEFaceContentType(doctorant.getPhotoCNEFaceContentType());
                }
                if (doctorant.getPhotoCv() != null) {
                    existingDoctorant.setPhotoCv(doctorant.getPhotoCv());
                }
                if (doctorant.getPhotoCvContentType() != null) {
                    existingDoctorant.setPhotoCvContentType(doctorant.getPhotoCvContentType());
                }
                if (doctorant.getAnneeInscription() != null) {
                    existingDoctorant.setAnneeInscription(doctorant.getAnneeInscription());
                }
                if (doctorant.getEtatDossier() != null) {
                    existingDoctorant.setEtatDossier(doctorant.getEtatDossier());
                }
                if (doctorant.getCin() != null) {
                    existingDoctorant.setCin(doctorant.getCin());
                }
                if (doctorant.getDateNaissance() != null) {
                    existingDoctorant.setDateNaissance(doctorant.getDateNaissance());
                }
                if (doctorant.getLieuNaissance() != null) {
                    existingDoctorant.setLieuNaissance(doctorant.getLieuNaissance());
                }
                if (doctorant.getNationalite() != null) {
                    existingDoctorant.setNationalite(doctorant.getNationalite());
                }
                if (doctorant.getAdresse() != null) {
                    existingDoctorant.setAdresse(doctorant.getAdresse());
                }
                if (doctorant.getNumeroTelephone() != null) {
                    existingDoctorant.setNumeroTelephone(doctorant.getNumeroTelephone());
                }
                if (doctorant.getGenre() != null) {
                    existingDoctorant.setGenre(doctorant.getGenre());
                }
                if (doctorant.getNomArabe() != null) {
                    existingDoctorant.setNomArabe(doctorant.getNomArabe());
                }
                if (doctorant.getPrnomArabe() != null) {
                    existingDoctorant.setPrnomArabe(doctorant.getPrnomArabe());
                }

                return existingDoctorant;
            })
            .map(doctorantRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, doctorant.getId().toString())
        );
    }

    /**
     * {@code GET  /doctorants} : get all the doctorants.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of doctorants in body.
     */
    @GetMapping("/doctorants")
    public List<Doctorant> getAllDoctorants(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Doctorants");
        return doctorantRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /doctorants/:id} : get the "id" doctorant.
     *
     * @param id the id of the doctorant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the doctorant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/doctorants/{id}")
    public ResponseEntity<Doctorant> getDoctorant(@PathVariable Long id) {
        log.debug("REST request to get Doctorant : {}", id);
        Optional<Doctorant> doctorant = doctorantRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(doctorant);
    }

    /**
     * {@code DELETE  /doctorants/:id} : delete the "id" doctorant.
     *
     * @param id the id of the doctorant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/doctorants/{id}")
    public ResponseEntity<Void> deleteDoctorant(@PathVariable Long id) {
        log.debug("REST request to delete Doctorant : {}", id);
        doctorantRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
