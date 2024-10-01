using authwebservice.DTOs;
using authwebservice.Models;
using AuthWebService.Data;
using AuthWebService.DTOs;
using AuthWebService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntrepriseController(AppDbContext dbContext,
        IWebHostEnvironment hostEnvironment,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;
        private readonly IWebHostEnvironment hostEnvironment = hostEnvironment;

        [HttpPost]
        [Route("{id}")]
        public async Task<ActionResult<Entreprise>> CreateEntreprise([FromRoute] string id, [FromForm] EntrepriseDTO entrepriseDTO)
        {
            Entreprise entreprise = new Entreprise
            {
                Name = entrepriseDTO.Name,
                Secteur = entrepriseDTO.Secteur,
                Description = entrepriseDTO.Description,
                LogoName = await SaveImage(entrepriseDTO.LogoFile),
                LogoFile = entrepriseDTO.LogoFile
            };

            _dbContext.Entreprises.Add(entreprise);
            await _dbContext.SaveChangesAsync();

            

            var user = await userManager.FindByIdAsync(id);
            //entreprise.AdminEntreprise = user.Id;
            var res = await AddAdminEntrperise(user, entreprise.Id);

            return Ok(res);
        }


        /*
                [HttpPost]
                [Route("{id}")]
                public async Task<ActionResult<Entreprise>> CreateEntreprise ([FromForm] EntrepriseDTO entrepriseDTO)
                {
                    Entreprise entreprise = new Entreprise();
                    entreprise.Name = entrepriseDTO.Name;
                    entreprise.Secteur = entrepriseDTO.Secteur;
                    entreprise.Description = entrepriseDTO.Description;
                    entreprise.LogoName = await SaveImage(entrepriseDTO.LogoFile);
                    entreprise.LogoFile = entrepriseDTO.LogoFile;

                    _dbContext.Entreprises.Add(entreprise);
                    await _dbContext.SaveChangesAsync();

                    var user = await userManager.GetUserAsync(HttpContext.User);
                    //entreprise.AdminEntreprise = user.Id;
                    var res = await AddAdminEntrperise(user, entreprise.Id);


                    return Ok(res);
                }*/
        private async Task<bool> AddAdminEntrperise(ApplicationUser Admin, int IdEntreprise)
        {
            var checkroleId = await roleManager.FindByNameAsync("AdminEntreprise");

            if (checkroleId is null)
            {
                await roleManager.CreateAsync(new IdentityRole() { Name = "AdminEntreprise" });
                checkroleId = await roleManager.FindByNameAsync("AdminEntreprise");
            }

            var userRole = _dbContext.UserRoles.Single(e => e.UserId == Admin.Id);
            if (userRole != null)
            {
                //userRole.RoleId = checkroleId.Id;
                //_dbContext.UserRoles.Update(userRole);

                _dbContext.UserRoles.Remove(userRole); // Supprime le rôle existant de l'utilisateur
                await _dbContext.SaveChangesAsync();
            }
            await userManager.AddToRoleAsync(Admin, "AdminEntreprise");

            EmployeEntreprise employeAdmin = new EmployeEntreprise();
            employeAdmin.UserId = Admin.Id;
            employeAdmin.EntrepriseId = IdEntreprise;
            employeAdmin.RoleId = checkroleId.Id;

            _dbContext.EmployeEntreprise.Add(employeAdmin);

            await _dbContext.SaveChangesAsync();
            return true;

        }

        [HttpGet]
        [Route("{id}")]
        public string? GetNameEnrepriseById(long id)
        {
            try
            {
                Entreprise entrperise = _dbContext.Entreprises.Single(e => e.Id == id);
                return entrperise.Name;
            }catch(Exception ex)
            {
                throw new Exception("Entreprise not found");
            }
           
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ','-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "Images", imageName);
            using ( var fileStream = new FileStream(imagePath , FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }


        // Karima API

        [HttpGet]
        [Route("/UserandConversation/{id}")]
        public async Task<EspaceUsers> getAuthUserAndContacts(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                throw new ArgumentException($"User with ID '{id}' not found.");
            }

            var userconnect = new AppUser
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,

                online = user.Online ?? false, // Set to false if user.Online is null
                imageName = user.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName)

            };

            var entreprise = _dbContext.EmployeEntreprise.SingleOrDefault(e => e.UserId == user.Id);

            if (entreprise == null)
            {
                throw new InvalidOperationException($"No entreprise found for user ID '{user.Id}'.");
            }

            var entrepriseId = entreprise.EntrepriseId;

            var ent = _dbContext.Entreprises.SingleOrDefault(e => e.Id == entrepriseId);

            EntrepriseC entre = new EntrepriseC();
            
            entre.id = entrepriseId;
            entre.nom = ent.Name;
            entre.logoURL = ent.LogoName;
            entre.logoSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, ent.LogoName);

            userconnect.entreprise = entre;

            var EmployeEntreprise = await _dbContext.EmployeEntreprise
                .Where(ru => ru.EntrepriseId == entrepriseId)
                .ToListAsync();

            List<AppUser> employees = new List<AppUser>();

            foreach (var ru in EmployeEntreprise)
            {
                if (ru.UserId != id)  // Exclure l'utilisateur principal
                {
                    var newuser = await userManager.FindByIdAsync(ru.UserId);

                    if (newuser != null)
                    {
                        var emp = new AppUser
                        {
                            id = newuser.Id,
                            firstName = newuser.FirstName,
                            lastName = newuser.LastName,
                            entreprise = entre,
                            online = newuser.Online ?? false, // Set to false if newuser.Online is null
                            imageName = newuser.ImageName,
                            ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName)
                        };

                        employees.Add(emp);
                    }
                }
            }

            var espace = new EspaceUsers
            {
                espaceUsers = employees,
                CurrentUser = userconnect
            };

            return espace;
        }


        // Aich API

        [HttpGet]
        [Route("/UserandHisUsers/{id}")]
        public async Task<CalUsers> getUserandHisUsers(string id)
        {
            var user = await userManager.FindByIdAsync(id);

            if (user == null)
            {
                throw new ArgumentException($"User with ID '{id}' not found.");
            }

            var userconnect = new CalUser
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                
                ImageName = user.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ImageName)

            };

            var entreprise = _dbContext.EmployeEntreprise.SingleOrDefault(e => e.UserId == user.Id);

            if (entreprise == null)
            {
                throw new InvalidOperationException($"No entreprise found for user ID '{user.Id}'.");
            }

            var entrepriseId = entreprise.EntrepriseId;

           
            var EmployeEntreprise = await _dbContext.EmployeEntreprise
                .Where(ru => ru.EntrepriseId == entrepriseId)
                .ToListAsync();

            List<CalUser> employees = new List<CalUser>();

            foreach (var ru in EmployeEntreprise)
            {
                if (ru.UserId != id)  // Exclure l'utilisateur principal
                {
                    var newuser = await userManager.FindByIdAsync(ru.UserId);

                    if (newuser != null)
                    {
                        var emp = new CalUser
                        {
                            id = newuser.Id,
                            firstName = newuser.FirstName,
                            lastName = newuser.LastName,
                            email = newuser.Email,
                            ImageName = newuser.ImageName,
                            ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, newuser.ImageName)
                        };

                        employees.Add(emp);
                    }
                }
            }

            var espace = new CalUsers
            {
                espaceUsers = employees,
                CurrentUser = userconnect
            };

            return espace;
        }



    }
}
