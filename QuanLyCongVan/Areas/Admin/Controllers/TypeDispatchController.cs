using QLCV.Common;
using QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement;
using QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement.Schema;
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
    /// Class chứa các điều hướng liên quan đến quản lý danh sách loại công văn
    /// Author       :   HoàngNM - 29/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class TypeDispatchController : Controller
    {
        /// <summary>
        /// Điều hướng đến trang hiển thị danh sách văn bản nếu là request thông thường.
        /// Điều hướng về trang lỗi nếu có lỗi sảy ra.
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <returns>
        /// Trang danh sách công văn.
        /// </returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: ListOfDispatch
        /// </remarks>
        public ActionResult ListOfTypeDispatch()
        {
            try
            {
                return View(new ListOfTypeDispatchModel().GetListOfTypeDispatch());
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// Xóa các loại công văn id loại công văn được gửi lên.
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id các loại công văn sẽ xóa</param>
        /// <returns>Đối tượng chứa thông tin về quá trình xóa loại công văn</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: DeleteTypeDispatch
        /// </remarks>
        public JsonResult DeleteTypeDispatch(List<int> ids)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                new ListOfTypeDispatchModel().DeleteTypeDispatch(ids);

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
        /// Thêm loại công văn
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>

        public ActionResult ViewCreateTypeDispatch()
        {
            try
            {
                return View("TypeDispatchMaster");
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// thay đổi thông tin của loại công văn
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="id">id của loại công văn muốn update</param>

        public ActionResult ViewEditDocument(string id)

        {
            try
            {
                TypeDispatchMaster documentMaster = new TypeDispatchMasterModel().LoadTypeDispatch(id);
                if (documentMaster.Mode == (int)ModeMaster.Insert)
                {
                    return RedirectToAction("ViewCreateTypeDispatch");
                }
                return View("TypeDispatchMaster", documentMaster);
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// lưu thay đổi hoặc add thông tin của loại công văn
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="data">data chứa thông tin của loại công văn</param>
        [HttpPost]
        public JsonResult SaveTypeDispatch(TypeDispatch data)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                if (ModelState.IsValid)
                {
                    response = new TypeDispatchMasterModel().SaveTypeDispatch(data);
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