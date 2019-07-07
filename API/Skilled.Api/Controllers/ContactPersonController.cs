using Skilled.CQRS;
using Skilled.Domain.ContactPersons.Queries;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace Skilled.Api.Controllers
{
    public class ContactPersonController : ApiController
    {
        private readonly QueryProcessor _queryProcessor;
        public ContactPersonController(QueryProcessor queryProcessor)
        {
            _queryProcessor = queryProcessor;
        }

        [HttpGet]
        public HttpResponseMessage ProfilePicture([FromUri] int contactPersonId)
        {
            var filePath = _queryProcessor.Handle(new GetProfilePicturePathByContactPersonId(contactPersonId));

            var response = new HttpResponseMessage();
            response.Content = new StreamContent(new FileStream(filePath, FileMode.Open)); // this file stream will be closed by lower layers of web api for you once the response is completed.
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");

            return response;
        }
    }
}