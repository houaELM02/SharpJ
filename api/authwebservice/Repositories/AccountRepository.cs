using AuthWebService.Contracts;
using AuthWebService.Data;
using AuthWebService.DTOs;
using AuthWebService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Google.Apis.Auth;
using static AuthWebService.DTOs.ServiceResponses;

namespace AuthWebService.Repositories
{
    public class AccountRepository(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IEmailService emailService, IWebHostEnvironment hostEnvironment,
        IConfiguration config)
        : IUserAccounts
    {
        private readonly IWebHostEnvironment hostEnvironment = hostEnvironment;
        public async Task<GeneralResponse> CreateAccount([FromForm]  UserDTO userDTO)
        {
            if (userDTO is null) return new GeneralResponse(false, "Model is empty");
            var newUser = new ApplicationUser();


                newUser.FirstName = userDTO.FirstName;
                newUser.LastName = userDTO.LastName;
                newUser.Email = userDTO.Email;
                newUser.PasswordHash = userDTO.Password;
                newUser.UserName = userDTO.Email;
                newUser.ImageName = await SaveImage(userDTO.ImageFile);
                newUser.ImageFile = userDTO.ImageFile;
            

            
            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new GeneralResponse(false, "User registred already");

            var createUser = await userManager.CreateAsync(newUser, userDTO.Password);
            if (!createUser.Succeeded) return new GeneralResponse(false, "Error in creating User" + createUser.ToString());
            

            var checkUser = await roleManager.FindByNameAsync("User");
            if (checkUser is null)
                await roleManager.CreateAsync(new IdentityRole() { Name = "User" });

            await userManager.AddToRoleAsync(newUser, "User");
            return new GeneralResponse(true, "Account Created");


        }

        public async Task<LoginResponse> LoginAccount(LoginDTO loginDTO)
        {
            if (loginDTO == null)
                return new LoginResponse(false,null!, null!, "Login container is empty");

            var getUser = await userManager.FindByEmailAsync(loginDTO.Email);
            if (getUser is null)
                return new LoginResponse(false, null!, null!, "User not found");

            bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, loginDTO.Password);
            if (!checkUserPasswords)
                return new LoginResponse(false,null!, null!, "Invalid email/password");

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.FirstName, getUser.LastName, getUser.Email, getUserRole.First());
            string token = GenerateToken(userSession);
            return new LoginResponse(true, getUser.Id, token!, "Login Completed");
        }

        public async Task<LoginResponse> LoginWithGoogle(string credential)
        {
            if (credential == null)
                return new LoginResponse(false, null!, null!, "credential is empty");

            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string> { config["GoogleOauth:ClientId"] }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(credential, settings);
            var getUser = await userManager.FindByEmailAsync(payload.Email);
            if (getUser is null)
                return new LoginResponse(false, null!, null!, "User not found");

           /* bool checkUserPasswords = await userManager.CheckPasswordAsync(getUser, payload.);
            if (!checkUserPasswords)
                return new LoginResponse(false, null!, null!, "Invalid email/password");*/

            var getUserRole = await userManager.GetRolesAsync(getUser);
            var userSession = new UserSession(getUser.Id, getUser.FirstName, getUser.LastName, getUser.Email, getUserRole.First());
            string token = GenerateToken(userSession);
            return new LoginResponse(true, getUser.Id, token!, "Login Completed");
        }


        public async Task<GeneralResponse> SendMail(string email)
        {
            if (string.IsNullOrEmpty(email)) return new GeneralResponse(false, "Invalid email");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return new GeneralResponse(false, "Email not found");
            try
            {


                MailRequest mailrequest = new MailRequest();
                mailrequest.ToEmail = email;
                mailrequest.Subject = "Forget Password";
                mailrequest.Body = await HTMLBody(user);

                var res = await emailService.SendEmailAsync(mailrequest);

                if (res)
                {
                    return new GeneralResponse(true, "Forgot password email sent , please check your email");
                }
                return new GeneralResponse(false, "Failed to send email , please contact admin");
            }
            catch (Exception)
            {
                return new GeneralResponse(false, "Failed to send email , please contact admin");
            }


        }

        public async Task<GeneralResponse> ResetPassword(ResetPasswordDTO model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) return new GeneralResponse(false, "email not found");
            try
            {
                var decodedTokenBytes = WebEncoders.Base64UrlDecode(model.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

                var res = await userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);
                if (res.Succeeded)
                {
                    return new GeneralResponse(true, "Password reset with success");
                }
                else
                    return new GeneralResponse(false, "Invalid token . Please try again");
            }
            catch (Exception)
            {
                return new GeneralResponse(false, "Invalid token . Please try again");
            }
        }

        private string GenerateToken(UserSession user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Name , user.LastName ),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role,  user.Role)

            };
            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: userClaims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<string> HTMLBody(ApplicationUser user)
        {

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

            var url = $"{config["Jwt:ClientUrl"]}/{config["EmailSettings:ResetPasswordPath"]}?token={validToken}&email={user.Email}";



            //token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            //var url = $"{config["Jwt:Audience"]}/{config["EmailSettings:ResetPasswordPath"]}?token={token}&email={user.Email}";




            var body = $"<p>Hello : {user.LastName} {user.FirstName}  </p>" +
                $"<p> UserName : {user.UserName}.</p>" +
                $"<p>In order to reset your password, please click on the following link </p>" +
                $"<p><a href=\"{url} \">Click here</a> </p>" +
                $"<p>Thank you ,</p>" +
                $"<br>{config["EmailSettings:Email"]}";


            return body;




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
