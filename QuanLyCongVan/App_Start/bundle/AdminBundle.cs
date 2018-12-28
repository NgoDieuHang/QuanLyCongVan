using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace QuanLyCongVan.App_Start.bundle
{
    public class AdminBundle
    {
        public static BundleCollection RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Scripts/Admin/Document/DocumentMaster").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
                "~/public/assets/switchery/dist/switchery.js",
                "~/Scripts/Admin/Document/DocumentMaster.js"
            ));

            bundles.Add(new StyleBundle("~/public/css/admin/listOfPhoto").Include(
               "~/public/assets/switchery/dist/switchery.css"
            ));

            return bundles;
        }
    }
}