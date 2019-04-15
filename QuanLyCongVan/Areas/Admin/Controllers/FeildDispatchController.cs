using QLCV.Common;
using QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch;
using QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static QLCV.Common.Enum.ConstantsEnum;
using static QLCV.Common.Enum.MessageEnum;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    /// <summary>
    /// Class chứa các điều hướng liên quan đến quản lý danh sách lĩnh vực
    /// Author       :   HoangNM - 30/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class FeildDispatchController : Controller
    {
        /// <summary>
        /// Điều hướng đến trang hiển thị danh sách lĩnh vực nếu là request thông thường.
        /// Điều hướng về trang lỗi nếu có lỗi sảy ra.
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <returns>
        /// Trang danh sách lĩnh vực.
        /// </returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: ListOfFeildDispatch
        /// </remarks>
        public ActionResult ListOfFeildDispatch()
        {
            try
            {
                return View(new ListFeildOfDispatchModel().GetListOfFeildDispatch());
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// Xóa các lĩnh vực được gửi lên.
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id các lĩnh vực sẽ xóa</param>
        /// <returns>Đối tượng chứa thông tin về quá trình xóa lĩnh vực</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: DeleteFeildDispatch
        /// </remarks>
        public JsonResult DeleteFeildDispatch(List<int> ids)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                new ListFeildOfDispatchModel().DeleteFeildDispatch(ids);

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
        /// Thêm loại lĩnh vực
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>

        public ActionResult ViewCreateFeildDispatch()
        {
            try
            {
                return View("FeildDispatchMaster");
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// thay đổi thông tin của lĩnh vực
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="id">id của lĩnh vực muốn update</param>

        public ActionResult ViewEditFeildDispatch(string id)

        {
            try
            {
                FeildDispatchMaster feildDispatchMaster = new FeildDispatchMasterModel().LoadFeildDispatch(id);
                if (feildDispatchMaster.Mode == (int)ModeMaster.Insert)
                {
                    return RedirectToAction("ViewCreateFeildDispatch");
                }
                return View("FeildDispatchMaster", feildDispatchMaster);
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// lưu thay đổi hoặc add thông tin của lĩnh vực
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="data">data chứa thông tin của loại công văn</param>
        [HttpPost]
        public JsonResult SaveFeildDispatch(FeildDispatch data)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                if (ModelState.IsValid)
                {
                    response = new FeildDispatchMasterModel().SaveFeildDispatch(data);
                }
                else
                {
                    response.Code = (int)CodeResponse.NotValidate;

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