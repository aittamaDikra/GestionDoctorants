package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FormationDoctorant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the FormationDoctorant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormationDoctorantRepository extends JpaRepository<FormationDoctorant, Long> {}
