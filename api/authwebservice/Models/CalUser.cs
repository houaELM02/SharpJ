using authwebservice.DTOs;
using System.ComponentModel.DataAnnotations.Schema;

namespace authwebservice.Models
{
    public class CalUser
    {
        public string id { get; set; }

        public string firstName { get; set; } = string.Empty;


        public string lastName { get; set; } = string.Empty;

        public string email { get; set; }

        public string functionality { get; set; } = string.Empty;
        

       


        public string ImageName { get; set; } = string.Empty;
        [NotMapped]
        public string? ImageSrc { get; set; }
    }
}
