using authwebservice.Models;
using AuthWebService.Models;
using Azure;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using System.Text.RegularExpressions;

namespace AuthWebService.Data
{
    //public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser>(options)
    //{
    // }
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<EmployeEntreprise>().HasKey(e =>new { e.UserId, e.EntrepriseId });

            //modelBuilder.Entity<UserGroupe>().HasKey(e => new { e.userId, e.groupeId });

            modelBuilder.Entity<ApplicationUser>()
                .HasOne(b => b.EmployeEntreprise)
                .WithOne(a => a.User)
                .HasForeignKey<EmployeEntreprise>(a => a.UserId);

            modelBuilder.Entity<Entreprise>()
               .HasMany(b => b.Employes)
               .WithOne(a => a.Entreprise)
               .HasForeignKey(a => a.EntrepriseId);

           
            /*
            modelBuilder.Entity<UserPermessionGroupe>()
            .HasOne(upg => upg.ApplicationUser)
            .WithMany(u => u.UserPermessionGroupes)
            .HasForeignKey(upg => upg.userId);

            modelBuilder.Entity<UserPermessionGroupe>()
                .HasOne(upg => upg.Permession)
                .WithMany(p => p.UserPermessionGroupes)
                .HasForeignKey(upg => upg.permessionId);

            modelBuilder.Entity<UserPermessionGroupe>()
                .HasOne(upg => upg.Groupe)
                .WithMany(g => g.UserPermessionGroupes)
                .HasForeignKey(upg => upg.groupeId);*/


        }

        public DbSet<ApplicationUser> Users { get; set; }

        
        public DbSet<EmployeEntreprise> EmployeEntreprise { get; set; }

        public DbSet<Entreprise> Entreprises { get; set; }

        public DbSet<UserGroupePrivilege> UserGroupePrivilege { get; set; }

        

    }
}
