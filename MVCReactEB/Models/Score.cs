using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MVCReactEB.Models
{
    public class Score
    {
        [Required]
        public string Id { set; get; }
        public int AnswerdQuestion { set; get; }
        public int CorrectAnswers { set; get; }
        public DateTime Date { set; get; }
    }
}
