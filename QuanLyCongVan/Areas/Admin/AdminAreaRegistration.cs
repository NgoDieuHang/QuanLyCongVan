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
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}