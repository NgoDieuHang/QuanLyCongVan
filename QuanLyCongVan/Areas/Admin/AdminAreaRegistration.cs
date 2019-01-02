﻿using System.Web.Mvc;

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
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}