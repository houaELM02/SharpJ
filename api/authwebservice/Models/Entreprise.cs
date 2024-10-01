using AuthWebService.Data;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthWebService.Models
{
    public class Entreprise
    {
        
        public int Id { get; set; } 
        public string? Name { get; set; }
        public string? Description { get; set; } 
        public string? Secteur { get; set; } 
        public string? LogoName { get; set; }

        [NotMapped]
        public IFormFile? LogoFile { get; set; }


        //public string AdminEntreprise { get; set; }
        //public ApplicationUser User { get; set; }

        public ICollection<EmployeEntreprise> Employes { get; set; } = new List<EmployeEntreprise>();

        

        

    }
}
