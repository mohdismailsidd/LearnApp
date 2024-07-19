using LearnApp.Server.Models;

namespace LearnApp.Server.Services.Abstratcion
{
    public interface ICoursesServices
    {
        Task<Course> AddCourse(Course course);
        Task<IEnumerable<Course>> GetAll();
        Task<Course> GetById(int id);
        Task<Course> RemoveCourse(int id);
        Task<Course> UpdateCourse(Course course);
    }
}