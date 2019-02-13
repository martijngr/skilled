﻿using Skilled.CQRS;
using Skilled.Domain.Skills.Queries;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class TalentController : ApiController
    {
        private readonly QueryProcessor _queryProcessor;

        public TalentController(QueryProcessor queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [HttpGet]
        public IHttpActionResult Search([FromUri] GetTalentsQuery query)
        {
            var result = _queryProcessor.Handle(query);

            return Ok(new { result });
        }
    }
}