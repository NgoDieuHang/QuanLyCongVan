using QLCV.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLCV.Common
{
    public class XacThuc
    {
        /// <summary>
        /// Kiểm tra quyền truy cập một action trong controller.
        /// Author      :   AnTM  - 25/08/2018 - create
        /// </summary>
        /// <param name="token">
        /// token của user login.
        /// </param>
        /// <param name="controller">
        /// controller cần kiểm tra.
        /// </param>
        /// <param name="action">
        /// action trong controller cần kiểm tra.
        /// </param>
        /// <returns>
        /// Kết quả sau khi kiểm tra.
        /// </returns>
        public static bool CheckAuthentication(string token, string controller, string action)
        {
            try
            {
                DataContext context = new DataContext();
                //int idGroup = GetAccount().GroupOfAccount.FirstOrDefault(y => !y.DelFlag).IdGroup;
                //TblPermission permission = context.Permission.FirstOrDefault(x => !x.DelFlag && x.IdGroup == idGroup && x.ChucNang.ControllerName == controller && x.ChucNang.ActionName == action);
                //if (permission != null && !permission.IsEnable)
                //{
                //    return false;
                //}
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// Kiểm tra quyền truy cập một chức năng theo mã chức năng.
        /// Author       :   AnTM  - 25/08/2018 - create
        /// </summary>
        /// <param name="idFunction">
        /// Mã chức năng cần kiểm tra.
        /// </param>
        /// <returns>
        /// Kết quả sau khi kiểm tra.
        /// </returns>
        public static bool CheckAuthentication(string idFunction)
        {
            try
            {
                DataContext context = new DataContext();
                //int idGroup = GetAccount().GroupOfAccount.FirstOrDefault(y => !y.DelFlag).IdGroup;
                //TblPermission permission = context.Permission.FirstOrDefault(x => !x.DelFlag && x.IdChucNang == idFunction && x.IdGroup == idGroup);
                //if (permission != null && !permission.IsEnable)
                //{
                //    return false;
                //}
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// Kiểm tra quyền truy cập chức năng của 1 list các mã chức năng.
        /// Author       :   AnTM - 25/08/2018 - create
        /// </summary>
        /// <param name="idFunctions">
        /// Danh sách mã chức năng cần kiểm tra.
        /// </param>
        /// <param name="listPermission">
        /// Danh sách quyền cần kiểm tra</param>
        /// <returns>
        /// Kết quả sau khi kiểm tra.
        /// </returns>
        public static bool CheckAuthentication(List<Permission> listPermission, List<string> idFunctions)
        {
            try
            {
                foreach (var idFunction in idFunctions)
                {
                    if (listPermission.FirstOrDefault(x => x.IsEnable && x.IdFunction == idFunction) != null)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// Kiểm tra quyền truy cập chức năng của 1 list các mã chức năng.
        /// Author       :   AnTM - 25/08/2018 - create
        /// </summary>
        /// <param name="idFunction">
        /// Mã chức năng cần kiểm tra.
        /// </param>
        /// <param name="listPermission">
        /// Danh sách quyền cần kiểm tra</param>
        /// <returns>
        /// Kết quả sau khi kiểm tra.
        /// </returns>
        public static bool CheckAuthentication(List<Permission> listPermission, string idFunction)
        {
            try
            {
                if (listPermission.FirstOrDefault(x => x.IsEnable && x.IdFunction == idFunction) != null)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// Get IdAccount đang login
        /// Author       :   QuyPN - 26/05/2018 - create
        /// </summary>
        /// <returns>
        /// IdAccount nếu tồn tại, trả về 0 nếu không tồn tại
        /// </returns>
        public static int GetIdAccount()
        {
            try
            {
                string token = Common.GetCookie("token");
                DataContext context = new DataContext();
                //TokenLogin tokenLogin = context.TokenLogin.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
                //if (tokenLogin == null)
                //{
                //    return 0;
                //}
                //return tokenLogin.Account.Id;
                return 0;
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// Get IdUser của Account đang login
        /// Author       :   QuyPN - 26/05/2018 - create
        /// </summary>
        /// <returns>
        /// IdUser nếu tồn tại, trả về 0 nếu không tồn tại
        /// </returns>
        public static int GetIdUser()
        {
            try
            {
                string token = Common.GetCookie("token");
                DataContext context = new DataContext();
                //TokenLogin tokenLogin = context.TokenLogin.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
                //if (tokenLogin == null)
                //{
                //    return 0;
                //}
                //return tokenLogin.Account.IdUser;
                return 0;
            }
            catch
            {
                return 0;
            }
        }

        /// <summary>
        /// Get Account đang login
        /// Author       :   QuyPN - 26/05/2018 - create
        /// </summary>
        /// <returns>
        /// Account nếu tồn tại, trả về null nếu không tồn tại
        /// </returns>
        //public static Account GetAccount()
        //{
        //    try
        //    {
        //        string token = Common.GetCookie("token");
        //        DataContext context = new DataContext();
        //        TokenLogin tokenLogin = context.TokenLogin.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
        //        if (tokenLogin == null)
        //        {
        //            return null;
        //        }
        //        return tokenLogin.Account;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

        /// <summary>
        /// Get User đang login
        /// Author       :   QuyPN - 26/05/2018 - create
        /// </summary>
        /// <returns>
        /// User nếu tồn tại, trả về null nếu không tồn tại
        /// </returns>
        //public static User GetUser()
        //{
        //    try
        //    {
        //        string token = Common.GetCookie("token");
        //        DataContext context = new DataContext();
        //        TokenLogin tokenLogin = context.TokenLogin.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
        //        if (tokenLogin == null)
        //        {
        //            return null;
        //        }
        //        return tokenLogin.Account.User;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}
    }
}