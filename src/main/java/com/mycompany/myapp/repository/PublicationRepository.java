package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Publication;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Publication entity.
 */
@Repository
public interface PublicationRepository extends PublicationRepositoryWithBagRelationships, JpaRepository<Publication, Long> {
    @Query("select publication from Publication publication where publication.user.login = ?#{principal.username}")
    List<Publication> findByUserIsCurrentUser();

    default Optional<Publication> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Publication> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Publication> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct publication from Publication publication left join fetch publication.user",
        countQuery = "select count(distinct publication) from Publication publication"
    )
    Page<Publication> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct publication from Publication publication left join fetch publication.user")
    List<Publication> findAllWithToOneRelationships();

    @Query("select publication from Publication publication left join fetch publication.user where publication.id =:id")
    Optional<Publication> findOneWithToOneRelationships(@Param("id") Long id);
}
