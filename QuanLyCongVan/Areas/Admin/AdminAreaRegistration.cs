using System.Web.Mvc;

namespace QuanLyCongVan.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ListOfOrganization",
                "admin/list-of-organization",
                new { controller = "OrganizationManagement", action = "ListOfOrganization", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "DeleteOrganizations",
                "admin/list-of-organization/delete-organization",
                new { controller = "OrganizationManagement", action = "DeleteOrganizations", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "CreateOrganization",
                "admin/create-organization",
                new { controller = "OrganizationManagement", action = "ViewCreateOrganization", id = UrlParameter.Optional }
            );

            context.MapRoute(
               "EditOrganization",
               "admin/edit-organization/{id}",
               new { controller = "OrganizationManagement", action = "ViewEditOrganization", id = UrlParameter.Optional }
           );

            context.MapRoute(
                "SaveOrganization",
                "admin/organization-master/save-organization",
                new { controller = "OrganizationManagement", action = "SaveOrganization", id = UrlParameter.Optional }
            );
        }
    }
}