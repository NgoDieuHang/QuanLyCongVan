using QLCV.Common;
using QuanLyCongVan.Areas.Admin.Models.OrganizationManagement;
using QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using static QLCV.Common.Enum.ConstantsEnum;
using static QLCV.Common.Enum.MessageEnum;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class OrganizationManagementController : Controller
    {
        // GET: Admin/OrganizationManagement
        /// <summary>
        /// Điều hướng đến trang hiển thị danh sách Organization nếu là request thông thường.
        /// Trả về table chứa danh sách Organization nếu là Ajax.
        /// Điều hướng về trang lỗi nếu có lỗi sảy ra.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="condition">Đối tượng chứa điều kiện tìm kiếm, tạo thành từ query string</param>
        /// <returns>
        /// Trang danh sách Organization.
        /// Partial view chứa table danh sách Organization.
        /// </returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: ListOfOrganization
        /// </remarks>
        public ActionResult ListOfOrganization(OrganizationConditionSearch condition)
        {
            try
            {
                if (Request.IsAjaxRequest())
                {
                    return View("Partial/_tableOfOrganization", new OrganizationModel().GetListOfOrganization(condition));
                }
                return View(new OrganizationModel().GetListOfOrganization(condition));
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }
        /// <summary>
        /// Xóa các Organization theo danh sách id Organization được gửi lên.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id các Organization sẽ xóa</param>
        /// <returns>Đối tượng chứa thông tin về quá tringh xóa Organization</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: DeleteOrganizations
        /// </remarks>
        public JsonResult DeleteOrganizations(List<int> ids)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                bool deleted = new OrganizationModel().DeleteOrganizations(ids);
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
        /// Trả về view add Organization khi click add Organization.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// </remarks>
        public ActionResult ViewCreateOrganization()
        {
            try
            {
                return View("OrganizationMaster");
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }
        /// <summary>
        /// Điều hướng đến trang view sửa Organization
        /// Author       :   HangNTD - 25/07/2018 - create
        /// </summary>
        /// <param name="id">Đối tượng chứa thông tin về quá trình chỉnh sửa thông tin</param>
        /// <returns>Trả về trang view sửa Organization</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: ViewEditOrganization
        /// </remarks>
        public ActionResult ViewEditOrganization(string id)
        {
            try
            {
                OrganizationMaster OrganizationMaster = new OrganizationModel().GetOrganization(id);
                if (OrganizationMaster.Mode == (int)ModeMaster.Insert)
                {
                    return RedirectToAction("ViewCreateOrganization");
                }
                return View("OrganizationMaster", OrganizationMaster);
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }
        /// <summary>
        /// Tạo Organization hoặc cập nhật Organization theo thông tin người dùng đưa lên.
        /// Author       :   HangNTD - 25/07/2018 - create
        /// </summary>
        /// <param name="data">Thông tin Organization mà người dùng nhập vào</param>
        /// <returns>Chuỗi Json chứa kết quả của việc tạo hoặc cập nhật Organization</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: SaveOrganization
        /// </remarks>
        [HttpPost]
        public JsonResult SaveOrganization(Organization data)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                if (ModelState.IsValid)
                {
                    //response = new OrganizationModel().SaveOrganization(data);
                }
                else
                {
                    response.Code = (int)CodeResponse.NotValidate;
                    response.ListError = ModelState.GetModelErrors();
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
    }
}