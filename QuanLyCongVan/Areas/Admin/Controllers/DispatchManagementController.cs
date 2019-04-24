using QLCV.Common;
using QLCV.Common.Enum;
using QLCV.Database;
using QLCV.Validate;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using static QLCV.Common.Enum.ConstantsEnum;
using static QLCV.Common.Enum.MessageEnum;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class DispatchManagementController : Controller
    {
        // GET: Admin/DispatchManagement
        /// <summary>
        /// Điều hướng đến trang hiển thị danh sách Dispatch nếu là request thông thường.
        /// Trả về table chứa danh sách Dispatch nếu là Ajax.
        /// Điều hướng về trang lỗi nếu có lỗi sảy ra.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="condition">Đối tượng chứa điều kiện tìm kiếm, tạo thành từ query string</param>
        /// <returns>
        /// Trang danh sách Dispatch.
        /// Partial view chứa table danh sách Dispatch.
        /// </returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: ListOfDispatch
        /// </remarks>
        public ActionResult ListOfDispatch(DispatchConditionSearch condition)
        {
            try
            {
                if (Request.IsAjaxRequest())
                {
                    return View("Partial/_tableOfDispatch", new ListOfDispatchModel().GetListOfDispatch(condition));
                }
                return View(new ListOfDispatchModel().GetListOfDispatch(condition));
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// Xóa các Dispatch theo danh sách id Dispatch được gửi lên.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id các Dispatch sẽ xóa</param>
        /// <returns>Đối tượng chứa thông tin về quá tringh xóa Dispatch</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: DeleteDispatchs
        /// </remarks>
        public JsonResult DeleteDispatchs(List<long> ids)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                bool deleted = new ListOfDispatchModel().DeleteDispatchs(ids);
                if (!deleted)
                {
                    response.Code = 201;
                    response.MsgNo = 45;
                }
            }
            catch (Exception e)
            {
                response.Code = (int)CodeResponse.ServerError;
                response.MsgNo = (int)MsgNO.ServerError;
                response.ThongTinBoSung1 = e.Message;
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Điều hướng đến trang thêm mới công văn.
        /// Author       :   AnTM - 12/30/2018 - create
        /// </summary>
        /// <returns>Điều hướng đến trang thêm mới công văn</returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: CreateDispatch
        /// </remarks>
        public ActionResult DispatchMaster()
        {
            ViewBag.DispatchData = new DispatchMasterModel().GetDispatchData();
            return View();
        }

        /// <summary>
        /// Điều hướng đến trang chỉnh sửa công văn.
        /// Author       :   AnTM - 12/30/2018 - create
        /// </summary>
        /// <returns>Điều hướng đến trang chỉnh sửa công văn.</returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: EditDispatch
        /// </remarks>
        public ActionResult ToViewEdit(string id)
        {
            ViewBag.DispatchData = new DispatchMasterModel().GetDispatchData();
            var dispatch = new DispatchMasterModel().GetDispatchById(Convert.ToInt32(id));
            if (dispatch == null)
            {
                return RedirectToAction("DispatchMaster");
            }
            ViewBag.Dispatch = dispatch;
            return View("DispatchMaster");
        }

        /// <summary>
        /// Điều hướng đến trang chi tiết công văn.
        /// Author       :   AnTM - 04/20/2019 - create
        /// </summary>
        /// <returns>Điều hướng đến trang chi tiết công văn.</returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: DetailDispatch
        /// </remarks>
        public ActionResult DetailDispatch(string id)
        {
            int idConvert = Convert.ToInt32(id);
            var dispatch = new DataContext().CongVans.FirstOrDefault(x=>x.Id == idConvert);
            if (dispatch == null)
            {
                return RedirectToAction("ListOfDispatch");
            }
            return View(dispatch);
        }

        /// <summary>
        /// Xử lý thêm mới hoặc chỉnh sửa công văn.
        /// Author       :   AnTM - 12/30/2018 - create
        /// </summary>
        /// <param name="dispatch">Đối tượng dispatch gửi từ client</param>
        /// <returns>Response.</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: SaveDispatch
        /// </remarks>
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