using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace QuanLyCongVan.App_Start.Bundle
{
    public class HomeBundle
    {
        public static BundleCollection RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/public/css/dispatchList").Include(
                "~/public/css/home/home/index.css"
            ));

            bundles.Add(new StyleBundle("~/public/css/dispatch").Include(
               "~/public/css/home/home/detail.css"
           ));
            return bundles;
        }
    }
}