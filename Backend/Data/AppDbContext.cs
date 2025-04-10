using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext: DbContext
{
   public AppDbContext(DbContextOptions<AppDbContext> options):base(options){}
   public DbSet<Recipe> Recipes { get; set; }
   public DbSet<RecipeConsumption> RecipeConsuptions { get; set; }
   
   public DbSet<User> Users { get; set; }
   
   public DbSet<Workout> Workouts { get; set; }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      modelBuilder.Entity<User>()
         .HasMany(u => u.Workouts)
         .WithOne(w => w.User)
         .HasForeignKey(w => w.UserId);
   }
}