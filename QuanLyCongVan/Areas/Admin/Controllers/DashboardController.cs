using QuanLyCongVan.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class DashboardController : BaseAdminController
    {
        // GET: Admin/Dashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}