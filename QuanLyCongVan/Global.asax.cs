using System;
using System.Globalization;
using System.Threading;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using QLCV.Database;
using Z.EntityFramework.Plus;

namespace QuanLyCongVan
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //Add by QuyPN to config the audit trail for database
            //AuditManager.DefaultConfiguration.AutoSavePreAction = (context, audit) =>
            //        (context as DataContext).Audit.AddRange(audit.Entries);
            //AuditManager.DefaultConfiguration.Exclude<TokenLogin>();
            AuditManager.DefaultConfiguration.ExcludeProperty<Table>(x =>
                    new { x.Created_at, x.Created_by, x.Updated_at, x.Updated_by });
            //Add by QuyPN to config the audit trail for database

            //GlobalConfiguration.Configure(WebApiConfig.Register);

            //FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        /// <summary>
        /// Kiểm tra language và set các quy chuẩn khi bắt đầu request
        /// </summary>
        /// <param name="sender">Đối tượng gửi request</param>
        /// <param name="e">Sự kiện khi gửi request</param>
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //Add by QuyPN to custom CultureInfo
            CultureInfo culture = new CultureInfo("vi");
            culture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            culture.DateTimeFormat.LongDatePattern = "dd MMMM yyyy";
            culture.DateTimeFormat.DateSeparator = "/";
            culture.DateTimeFormat.ShortTimePattern = "HH:mm";
            culture.DateTimeFormat.LongTimePattern = "HH:mm:ss";
            culture.NumberFormat.NumberDecimalSeparator = ".";
            culture.NumberFormat.NumberGroupSeparator = ",";
            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            //End add by QuyPN to custom CultureInfo
        }
    }
}
