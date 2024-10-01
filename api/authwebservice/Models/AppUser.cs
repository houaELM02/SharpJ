using authwebservice.DTOs;
using System.ComponentModel.DataAnnotations.Schema;


namespace authwebservice.Models
{
    public class AppUser
    {
        public string id { get; set; }

        public string firstName { get; set; } = string.Empty;


        public string lastName { get; set; } = string.Empty;

        public string functionality { get; set; } = string.Empty;
        public bool online { get; set; } = false;

        public EntrepriseC  entreprise { get; set; }
       
       
        public string imageName { get; set; } = string.Empty;
        [NotMapped]
        public string? ImageSrc { get; set; }
    }
}
