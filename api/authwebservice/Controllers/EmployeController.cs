using AuthWebService.Contracts;
using AuthWebService.Data;
using AuthWebService.DTOs;
using AuthWebService.Models;
using AuthWebService.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace AuthWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeController(AppDbContext dbContext, IWebHostEnvironment hostEnvironment,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IEmailService emailService,
        IConfiguration config) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;
        private readonly IWebHostEnvironment hostEnvironment = hostEnvironment;



        [HttpPost]
        [Route("invite/{id}")]
        public async Task<IActionResult> InviterEmploye([FromRoute] string id,string email)
        {
            if (email == null)
            {
                return BadRequest("email empty");
            }

            try
            {
                //var user = await userManager.GetUserAsync(HttpContext.User);
                var user = await userManager.FindByIdAsync(id);
                var entrepriseId = getEntrepriseId(user.Id);


                MailRequest mailrequest = new MailRequest();
                mailrequest.ToEmail = email;
                mailrequest.Subject = "Invitation à votre Espace Entreprise";
                mailrequest.Body = HTMLBody(email, entrepriseId);

                var res = await emailService.SendEmailAsync(mailrequest);

                if (res)
                {
                    return Ok(" email sent , please check your email");
                }
                return BadRequest("Failed to send email , please contact admin");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email , please contact admin");
            }

        }

        /*
        [HttpPost("invitationEE")]
        public async Task<IActionResult> InviterEmploye(string email)
        {
            if (email == null)
            {
                return BadRequest("email empty");
            }

            try
            {
                var user = await userManager.GetUserAsync(HttpContext.User);
                var entrepriseId = getEntrepriseId(user.Id);


                MailRequest mailrequest = new MailRequest();
                mailrequest.ToEmail = email;
                mailrequest.Subject = "Invitation à votre Espace Entreprise";
                mailrequest.Body = HTMLBody(email, entrepriseId);

                var res = await emailService.SendEmailAsync(mailrequest);

                if (res)
                {
                    return Ok(" email sent , please check your email");
                }
                return BadRequest("Failed to send email , please contact admin");
            }
            catch (Exception)
            {
                return BadRequest("Failed to send email , please contact admin");
            }

        }*/

        private int getEntrepriseId(string userId)
        {
            EmployeEntreprise EmployeEntreprise = _dbContext.EmployeEntreprise.Single(e => e.UserId == userId);
            var entrepriseId = EmployeEntreprise.EntrepriseId;

            return entrepriseId;
        }

        private string HTMLBody(string email, int id)
        {


            var url = $"{config["Jwt:ClientUrl"]}/{config["EmailSettings:InvitationEE"]}?email={email}&entreprise={id}";
           

            var body = $"<p>Bonjour :  </p>" +
                $"<p> Vous avez une invitation pour rejoindre votre Espace Entreprise .</p>" +
                $"<p>Pour le rejoindre, vous pouvez cliquer sur le lien suivant pour inscrire sur Sharpj  </p>" +
                $"<p><a href=\"{url} \">Cliquez ici</a> </p>" +
                $"<p>Merci ,</p>" +
                $"<br>{config["EmailSettings:Email"]}";


            return body;

        }

        [HttpPost]
        [Route("registerEmploye")]
        public async Task<IActionResult> registerEmployeEntreprise(EmployeDTO employeDTO)
        {

            if (employeDTO is null)
            {
                return BadRequest("employe vide ");
            }
            var response = _dbContext.Entreprises.Single(e => e.Id == employeDTO.EntrepriseId);
            if (response is null)
            {
                return BadRequest("entrperise not find ");
            }
            var newUser = new ApplicationUser();


            newUser.FirstName = employeDTO.FirstName;
            newUser.LastName = employeDTO.LastName;
            newUser.Email = employeDTO.Email;
            newUser.PasswordHash = employeDTO.Password;
            newUser.UserName = employeDTO.Email;
            newUser.Fonctionalite = employeDTO.Fonctionnalite;
            newUser.ImageName = await SaveImage(employeDTO.ImageFile);
            newUser.ImageFile = employeDTO.ImageFile;

            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return BadRequest("User registred already");

            var createUser = await userManager.CreateAsync(newUser, employeDTO.Password);
            if (!createUser.Succeeded) return BadRequest("Error in creating User" + createUser.ToString());

            await userManager.AddToRoleAsync(newUser, "User");

            var role = await roleManager.FindByNameAsync("user");

            var roleId = role.Id;

            var res = await AddEmployeEntreprise(newUser.Id, employeDTO.EntrepriseId, roleId);

            return Ok("Account Created" + res);
        }

        private async Task<bool> AddEmployeEntreprise(string userId, int entrepriseId, string roleId)
        {
            EmployeEntreprise employe = new EmployeEntreprise();
            employe.UserId = userId;
            employe.EntrepriseId = entrepriseId;
            employe.RoleId = roleId;

            _dbContext.EmployeEntreprise.Add(employe);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        [HttpGet]
        [Route("{id}")]
        public Entreprise? getEntreprsieByUserId(string id)
        {
            if(id == null) throw new ArgumentNullException("userId");
            try
            {
                EmployeEntreprise EmployeEntreprise = _dbContext.EmployeEntreprise.Single(e => e.UserId == id);


                var entrepriseId = EmployeEntreprise.EntrepriseId;
                Entreprise entreprise = _dbContext.Entreprises.Single(e => e.Id == entrepriseId);

                return entreprise;

            }catch(InvalidOperationException exp)
            {
                return null;
            }   
        }


        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

            var imagePath = Path.Combine(hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
