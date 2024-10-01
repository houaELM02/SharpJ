package com.example.Backend_final.Controllers;

import com.example.Backend_final.Entities.AppUser;
import com.example.Backend_final.Entities.Groupe;
import com.example.Backend_final.GroupeService.groupeService;
//import com.example.Backend_final.Repositories.ContactRepository;
import com.example.Backend_final.Repositories.GroupeRepository;
import com.example.Backend_final.Repositories.UserGroupPrivRepo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@FeignClient(name = "user-service", url = "http://localhost:5130")
 interface PostManToAuth {

//    @PostMapping ("/getUsersById")
//    public List<AppUser> getUsersfromidusers(@RequestBody List<Long> id_users);
    @GetMapping("/UserandConversation/{id}")
    public EspaceUsers getAuthUserancContacts(@PathVariable String id);
    @PutMapping("/Online/{id}")
    String makeUserOnline(@PathVariable String id);
}

@Controller
@AllArgsConstructor
public class EntryController {
    UserGroupPrivRepo userGroupPrivRepo;
    GroupeRepository groupeRepository;
    PostManToAuth postManToAuth;
    groupeService grpService;
//    ContactRepository contactRepository;

//  @GetMapping("/Enter/{id}")
@GetMapping("/Enter/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
  @ResponseBody
   EspaceUser ShowEspaceEntrepriseByID(@PathVariable String id)
  {
      System.out.println("***************");
      EspaceUsers espaceUsers=postManToAuth.getAuthUserancContacts(id);
      AppUser appUser=espaceUsers.CurrentUser;
      System.out.println("espace users : "+espaceUsers);
      System.out.println("user : "+appUser);
      List<Long> groupes=userGroupPrivRepo.getGroupesByUserId(id);
      List<Groupe> grp=grpService.GetGroupesInfoForListIds(groupes);
      System.out.println(grp);
      System.out.println("*************");

      List<AppUser> contacts=espaceUsers.espaceUsers;
      String res=postManToAuth.makeUserOnline(id);
      System.out.println(" espaceusers here : "+espaceUsers);
      return new EspaceUser(appUser,grp,contacts);
  }
  @GetMapping("/Groupes")
  @ResponseBody
    List<Groupe> getGroupes()
  {
      return groupeRepository.findAll();
  }

}

@Data
@AllArgsConstructor
@NoArgsConstructor
class EspaceUser{
    AppUser user;
    List<Groupe> Groupes;
    List<AppUser> Contactes;
}
@Data
@AllArgsConstructor
@NoArgsConstructor
class EspaceUsers
 {
     AppUser CurrentUser;
     //nass li khedamin f charika
     List<AppUser> espaceUsers;
 }
