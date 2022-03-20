package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.FormationSuivie;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the FormationSuivie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormationSuivieRepository extends JpaRepository<FormationSuivie, Long> {}
