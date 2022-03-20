package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Sujet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Sujet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SujetRepository extends JpaRepository<Sujet, Long> {}
