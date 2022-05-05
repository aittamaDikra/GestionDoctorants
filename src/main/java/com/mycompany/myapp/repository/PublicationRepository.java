package com.mycompany.myapp.repository;

import com.mycompany.myapp.charts.CountPub;
import com.mycompany.myapp.charts.CountPubByType;
import com.mycompany.myapp.domain.Publication;
import java.util.List;
import java.util.Optional;

import com.mycompany.myapp.domain.User;
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

    List<Publication> findPublicationByUserOrderByDate(User user);

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

    @Query("select new com.mycompany.myapp.charts.CountPub( p.date, count(p.description)) from Publication p left join User user on p.user=user.id where p.user.login=:login GROUP BY p.date ORDER BY p.date")
    List<CountPub> countPublicationByUserOrderByDate(@Param("login") String login);

    @Query("select new com.mycompany.myapp.charts.CountPub( p.date, count(p.description)) from Publication p GROUP BY p.date ORDER BY p.date")
    List<CountPub> countPublicationOrderByDate();

    @Query("select new com.mycompany.myapp.charts.CountPubByType( p.type, count(p.description)) from Publication p left join User user on p.user=user.id where p.user.login=:login GROUP BY p.type ")
    List<CountPubByType> countPublicationByUserGroupbyType(@Param("login") String login);

    @Query("select new com.mycompany.myapp.charts.CountPubByType( p.type, count(p.description)) from Publication p GROUP BY p.type ")
    List<CountPubByType> countPublicationGroupbyType();

    @Query("select  p from Publication p inner JOIN p.chercheurs a where a.login=:id or p.user.login=:id")
    List<Publication> findPublicationByUserOrChercheurs(@Param("id") String id);


    default List<Publication> findAllWithEagerRelationships33(String id) {
        return this.fetchBagRelationships(this.findPublicationByUserOrChercheurs(id));
    }

    default List<Publication> findAllWithEagerRelationships3() {
        return this.fetchBagRelationships(this.findByUserIsCurrentUser());
    }




}
