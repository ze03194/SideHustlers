package com.ze03194.sideHustlers.services;

import com.ze03194.sideHustlers.entities.SideJob;
import com.ze03194.sideHustlers.repositories.SideJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SideJobService {

    @Autowired
    private SideJobRepository sideJobRepository;

    public List<SideJob> findAllByDescriptionLike(String description) {
        return sideJobRepository.findAllByDescriptionLike(description);
    }

    public void createSideJob(SideJob sideJob) {
        if (!sideJobRepository.existsSideJobByDescription(sideJob.getDescription())) {
            sideJobRepository.save(sideJob);
        }
    }


    public SideJob findSideJobByDescription(String description) {
        return sideJobRepository.findSideJobByDescription(description);
    }
}
