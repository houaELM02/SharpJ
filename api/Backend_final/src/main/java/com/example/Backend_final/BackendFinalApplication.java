package com.example.Backend_final;
//
//import com.example.Backend_final.Entities.Contact;
import com.example.Backend_final.Entities.Groupe;
import com.example.Backend_final.Entities.UserGroupePrivilege;
//import com.example.Backend_final.Repositories.ContactRepository;
import com.example.Backend_final.Repositories.GroupeRepository;
import com.example.Backend_final.Repositories.UserGroupPrivRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class BackendFinalApplication {


	public static void main(String[] args) {
		SpringApplication.run(BackendFinalApplication.class, args);
	}

	@Bean
	public CommandLineRunner initData(GroupeRepository grpRepo, UserGroupPrivRepo privRepo) {
		return args -> {
			Groupe G2=grpRepo.save(new Groupe(null, "HR TEAM", "Grp-img1.png", "HR employees"));
		Groupe G3=	grpRepo.save(new Groupe(null, "System administrators", "Grp-img2.png", "The Greatest"));
		Groupe G1=	grpRepo.save(new Groupe(null, "IT Team", "Grp-img3.png", "IT employees"));
		privRepo.save(new UserGroupePrivilege(null,"1L",G1.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"1L",G2.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"1L",G3.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"1L",G1.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"1L",G2.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"2L",G2.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"2L",G3.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"2L",G1.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"2L",G2.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"3L",G2.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"3L",G3.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"3L",G1.getId(),null));
			privRepo.save(new UserGroupePrivilege(null,"3L",G2.getId(),null));
//			contactRepository.save(new Contact(null,1L,2L));
//			contactRepository.save(new Contact(null,1L,3L));
//			contactRepository.save(new Contact(null,1L,4L));
//			contactRepository.save(new Contact(null,2L,1L));
//			contactRepository.save(new Contact(null,2L,3L));
//			contactRepository.save(new Contact(null,2L,4L));
//			contactRepository.save(new Contact(null,3L,1L));
//			contactRepository.save(new Contact(null,3L,2L));
//			contactRepository.save(new Contact(null,3L,4L));
//			System.out.println(privRepo.getGroupesByUserId(1L));

		};
	}
}
