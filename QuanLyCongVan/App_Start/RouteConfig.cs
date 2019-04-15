using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace QuanLyCongVan
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Admin",
                url: "admin",
                defaults: new { controller = "Dashboard", action = "Index" },
                namespaces: new string[] { "MvcNangCao.Areas.Home.Controllers" }
            ).DataTokens.Add("area", "admin");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Dashboard", action = "Index", id = UrlParameter.Optional }
            ).DataTokens.Add("area", "admin");
        }
    }
}