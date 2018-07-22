using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MVCReactEB.Models;

namespace MVCReactEB.Models
{
    public class MVCReactEBContext : DbContext
    {
        public MVCReactEBContext (DbContextOptions<MVCReactEBContext> options)
            : base(options)
        {
        }

        public DbSet<MVCReactEB.Models.Quiz> Quiz { get; set; }

        public DbSet<MVCReactEB.Models.Score> Score { get; set; }
    }
}
