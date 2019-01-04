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
               "ListOfDispatch",
               "admin/list-of-dispatch",
               new { controller = "DispatchManagement", action = "ListOfDispatch", id = UrlParameter.Optional }
           );
            context.MapRoute(
               "LoadFileDispatch",
               "admin/load-file-dispatch/{id}",
               new { controller = "DispatchManagement", action = "LoadFileDisPatch", id = UrlParameter.Optional }
           );

            context.MapRoute(
                "DeleteDispatchs",
                "admin/list-of-dispatch/delete-dispatch",
                new { controller = "DispatchManagement", action = "DeleteDispatchs", id = UrlParameter.Optional }
            );
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

            context.MapRoute(
                "ListOfDocument",
                "admin/list-of-document",
                new { controller = "Document", action = "ListOfDocument", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "DeleteDocument",
                "admin/list-of-document/delete-document",
                new { controller = "Document", action = "DeleteDocument", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "CreateDocument",
                "admin/create-document",
                new { controller = "Document", action = "ViewCreateDocument", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "EditDocument",
                "admin/edit-document/{id}",
                new { controller = "Document", action = "ViewEditDocument", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "SaveDocument",
                "admin/document-master/save-document",
                new { controller = "Document", action = "SaveDocument", id = UrlParameter.Optional }
            );


            context.MapRoute(
                "ListOfTypeDispatch",
                "admin/list-of-typeDispatch",
                new { controller = "TypeDispatch", action = "ListOfTypeDispatch", id = UrlParameter.Optional }
            );


            context.MapRoute(
                "DeleteTypeDispatch",
                "admin/list-of-type-dispatch/delete-type-dispatch",
                new { controller = "TypeDispatch", action = "DeleteTypeDispatch", id = UrlParameter.Optional }
            );


            context.MapRoute(
                "CreateTypeDispatch",
                "admin/create-type-dispatch",
                new { controller = "TypeDispatch", action = "ViewCreateTypeDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "EditTypeDispatch",
                "admin/edit-type-dispatch/{id}",
                new { controller = "TypeDispatch", action = "ViewEditTypeDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "SaveTypeDispatch",
                "admin/type-dispatch-master/save-type-dispatch",
                new { controller = "TypeDispatch", action = "SaveTypeDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "CreateDispatch",
                "admin/create-dispatch",
                new { controller = "DispatchManagement", action = "DispatchMaster", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "EditDispatch",
                "admin/edit-dispatch/{id}",
                new { controller = "DispatchManagement", action = "DispatchMaster", id = UrlParameter.Optional }
            );
            context.MapRoute(
                "SaveDispatch",
                "admin/save-dispatch/{id}",
                new { controller = "DispatchManagement", action = "SaveDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "ListOfFeildDispatch",
                "admin/list-of-feildDispatch",
                new { controller = "FeildDispatch", action = "ListOfFeildDispatch", id = UrlParameter.Optional }
            );


            context.MapRoute(
                "DeleteFeildDispatch",
                "admin/list-of-feild-dispatch/delete-feild-dispatch",
                new { controller = "FeildDispatch", action = "DeleteFeildDispatch", id = UrlParameter.Optional }
            );


            context.MapRoute(
                "CreateFeildDispatch",
                "admin/create-feild-dispatch",
                new { controller = "FeildDispatch", action = "ViewCreateFeildDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "EditFeildDispatch",
                "admin/edit-feild-dispatch/{id}",
                new { controller = "FeildDispatch", action = "ViewEditFeildDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "SaveFeildDispatch",
                "admin/feild-dispatch-master/save-feild-dispatch",
                new { controller = "FeildDispatch", action = "SaveFeildDispatch", id = UrlParameter.Optional }
            );

            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );

            //context.MapRoute(
            //"ListOfOrganization",
            //    "admin/list-of-organization",
            //    new { controller = "OrganizationManagement", action = "ListOfOrganization", id = UrlParameter.Optional }
            //);

           // context.MapRoute(
           //     "DeleteOrganizations",
           //     "admin/list-of-organization/delete-organization",
           //     new { controller = "OrganizationManagement", action = "DeleteOrganizations", id = UrlParameter.Optional }
           // );

           // context.MapRoute(
           //     "CreateOrganization",
           //     "admin/create-organization",
           //     new { controller = "OrganizationManagement", action = "ViewCreateOrganization", id = UrlParameter.Optional }
           // );

           // context.MapRoute(
           //    "EditOrganization",
           //    "admin/edit-organization/{id}",
           //    new { controller = "OrganizationManagement", action = "ViewEditOrganization", id = UrlParameter.Optional }
           //);

           // context.MapRoute(
           //     "SaveOrganization",
           //     "admin/organization-master/save-organization",
           //     new { controller = "OrganizationManagement", action = "SaveOrganization", id = UrlParameter.Optional }
           // );
        }
    }
}