//using QLCV.Common;
//using QLCV.Database;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using static QLCV.Common.Enum.MessageEnum;

//namespace QuanLyCongVan.Areas.Admin.Models
//{
//    /// <summary>
//    /// Class chứa các điều hướng liên quan đến admin login
//    /// Author       :   HangNTD - 09/07/2018 - create
//    /// </summary>
//    /// <remarks>
//    /// Package      :   Admin
//    /// Copyright    :   Team Noname
//    /// Version      :   1.0.0
//    /// </remarks>
//    public class AdminLoginModel
//    {
//        private DataContext context;
//        public AdminLoginModel()
//        {
//            context = new DataContext();
//        }
//        /// <summary>
//        /// Kiểm tra xem đã có acc đăng nhập chưa hoặc có quyền admin không
//        /// </summary>
//        /// <returns>
//        /// 0 nếu đăng nhập và không có quyền admin
//        /// 1 nếu đăng nhập và có quyền admin
//        /// 2 nếu chưa đăng nhập
//        /// </returns>
//        public int CheckAccountAdmin()
//        {
//            int check = 0;
//            Account account = XacThuc.GetAccount();
//            if (account == null)
//            {
//                check = 2;
//            }
//            else
//            {
//                if (context.GroupOfAccount.FirstOrDefault(x => x.IdAccount == account.Id && x.IdGroup <= 2) != null)
//                    check = 1;
//            }

//            return check;
//        }
//        /// <summary>
//        /// Kiểm tra thông tin tài khoản admin người dùng nhập vào có đúng hay không
//        /// Author       :   HangNTD - 07/07/2018 - create
//        /// </summary>
//        /// <param name="account">Đối tượng chưa thông tin tài khoản</param>
//        /// <returns>Đối tượng ResponseInfo chứa thông tin của việc kiểm tra</returns>
//        public ResponseInfo CheckAdminLogin(TblAccount account)
//        {
//            try
//            {
//                ResponseInfo result = new ResponseInfo();
//                CauHinh cauHinh = context.CauHinh.FirstOrDefault(x => x.Id == (int)OtherEnum.IdCauHinh);
//                Account taiKhoan = context.Account.FirstOrDefault(x => x.Username == account.Username && !x.DelFlag);
//                if (taiKhoan == null)
//                {
//                    taiKhoan = context.Account.FirstOrDefault(x => x.Email == account.Username && !x.DelFlag);
//                }
//                if (taiKhoan == null)
//                {
//                    result.MsgNo = (int)MsgNO.KhongCoTaiKhoan;
//                    result.Code = 202;
//                }
//                else if (taiKhoan.KhoaTaiKhoanDen > DateTime.Now)
//                {
//                    result.MsgNo = (int)MsgNO.TaiKhoanBiKhoa;
//                    result.Code = 203;
//                    result.ThongTinBoSung1 = taiKhoan.KhoaTaiKhoanDen.ToString("HH:mm dd/MM/yyyy");
//                }
//                else if (!taiKhoan.IsActived)
//                {
//                    result.MsgNo = (int)MsgNO.ChuaKichHoatTaiKhoan;
//                    result.Code = 204;
//                    // Thiếu code gửi email
//                }
//                else if (taiKhoan.Password != BaoMat.GetMD5(account.Password))
//                {
//                    taiKhoan.SoLanDangNhapSai += 1;
//                    result.MsgNo = (int)MsgNO.MatKhauKhongDung;
//                    result.ThongTinBoSung1 = taiKhoan.SoLanDangNhapSai + "";
//                    result.ThongTinBoSung2 = cauHinh.SoLanChoPhepDangNhapSai + "";
//                    result.ThongTinBoSung3 = cauHinh.ThoiGianKhoa + "";
//                    if (taiKhoan.SoLanDangNhapSai == cauHinh.SoLanChoPhepDangNhapSai)
//                    {
//                        taiKhoan.SoLanDangNhapSai = 0;
//                        taiKhoan.KhoaTaiKhoanDen = DateTime.Now.AddHours(cauHinh.ThoiGianKhoa);
//                        result.MsgNo = (int)MsgNO.SaiQuaSoLanChoPhep;
//                        result.ThongTinBoSung1 = cauHinh.SoLanChoPhepDangNhapSai + "";
//                        result.ThongTinBoSung2 = taiKhoan.KhoaTaiKhoanDen.ToLongTimeString();
//                    }
//                    context.SaveChanges();
//                    result.Code = 205;
//                }
//                else if (context.GroupOfAccount.FirstOrDefault(x => x.IdAccount == taiKhoan.Id && x.IdGroup <= 2) == null)
//                {
//                    result.MsgNo = 62;
//                    result.Code = 403;
//                }
//                else
//                {
//                    taiKhoan.SoLanDangNhapSai = 0;
//                    //Chứa thông tin chuỗi token
//                    string token = Common.GetToken(taiKhoan.Id);
//                    context.TokenLogin.Add(new TokenLogin
//                    {
//                        IdAccount = taiKhoan.Id,
//                        Token = token,
//                        ThoiGianTonTai = DateTime.Now.AddHours(cauHinh.ThoiGianTonTaiToken)
//                    });
//                    result.ThongTinBoSung1 = BaoMat.Base64Encode(token);
//                    context.SaveChanges();
//                }
//                return result;
//            }
//            catch (Exception e)
//            {
//                throw e;
//            }
//        }
//        /// <summary>
//        /// Xóa token login của admin khi admin logout
//        /// Author       :   HoangNM - 15/08/2018 - create
//        /// </summary>
//        /// <returns>true nếu xóa thành công</returns>
//        public bool RemoveToken(string token)
//        {
//            try
//            {
//                token = BaoMat.Base64Decode(token);
//                context.TokenLogin.Where(x => x.Token == token).Delete();
//                context.TokenLogin.Where(x => x.ThoiGianTonTai < DateTime.Now).Delete();
//                return true;
//            }
//            catch (Exception e)
//            {
//                throw e;
//            }
//        }
//    }
//}