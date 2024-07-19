using Dapper;
using LearnApp.Server.Models;
using LearnApp.Server.Services.Abstratcion;
using Microsoft.Data.SqlClient;
using Microsoft.Data.SqlClient.Server;
using System.Data;

namespace LearnApp.Server.Services
{
    public class CoursesServices : ICoursesServices
    {
        private readonly IConfiguration _configuration;
        private readonly IDbConnection _connection;

        public CoursesServices(IConfiguration configuration,
            IDbConnection connection)
        {
            _configuration = configuration;
            _connection = connection;
        }

        public async Task<IEnumerable<Course>> GetAll()
        {
            var query = "Select * from  Courses";

            var result = await _connection.QueryAsync<Course>(query);

            return result;
        }

        public async Task<Course> GetById(int id)
        {
            var query = "Select * from  Courses where Id = @Id";

            var result = await _connection.QueryFirstAsync<Course>(query, new { Id = id });

            return result;
        }

        public async Task<Course> AddCourse(Course course)
        {
            var query = "dbo.sp_AddCourse";

            var param = new DynamicParameters();
            param.Add("course", GetTableValuedParameter(new List<Course>() { course }));

            var result = await _connection.QuerySingleOrDefaultAsync<Course>(query, param, commandType: CommandType.StoredProcedure);

            return result;
        }

        public async Task<Course> UpdateCourse(Course course)
        {
            var query = "dbo.sp_UpdateCourse";

            var param = new DynamicParameters();
            param.Add("id", course.Id);
            param.Add("course", GetTableValuedParameter(new List<Course>() { course }));

            var result = await _connection.QuerySingleOrDefaultAsync<Course>(query, param, commandType: CommandType.StoredProcedure);

            return result;
        }

        public async Task<Course> RemoveCourse(int id)
        {
            var query = "dbo.sp_RemoveCourse";

            var param = new DynamicParameters();
            param.Add("id", id);

            var result = await _connection.QuerySingleOrDefaultAsync<Course>(query, param, commandType: CommandType.StoredProcedure);

            return result;
        }

        private static IEnumerable<SqlDataRecord> CreateSqlDataRecord(IEnumerable<Course> courses)
        {
            var name = new SqlMetaData("Name", SqlDbType.VarChar, 300);
            var description = new SqlMetaData("Description", SqlDbType.VarChar, 1000);
            var author = new SqlMetaData("Author", SqlDbType.VarChar, 300);
            var cost = new SqlMetaData("Cost", SqlDbType.Decimal, 18, 2);
            var record = new SqlDataRecord(name, description, author, cost);
            foreach (var item in courses)
            {
                record.SetString(0, item.Name);
                record.SetString(1, item.Description);
                record.SetString(2, item.Author);
                record.SetSqlDecimal(3, decimal.Parse(item.Cost.ToString()));
                yield return record;
            }
        }

        private static SqlMapper.ICustomQueryParameter GetTableValuedParameter(IEnumerable<Course> courses)
        {
            return CreateSqlDataRecord(courses).AsTableValuedParameter("dbo.Course");
        }
    }
}
