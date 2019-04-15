using QuanLyCongVan.Areas.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class AdminLoginController : Controller
    {
        // GET: Admin/Login
        /// <summary>
        /// Kiểm tra thông tin account để trả về view 
        /// Author: HangNTD - 09/07/2018 - create
        /// </summary>
        /// <param name=""></param>
        /// <returns>view tương ứng</returns>
        /// <remarks>
        /// RouterName: adminLogin
        public ActionResult CheckAccountAdmin()

        {
            int check = new AdminLoginModel().CheckAccountAdmin();
            if (check == 1)
                return RedirectToRoute("adminDashboard");
            else
                if (check == 0)
                return RedirectToRoute("errorNotAccess");
            return View("Index");


        }
        /// <summary>
        /// Xác thực thông tin người dùng gửi lên.
        /// Author: HangNTD - 028/05/2018 - create
        /// </summary>
        /// <param name="account">Đối tượng chưa thông tin tài khoản của người dùng</param>
        /// <returns>Chỗi Json chứa kết quả kiểm tra</returns>
        /// <remarks>
        /// Method: POST
        /// RouterName: homeCheckLogin
        /// </remarks>
        //public ActionResult CheckAdminLogin(Account account)
        //{
        //    ResponseInfo response = new ResponseInfo();
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            response = new AdminLoginModel().CheckAdminLogin(account);
        //        }
        //        else
        //        {
        //            return View("Index");
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        response.Code = (int)CodeResponse.ServerError;
        //        response.MsgNo = (int)MsgNO.ServerError;
        //        response.ThongTinBoSung1 = e.Message;
        //    }
        //    return Json(response, JsonRequestBehavior.AllowGet);
        //}

        /// <summary>
        /// Điều hướng việc logout khỏi hệ thống.
        /// Author       :   HoangNM - 15/08/2018 - create
        /// </summary>
        /// <returns>Trở về lại trang login, trả về trang error nếu có lỗi</returns>
        /// <remarks>
        /// Method: GET
        /// RouterName: adminLogout
        /// </remarks>
        public ActionResult Logout(string token)
        {
            try
            {
                new AdminLoginModel().RemoveToken(token);
                return RedirectToAction("CheckAccountAdmin");
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Error", new { area = "error", error = e.Message });
            }
        }
    }
}