using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularGrid.Models
{
    public class PagedList<T> where T  : class
    {
        public IList<T> Content { get; set; }

        public Int32 CurrentPage { get; set; }
        public Int32 PageSize { get; set; }
        public int TotalRecords { get; set; }

        public int TotalPages
        {
            get { return (int)Math.Ceiling((decimal)TotalRecords / PageSize); }
        }
    } 
}