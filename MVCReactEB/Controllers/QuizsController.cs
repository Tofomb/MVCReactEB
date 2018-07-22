using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVCReactEB.Models;
using Newtonsoft.Json;

namespace MVCReactEB.Controllers
{
    [Produces("application/json")]
    [Route("api/Quizs")]
    public class QuizsController : Controller
    {
        private readonly MVCReactEBContext _context;

        public QuizsController(MVCReactEBContext context)
        {
            _context = context;
        }


        //

        [HttpGet]
        [Route("GetQuestions")]
        public List<string> GetQuestions(string id)
        {
            List<Quiz> Questions = new List<Quiz>();
            List<string> QuestionsJson = new List<string>();
            foreach (var q in _context.Quiz)
            {
                Questions.Add(q);
                QuestionsJson.Add(JsonConvert.SerializeObject(q));
            }
            return QuestionsJson;
        }

        [HttpGet]
        [Route("GetUserScore")]
        public List<string> GetUserScore(string userId)
        {
            // only return a singel user score?
            List<string> ScoresJson = new List<string>();
            Score UserScore = new Score();
            try
            {
                UserScore = _context.Score.Where(r => r.Id == userId).Single();
            }
            catch
            {
                UserScore.Id = userId;
                UserScore.Date = DateTime.Now;
                UserScore.CorrectAnswers = 0;
                UserScore.AnswerdQuestion = 0;
                _context.Score.Add(UserScore);
                _context.SaveChanges();
             }
           
            ScoresJson.Add(JsonConvert.SerializeObject(UserScore));
            return ScoresJson;
        }


        [HttpGet]
        [Route("PostScores")]
        public List<string> PostScores(string userId, int correctAnswers, int answerdQuestions)
        {
            List<string> newScore = new List<string>();
            Score UserScore = new Score();

            UserScore = _context.Score.Where(r => r.Id == userId).Single();
            Score NewScore = new Score();
            UserScore.Date = DateTime.Now;
          
            UserScore.CorrectAnswers = correctAnswers;
            UserScore.AnswerdQuestion = answerdQuestions;
           
            _context.Score.Update(UserScore);
            _context.SaveChanges();

            return newScore;
        }
        //
        //From HigscoreController

        [HttpGet]
        [Route("GetItAll")]
        public List<string> GetItAll()
        {
            List<string> AllJson = new List<string>();

            var nyvar = _context.Score.OrderBy(x => x.Date);
            var sistvar = nyvar.OrderByDescending(x => x.CorrectAnswers);

            foreach (var ii in sistvar)
            {                
                        AllJson.Add(JsonConvert.SerializeObject(ii));                 
            }
            return AllJson;
        }

        //
        //TODO:test
        [HttpGet]
        [Route("PostNewQuestion")]
        public void PostNewQuestion(string Id, string Question, int CorrectOption, string Option1, string Option2, string Option3, string Option4)
        {

            Quiz NewQuestion = new Quiz
            {
                Id = Id,
                Option1 = Option1,
                Option2 = Option2,
                Option3 = Option3,
                Option4 = Option4,
                Question = Question,
                CorrectOption = CorrectOption
            };

            _context.Quiz.Add(NewQuestion);
            _context.SaveChanges();
        }







        //


        //

        // GET: api/Quizs
        [HttpGet]
        public IEnumerable<Quiz> GetQuiz()
        {
            return _context.Quiz;
        }

        // GET: api/Quizs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quiz.SingleOrDefaultAsync(m => m.Id == id);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        // PUT: api/Quizs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz([FromRoute] string id, [FromBody] Quiz quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quiz.Id)
            {
                return BadRequest();
            }

            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quizs
        [HttpPost]
        public async Task<IActionResult> PostQuiz([FromBody] Quiz quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Quiz.Add(quiz);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuiz", new { id = quiz.Id }, quiz);
        }

        // DELETE: api/Quizs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quiz.SingleOrDefaultAsync(m => m.Id == id);
            if (quiz == null)
            {
                return NotFound();
            }

            _context.Quiz.Remove(quiz);
            await _context.SaveChangesAsync();

            return Ok(quiz);
        }

        private bool QuizExists(string id)
        {
            return _context.Quiz.Any(e => e.Id == id);
        }
    }
}