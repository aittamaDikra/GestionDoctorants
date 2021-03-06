package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Promotion;
import com.mycompany.myapp.repository.PromotionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Promotion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PromotionResource {

    private final Logger log = LoggerFactory.getLogger(PromotionResource.class);

    private static final String ENTITY_NAME = "promotion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PromotionRepository promotionRepository;

    public PromotionResource(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    /**
     * {@code POST  /promotions} : Create a new promotion.
     *
     * @param promotion the promotion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new promotion, or with status {@code 400 (Bad Request)} if the promotion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/promotions")
    public ResponseEntity<Promotion> createPromotion(@Valid @RequestBody Promotion promotion) throws URISyntaxException {
        log.debug("REST request to save Promotion : {}", promotion);
        if (promotion.getId() != null) {
            throw new BadRequestAlertException("A new promotion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Promotion result = promotionRepository.save(promotion);
        return ResponseEntity
            .created(new URI("/api/promotions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /promotions/:id} : Updates an existing promotion.
     *
     * @param id the id of the promotion to save.
     * @param promotion the promotion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promotion,
     * or with status {@code 400 (Bad Request)} if the promotion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the promotion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/promotions/{id}")
    public ResponseEntity<Promotion> updatePromotion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Promotion promotion
    ) throws URISyntaxException {
        log.debug("REST request to update Promotion : {}, {}", id, promotion);
        if (promotion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promotion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promotionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Promotion result = promotionRepository.save(promotion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promotion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /promotions/:id} : Partial updates given fields of an existing promotion, field will ignore if it is null
     *
     * @param id the id of the promotion to save.
     * @param promotion the promotion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promotion,
     * or with status {@code 400 (Bad Request)} if the promotion is not valid,
     * or with status {@code 404 (Not Found)} if the promotion is not found,
     * or with status {@code 500 (Internal Server Error)} if the promotion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/promotions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Promotion> partialUpdatePromotion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Promotion promotion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Promotion partially : {}, {}", id, promotion);
        if (promotion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promotion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promotionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Promotion> result = promotionRepository
            .findById(promotion.getId())
            .map(existingPromotion -> {
                if (promotion.getAnnee() != null) {
                    existingPromotion.setAnnee(promotion.getAnnee());
                }
                if (promotion.getNom() != null) {
                    existingPromotion.setNom(promotion.getNom());
                }

                return existingPromotion;
            })
            .map(promotionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promotion.getId().toString())
        );
    }

    /**
     * {@code GET  /promotions} : get all the promotions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of promotions in body.
     */
    @GetMapping("/promotions")
    public List<Promotion> getAllPromotions() {
        log.debug("REST request to get all Promotions");
        return promotionRepository.findAll();
    }

    /**
     * {@code GET  /promotions/:id} : get the "id" promotion.
     *
     * @param id the id of the promotion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the promotion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/promotions/{id}")
    public ResponseEntity<Promotion> getPromotion(@PathVariable Long id) {
        log.debug("REST request to get Promotion : {}", id);
        Optional<Promotion> promotion = promotionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(promotion);
    }

    /**
     * {@code DELETE  /promotions/:id} : delete the "id" promotion.
     *
     * @param id the id of the promotion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        log.debug("REST request to delete Promotion : {}", id);
        promotionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
