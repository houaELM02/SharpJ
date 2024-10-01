using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthWebService.DTOs
{
    public class EntrepriseDTO
    {
        
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Secteur { get; set; }

        public IFormFile? LogoFile { get; set; }
    }
}
