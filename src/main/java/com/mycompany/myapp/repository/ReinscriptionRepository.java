package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Reinscription;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Reinscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReinscriptionRepository extends JpaRepository<Reinscription, Long> {}
