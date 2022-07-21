package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Notification;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data SQL repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select notification from Notification notification where notification.vu=false")
    List<Notification> findNotificationNonVu();

    @Query("select count(notification) from Notification notification where notification.vu=false")
    Long countNotification();
}
