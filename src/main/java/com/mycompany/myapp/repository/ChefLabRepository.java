package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChefLab;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChefLab entity.
 */
@Repository
public interface ChefLabRepository extends JpaRepository<ChefLab, Long> {
    default Optional<ChefLab> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<ChefLab> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<ChefLab> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct chefLab from ChefLab chefLab left join fetch chefLab.extraUser left join fetch chefLab.laboratoire",
        countQuery = "select count(distinct chefLab) from ChefLab chefLab"
    )
    Page<ChefLab> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct chefLab from ChefLab chefLab left join fetch chefLab.extraUser left join fetch chefLab.laboratoire")
    List<ChefLab> findAllWithToOneRelationships();

    @Query(
        "select chefLab from ChefLab chefLab left join fetch chefLab.extraUser left join fetch chefLab.laboratoire where chefLab.id =:id"
    )
    Optional<ChefLab> findOneWithToOneRelationships(@Param("id") Long id);
}
