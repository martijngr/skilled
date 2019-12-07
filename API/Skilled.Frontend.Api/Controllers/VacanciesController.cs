using Skilled.Business.Core.CompanyCultures.Queries;
using Skilled.Business.Core.Motivations.Queries;
using Skilled.Business.Core.ThinkLevels.Queries;
using Skilled.Business.Frontend.Vacancies.Queries;
using Skilled.CQRS;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class VacanciesController : ApiController
    {
        private readonly QueryProcessor _queryProcessor;

        public VacanciesController(QueryProcessor queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [HttpGet]
        public IHttpActionResult Search([FromUri] GetVacancySearchResultsQuery query)
        {
            var result = _queryProcessor.Handle(query);

            return Ok(new { result });
        }

        [HttpGet]
        public IHttpActionResult SearchCount([FromUri] GetVacancySearchCountQuery query)
        {
            var count = _queryProcessor.Handle(query);

            return Ok(new { count });
        }

        [HttpGet]
        public IHttpActionResult GetVacancy(int vacancyId)
        {
            var vacancy = _queryProcessor.Handle(new GetVacancyByIdQuery(vacancyId));

            return Ok(new { vacancy });
        }

        [HttpGet]
        public IHttpActionResult GetThinkLevels()
        {
            var result = _queryProcessor.Handle(new GetThinkLevelsQuery());

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetCompanyCultures()
        {
            var result = _queryProcessor.Handle(new GetCompanyCulturesQuery());

            return Ok(result);
        }

        [HttpGet]
        public IHttpActionResult GetMotivations()
        {
            var result = _queryProcessor.Handle(new GetMotivationsQuery());

            return Ok(result);
        }

        [HttpGet]
        public HttpResponseMessage Logo([FromUri] int vacancyId)
        {
            var logoPath = _queryProcessor.Handle(new GetVacancyLogoQuery { VacancyId = vacancyId });

            var response = new HttpResponseMessage();
            response.Content = new StreamContent(new FileStream(logoPath,FileMode.Open)); // this file stream will be closed by lower layers of web api for you once the response is completed.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

            return response;
        }
    }
}