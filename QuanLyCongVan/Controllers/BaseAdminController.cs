using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QLCV.Common.Filter;
using QLCV.Common.Filters;

namespace QuanLyCongVan.Controllers
{
    [AdminLogin(Order = 1)]
    public class BaseAdminController : Controller
    {
    }
}