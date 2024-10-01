//package com.example.Backend_final.Repositories;
//
//import com.example.Backend_final.Entities.Contact;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface ContactRepository extends JpaRepository<Contact,Long> {
//    @Query("SELECT c.id_priv_contact FROM Contact c WHERE c.vous = :userId")
//    List<Long> getGroupesByUserId(@Param("userId") Long userId);
//}
