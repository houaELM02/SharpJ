using AuthWebService.Contracts;
using AuthWebService.Data;
using AuthWebService.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace AuthWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(IUserAccounts userAccount,
        UserManager<ApplicationUser> userManager) : ControllerBase
    {
        private readonly IUserAccounts userAccount = userAccount;
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            var response = await userAccount.CreateAccount(userDTO);
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var response = await userAccount.LoginAccount(loginDTO);
            return Ok(response);
        }

        [HttpPost("loginwithGoogle")]
        public async Task<IActionResult> LoginGoogle([FromBody] string credential)
        {
            var response = await userAccount.LoginWithGoogle(credential);
            return Ok(response);
        }

        [HttpPost("forgotPassword/{email}")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var response = await userAccount.SendMail(email);
            return Ok(response);
        }



        [HttpPut("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO model)
        {
            var response = await userAccount.ResetPassword(model);
            return Ok(response);
        }

        


        
    }

}
