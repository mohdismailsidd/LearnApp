using LearnApp.Server.Models;
using LearnApp.Server.Services.Abstratcion;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LearnApp.Server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        ICoursesServices _coursesServices;

        public CoursesController(ICoursesServices coursesServices) {
            _coursesServices = coursesServices;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = await _coursesServices.GetAll();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _coursesServices.GetById(id);
            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Course course)
        {
            var result = await _coursesServices.AddCourse(course);
            return CreatedAtRoute(null,null,result);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch(Course course)
        {
            course = await _coursesServices.UpdateCourse(course);
            return CreatedAtRoute(null, null, course);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _coursesServices.RemoveCourse(id);
            return AcceptedAtRoute(null, null, course);
        }
    }
}
