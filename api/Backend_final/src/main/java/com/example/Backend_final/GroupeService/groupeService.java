package com.example.Backend_final.GroupeService;

import com.example.Backend_final.Entities.Groupe;
import com.example.Backend_final.Repositories.GroupeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class groupeService {
    @Autowired
    GroupeRepository grpRepo;
public List<Groupe> GetGroupesInfoForListIds(List<Long> listofIds)
{
    List<Groupe> grps=new ArrayList<Groupe>();
  for(Long id : listofIds)
  {
      grps.add(grpRepo.findById(id).get());
  }
   return grps;
}
}
