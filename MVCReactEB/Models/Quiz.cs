using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVCReactEB.Models
{
    public class Quiz
    {
        [Required]
        public string Id { set; get; }
        public string Option1 { set; get; }
        public string Option2 { set; get; }
        public string Option3 { set; get; }
        public string Option4 { set; get; }
        public string Question { set; get; }
        public int CorrectOption { set; get; }
    }
}
