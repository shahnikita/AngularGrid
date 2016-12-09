using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace AngularGrid.Models
{
    public class CandidateMaster
    {
        [DisplayName("Candidate ID")]
        public int CandidateID { get; set; }

        [DisplayName("Prefix")]
        public string Prefix { get; set; }

        [DisplayName("First Name")]
        public string FirstName { get; set; }

        [DisplayName("Middle Name")]
        public string MiddleName { get; set; }

        [DisplayName("Last Name")]
        public string LastName { get; set; }

        [DisplayName("SSN Number")]
        public string SSN { get; set; }

        [DisplayName("Birth Date")]
        public DateTime? Birthdate { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Relocation")]
        public string Relocation { get; set; }

        [DisplayName("Verified By Email")]
        public string VerifiedByEmail { get; set; }

        [DisplayName("Additional Infomation")]
        public string AdditionalInfo { get; set; }




    }
}