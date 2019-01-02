using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QLCV.Common;
using QLCV.Common.Enum;
using QLCV.Validate;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class DispatchManagementController : Controller
    {
        // GET: Admin/DispatchManagement
        public ActionResult DispatchMaster()
        {
            ViewBag.DispatchData = new DispatchMasterModel().GetDispatchData();
            return View();
        }

        public ActionResult ToViewEdit(string id)
        {
            //ViewBag.DispatchData = new DispatchMasterModel().GetDispatchData();
            return View("DispatchMaster");
        }

        [HttpPost]
        public JsonResult SaveDispatch(NewDispatch dispatch)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                if (ModelState.IsValid)
                {
                    response = new DispatchMasterModel().SaveDispatch(dispatch);
                }
                else
                {
                    response.Code = (int)ConstantsEnum.CodeResponse.NotValidate;
                    response.ListError = ModelState.GetModelErrors();
                }
            }
            catch (Exception e)
            {
                response.Code = (int)ConstantsEnum.CodeResponse.ServerError;
                response.MsgNo = (int)MessageEnum.MsgNO.ServerError;
                response.ThongTinBoSung1 = e.Message;
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}