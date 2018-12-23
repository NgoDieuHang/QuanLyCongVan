using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLCV.Common.Enum
{
    public class ConstantsEnum
    {
        public enum GroupAccount
        {
            Developer = 1,
            Admin = 2,
            User = 3,
            Student = 4,
            Teacher = 5,
            Employee = 6
        }

        public enum CodeResponse
        {
            OK = 200,
            ServerError = 500,
            NotFound = 404,
            NotAccess = 403,
            NotValidate = 201
        }

        public enum ModeMaster
        {
            Insert = 1,
            Update = 2
        }
    }
}