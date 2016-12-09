using AngularGrid.Lib;
using AngularGrid.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace AngularGrid.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult LoadJsonCustomer(string searchtext, int page = 1, int pageSize = 10, string sortBy = "CustomerID", string sortDirection = "asc")
        {
            var pagedRecord = new PagedList<Employee>()
            {
                CurrentPage = page,
                PageSize = pageSize
            };
            using (StreamReader r = new StreamReader(Server.MapPath("~/largeLoad.json")))
            {
                string json = r.ReadToEnd();
                pagedRecord.Content = JsonConvert.DeserializeObject<List<Employee>>(json);

            }
            if (pagedRecord.Content != null)
            {
                if (!string.IsNullOrWhiteSpace(searchtext))
                    pagedRecord.Content = pagedRecord.Content.Where(x => x.name.Contains(searchtext)).ToList();
                pagedRecord.TotalRecords = pagedRecord.Content.Count;
                pagedRecord.Content = pagedRecord.Content.Skip((page - 1) * pageSize)
               .Take(pageSize)
               .ToList();


            }
            return Json(pagedRecord, JsonRequestBehavior.AllowGet);
        }


        public ActionResult LoadJsonData(string searchtext, int page = 1, int pageSize = 10, string sortBy = "MultipleSelectionID", string sortDirection = "asc")
        {
            var pagedRecord = new PagedList<MultipleSelection>()
            {
                CurrentPage = page,
                PageSize = pageSize
            };
            using (StreamReader r = new StreamReader(Server.MapPath("~/schema1.json")))
            {
                string json = r.ReadToEnd();
                pagedRecord.Content = JsonConvert.DeserializeObject<List<MultipleSelection>>(json);

            }
            if (pagedRecord.Content != null)
            {
                //if (!string.IsNullOrWhiteSpace(searchtext))
                //    pagedRecord.Content = pagedRecord.Content.Where(x => x.MultipleSelectionID.Contains(searchtext)).ToList();
                pagedRecord.TotalRecords = pagedRecord.Content.Count;
                pagedRecord.Content = BLCollection.OrderBy<MultipleSelection>(pagedRecord.Content, sortBy + " " + sortDirection);
                pagedRecord.Content = pagedRecord.Content.Skip((page - 1) * pageSize)
               .Take(pageSize)
               .ToList();


            }
            return Json(pagedRecord, JsonRequestBehavior.AllowGet);
        }



        public ActionResult LoadCandidate(string searchtext = "", int page = 1, int pageSize = 10, string sortBy = "CandidateID", string sortDirection = "asc")
        {
            var pagedRecord = new PagedList<CandidateMaster>()
            {
                CurrentPage = page,
                PageSize = pageSize
            };

            using (StreamReader r = new StreamReader(Server.MapPath("~/Data/Candidate.json")))
            {
                string json = r.ReadToEnd();
                pagedRecord.Content = JsonConvert.DeserializeObject<List<CandidateMaster>>(json);

            }
            //if (pagedRecord.Content != null && pagedRecord.Content.Count > 0 && searchtext!="")
            //{
            //    List<AngularGrid.Lib.Filter> filter = new List<AngularGrid.Lib.Filter>()
            //    {
            //        new AngularGrid.Lib.Filter { PropertyName = "FirstName" ,Operation = Op .Contains, Value = searchtext  },
            //        new AngularGrid.Lib.Filter { PropertyName = "LastName" ,Operation = Op .Contains, Value =searchtext  },
            //         new AngularGrid.Lib.Filter { PropertyName = "Email" ,Operation = Op .Contains, Value = searchtext}
            //        };
            //    var deleg = ExpressionBuilder.GetExpression<CandidateMaster>(filter).Compile();
            //    pagedRecord.Content = pagedRecord.Content.Where(deleg).ToList();
            //}

            pagedRecord.TotalRecords = pagedRecord.Content.Count;
            pagedRecord.Content = BLCollection.OrderBy<CandidateMaster>(pagedRecord.Content, sortBy + " " + sortDirection);
            pagedRecord.Content = pagedRecord.Content.Skip((page - 1) * pageSize)
           .Take(pageSize)
           .ToList();
            return Json(pagedRecord, JsonRequestBehavior.AllowGet);
        }



        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


    }
}
