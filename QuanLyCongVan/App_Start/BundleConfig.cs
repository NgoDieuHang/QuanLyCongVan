using System.Web;
using System.Web.Optimization;
using QuanLyCongVan.App_Start.Bundle;

namespace QuanLyCongVan
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles = HomeBundle.RegisterBundles(bundles);
            bundles = AdminBundle.RegisterBundles(bundles);
            bundles = LayoutAdminBundle.RegisterBundles(bundles);
            
        }
    }
}