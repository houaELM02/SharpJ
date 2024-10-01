package com.example.Backend_final.Repositories;

import com.example.Backend_final.Entities.Groupe;
import com.example.Backend_final.Entities.UserGroupePrivilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupPrivRepo extends JpaRepository<UserGroupePrivilege,Long> {

    @Query("SELECT ug.id_groupe FROM UserGroupePrivilege ug WHERE ug.id_user = :userId")
    List<Long> getGroupesByUserId(@Param("userId") String userId);

}
