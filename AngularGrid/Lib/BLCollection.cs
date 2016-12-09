using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

using System.Collections;
using System.Linq.Expressions;
using System.Reflection;

namespace AngularGrid.Lib
{
    public static class BLCollection 
    {
        public static IList<T> OrderBy<T>(this IList<T> list, string sortExpression) where T : class 
        {
            sortExpression += "";
            string[] parts = sortExpression.Split(' ');
            bool descending = false;
            string property = "";

            if (parts.Length > 0 && parts[0] != "")
            {
                property = parts[0];

                if (parts.Length > 1)
                {
                    descending = parts[1].ToLower().Contains("esc");
                }

                PropertyInfo prop = typeof(T).GetProperty(property);

                if (prop == null)
                {
                    throw new Exception("No property '" + property + "' in + " + typeof(T).Name + "'");
                }

                if (descending)
                    return list.OrderByDescending(x => prop.GetValue(x, null)).ToList();
                else
                    return list.OrderBy(x => prop.GetValue(x, null)).ToList();
            }

            return list;
        }
    }
}