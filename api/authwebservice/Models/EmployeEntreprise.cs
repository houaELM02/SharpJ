using AuthWebService.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthWebService.Models
{
    
    public class EmployeEntreprise
    {
        
        
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public int EntrepriseId { get; set; }
        public Entreprise Entreprise { get; set; }

        public string RoleId { get; set; }
        public IdentityRole Role { get; set; }
    }
}
