using AuthWebService.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AuthWebService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(AppDbContext dbContext,
        UserManager<ApplicationUser> userManager) : ControllerBase
    {

        private readonly AppDbContext _dbContext = dbContext;

        [HttpGet]
        [Route("UserImage/{id}")]
        public async Task<string> getUserImageById(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return "User Not found";
            }

            string ImageUrl =  user.ImageName;

            return ImageUrl;
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<ApplicationUser?> getUserId(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            return user ;
        }


        [HttpGet]
        [Route("current")]
        public async Task<string> getCurrentUserId()
        {
            //string id = httpContext.HttpContext.User.FindFirstValue("UserId");
            //return id;
            var user = await userManager.GetUserAsync(HttpContext.User);
            return user.Id;
        }


        [HttpPut]
        [Route("/Online/{id}")]
        public async  Task<string?> onLine(string id) { 
            var user = await userManager.FindByIdAsync(id);

            if(user == null)
            {
                return "user not found";
            }
            else
            {
                user.Online = true;

                await _dbContext.SaveChangesAsync();

                return "user is online now";
            }

            
        }


    }
}
