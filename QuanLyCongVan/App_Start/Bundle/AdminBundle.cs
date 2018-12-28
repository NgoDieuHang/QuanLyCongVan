using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace QuanLyCongVan.App_Start.Bundle
{
    public class AdminBundle
    {
        public static BundleCollection RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/public/js/admin/login").Include(
                "~/public/assets/jquery/dist/jquery.js",
                "~/public/js/common/common.js",
                "~/public/js/common/jquery.alerts.js",
                "~/public/assets/bootstrap/dist/js/bootstrap.js",
                "~/public/js/admin/adminlogin/index.js",
                "~/public/js/common/base64.js",
                "~/public/js/common/md5.js",
                "~/public/js/common/message.js",
                "~/public/js/common/jquery.validate.js",
                "~/public/js/common/jquery.validate.unobtrusive.js",
                "~/public/js/common/jquery.validate-vsdoc.js",
                "~/public/js/common/jquery-cookie.js",
                "~/public/js/common/jquery.error-style.js",
                "~/public/js/common/jquery.alerts.js"
            ));
            bundles.Add(new StyleBundle("~/public/css/admin/login").Include(
                "~/public/assets/bootstrap/dist/css/bootstrap.css",
                "~/public/assets/font-awesome-4.7.0/css/font-awesome.css",
                "~/public/css/admin/nprogress.css",
                "~/public/assets/animate.css/animate.css",
                "~/public/css/admin/custom.css",
                "~/public/css/common/error-notify.css"
            ));

            bundles.Add(new ScriptBundle("~/public/js/admin/documentMaster").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
               "~/public/js/admin/Document/DocumentMaster.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/documentMaster").Include(
                "~/public/assets/switchery/dist/switchery.css",
               "~/public/assets/switchery/dist/switchery.css"
           ));
            return bundles;
        }
    }
}