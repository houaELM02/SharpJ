﻿using System.ComponentModel.DataAnnotations;

namespace AuthWebService.DTOs
{
    public class EmployeDTO
    {
        

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string Fonctionnalite { get; set; } = string.Empty;

        public IFormFile? ImageFile { get; set; }

        [Required]
        public int EntrepriseId { get; set; } 
    }
}
