using QuanLyCongVan.Areas.Home.Models.Home;
using QuanLyCongVan.Areas.Home.Models.Home.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyCongVan.Areas.Home.Controllers
{
    /// <summary>
    /// Class chứa các điều hướng liên hiển thị thông tin công văn
    /// Author       :   HoangNM - 13/04/2019 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class HomeController : Controller
    {
        // GET: Home/Home
        public ActionResult Index()
        {
            return View("Index", new HomeModel().GetDispatchList());
        }

        // GET: Home/Home
        public ActionResult Detail(long id)
        {
            return View("Detail", new HomeModel().GetDispatch(id));
        }
    }
}