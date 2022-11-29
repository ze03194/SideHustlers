package com.ze03194.sideHustlers.repositories;

import com.ze03194.sideHustlers.entities.SideJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SideJobRepository extends JpaRepository<SideJob, String> {
    @Query("SELECT s from SideJob s WHERE s.description LIKE ?1%")
    public List<SideJob> findAllByDescriptionLike(String description);

    public SideJob findAllByDescription(String description);

    public boolean existsSideJobByDescription(String description);

    SideJob findSideJobByDescription(String description);
}
