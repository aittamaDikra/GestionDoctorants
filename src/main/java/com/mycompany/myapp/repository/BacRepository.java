package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bac;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Bac entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BacRepository extends JpaRepository<Bac, Long> {}
