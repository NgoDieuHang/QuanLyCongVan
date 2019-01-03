using QLCV.Common;
using QuanLyCongVan.Areas.Admin.Models.DocumentManagement;
using QuanLyCongVan.Areas.Admin.Models.DocumentManagement.Schema;
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
    /// Class chứa các điều hướng liên quan đến quản lý danh sách loại văn bản
    /// Author       :   HoàngNM - 27/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel
    /// Copyright    :   Team AHH
    /// Version      :   1.0.0
    /// </remarks>
    public class DocumentController : Controller
    {


        /// <summary>
        /// Điều hướng về trang lỗi nếu có lỗi sảy ra.
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <returns>
        /// Trang danh sách văn bản.
        /// </returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: ListOfDocument
        /// </remarks>
        public ActionResult ListOfDocument()
        {
            try
            {
                return View(new ListOfDocumentModel().GetListOfDocument());
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// Xóa các loại văn bản id loại văn bản được gửi lên.
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id các loại văn bản sẽ xóa</param>
        /// <returns>Đối tượng chứa thông tin về quá trình xóa loại văn bản</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: DeleteDocument
        /// </remarks>
        public JsonResult DeleteDocument(List<int> ids)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                new ListOfDocumentModel().DeleteDocument(ids);

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
        /// Thêm loại văn bản 
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>

        public ActionResult ViewCreateDocument()
        {
            try
            {
                return View("DocumentMaster");
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// thay đổi thông tin của loại văn bản
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="id">id của loại văn bản muốn update</param>

        public ActionResult ViewEditDocument(string id)

        {
            try
            {
                DocumentMaster documentMaster = new DocumentMasterModel().LoadDocument(id);
                if (documentMaster.Mode == (int)ModeMaster.Insert)
                {
                    return RedirectToAction("ViewCreateDocument");
                }
                return View("DocumentMaster", documentMaster);
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }

        /// <summary>
        /// lưu thay đổi hoặc add thông tin của loại văn bản
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="data">data chứa thông tin của loại văn bản</param>
        [HttpPost]
        public JsonResult SaveDocument(Document data)
        {
            ResponseInfo response = new ResponseInfo();
            try
            {
                if (ModelState.IsValid)
                {
                    response = new DocumentMasterModel().SaveDocument(data);
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