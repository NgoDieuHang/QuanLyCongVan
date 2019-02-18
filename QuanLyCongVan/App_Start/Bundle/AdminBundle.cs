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

            bundles.Add(new ScriptBundle("~/public/js/admin/listOfDispatch").Include(
              "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
                "~/public/assets/moment/moment.js",
               "~/public/assets/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js",
               "~/public/js/admin/dispatch/listOfDispatch.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/listOfDispatch").Include(
                "~/public/assets/switchery/dist/switchery.css",
                "~/public/assets/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"
            ));

            bundles.Add(new ScriptBundle("~/public/js/admin/documentMaster").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
               "~/public/js/admin/Document/DocumentMaster.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/documentMaster").Include(
                "~/public/assets/switchery/dist/switchery.css"
           ));

            bundles.Add(new ScriptBundle("~/public/js/admin/listOfDocument").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js"
           ));

            bundles.Add(new ScriptBundle("~/public/js/admin/typeDispatchMaster").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
               "~/public/js/admin/TypeDispatch/TypeDispatchMaster.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/typeDispatchMaster").Include(
                "~/public/assets/switchery/dist/switchery.css"
           ));

            bundles.Add(new ScriptBundle("~/public/js/admin/listOfTypeDispatch").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js"
           ));
            bundles.Add(new ScriptBundle("~/public/js/admin/dispatchMaster").Include(
                "~/public/assets/moment/moment.js",
                "~/public/assets/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js",
                "~/public/assets/switchery/dist/switchery.js",
                "~/public/js/admin/dispatch/DispatchMaster.js"
            ));

            bundles.Add(new StyleBundle("~/public/css/admin/dispatchMaster").Include(
                "~/public/assets/switchery/dist/switchery.css",
                "~/public/assets/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"
            ));

            bundles.Add(new ScriptBundle("~/public/js/admin/feildDispatchMaster").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
               "~/public/js/admin/FeildDispatch/FeildDispatchMaster.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/feildDispatchMaster").Include(
                "~/public/assets/switchery/dist/switchery.css"
           ));

            bundles.Add(new ScriptBundle("~/public/js/admin/listOfFeildDispatch").Include(
                "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js"
           ));

            bundles.Add(new ScriptBundle("~/public/js/admin/listOfOrganization").Include(
               "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
                "~/public/js/admin/organization/listOfOrganization.js"
            ));

            bundles.Add(new StyleBundle("~/public/css/admin/listOfOrganization").Include(
                "~/public/assets/switchery/dist/switchery.css"
            ));

            bundles.Add(new ScriptBundle("~/public/js/admin/organizationMaster").Include(
              "~/public/assets/pagination/pagination.js",
                "~/public/assets/iCheck/icheck.js",
               "~/public/assets/switchery/dist/switchery.js",
               "~/public/js/admin/organization/organizationMaster.js"
           ));

            bundles.Add(new StyleBundle("~/public/css/admin/organizationMaster").Include(
                "~/public/assets/switchery/dist/switchery.css",
                "~/public/assets/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css"
            ));
            return bundles;
        }
    }
}