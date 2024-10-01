using authwebservice.DTOs;
using authwebservice.Models;
using AuthWebService.Data;
using AuthWebService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static AuthWebService.DTOs.ServiceResponses;

namespace authwebservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupeController(AppDbContext dbContext,
        IWebHostEnvironment hostEnvironment,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;
        private readonly IWebHostEnvironment hostEnvironment = hostEnvironment;

        [HttpGet]
        [Route("/usersGRP/{id}")]
        public async Task<List<AppUser>> getuserByGRPid(long id)
        {
            // Récupérer tous les UserGroupePrivilege pour le groupe spécifié
            var userGroupPrivileges = await _dbContext.UserGroupePrivilege
                .Where(ugp => ugp.id_groupe == id)
                .ToListAsync();

            if (userGroupPrivileges == null || !userGroupPrivileges.Any())
            {
                throw new InvalidOperationException("No users found for the given group ID.");
            }

            List<AppUser> membres = new List<AppUser>();

            foreach (var ugp in userGroupPrivileges)
            {
                var user = await userManager.FindByIdAsync(ugp.id_user);
                if (user == null)
                {
                    continue;  // Ignorer si l'utilisateur n'est pas trouvé
                }

                var entreprise = _dbContext.EmployeEntreprise.SingleOrDefault(ee => ee.UserId == user.Id);
                if (entreprise == null)
                {
                    continue;  // Ignorer si aucune entreprise n'est associée à l'utilisateur
                }

                var ent = _dbContext.Entreprises.SingleOrDefault(e => e.Id == entreprise.EntrepriseId);
                if (ent == null)
                {
                    continue;  // Ignorer si aucune entreprise n'est trouvée
                }

                var baseImageUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Images/";
                var membre = new AppUser
                {
                    id = user.Id,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    entreprise = new EntrepriseC
                    {
                        id = ent.Id,
                        nom = ent.Name,
                        logoURL = ent.LogoName,
                        logoSrc = $"{baseImageUrl}{ent.LogoName}"
                    },
                    online = user.Online ?? false,
                    imageName = user.ImageName,
                    ImageSrc = $"{baseImageUrl}{user.ImageName}"
                };

                membres.Add(membre);
            }

            return membres;
        }


        [HttpPost]
        [Route("/AddToGroupe")]
        public async Task<GeneralResponse> AddUserToGroupe(AdduserTogroupeForm form)
        {
            if (form == null)
            {
                return new GeneralResponse(false, "Form is null");
            }

            try
            {
                UserGroupePrivilege userGroupe = new UserGroupePrivilege()
                {
                    id_user = form.id_user,
                    id_groupe = form.id_groupe,
                    privileges = form.privileges
                };

                _dbContext.UserGroupePrivilege.Add(userGroupe);
                await _dbContext.SaveChangesAsync();

                return new GeneralResponse(true, "User group added successfully.");
            }
            catch (Exception ex)
            {
                
                return new GeneralResponse(false, "Failed to add user to group. Error: " + ex.Message);
            }
        }




    }

}
