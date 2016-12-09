using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularGrid.Models
{
    public class MultipleSelection
    {
        public int MultipleSelectionID { get; set; }
        public int ActionTaken { get; set; }
        public string ActionTakenDate { get; set; }
        public int UserID { get; set; }
        public int SelectionID { get; set; }
    }
}