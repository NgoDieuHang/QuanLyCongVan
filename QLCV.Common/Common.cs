using QLCV.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Hosting;

namespace QLCV.Common
{
    /// <summary>
    /// Chứa các function sẽ sử dụng chung và nhiều lần trong dự án.
    /// Author       :   HangNTD - 06/05/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   TTTH.Common
    /// Copyright    :   Team Noname
    /// Version      :   1.0.0
    /// </remarks>
    public class Common
    {
        public static string defaultAvata = "http://2.bp.blogspot.com/-Fl8NZJZFq6w/U02LSHQ7iII/AAAAAAAAAHg/zpzikQfynpM/s1600/WAPHAYVL.MOBI-CONDAU+(11).gif";
        public static string domain = @"https://localhost:44371/";
        public static string defaultLang = "vi";
        public static int maxFileSize = 10;

        
        /// <summary>
        /// Sinh chuỗi token ngẫu nhiên theo id account đăng nhập, độ dài mặc định 40 ký tự.
        /// Author       :   HangNTD - 06/05/2018 - create
        /// </summary>
        /// <param name="id">
        /// id của account đăng nhập.
        /// </param>
        /// <param name="length">
        /// Dộ dài của token, mặc định 40 ký tự
        /// </param>
        /// <returns>
        /// Chuỗi token.
        /// </returns>
        public static string GetToken(int id, int length = 80)
        {
            string token = "";
            Random ran = new Random();
            string tmp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
            for (int i = 0; i < length; i++)
            {
                token += tmp.Substring(ran.Next(0, 63), 1);
            }
            token += id;
            return token;
        }

        /// <summary>
        /// Sinh chuỗi token ngẫu nhiên theo id account đăng nhập, độ dài mặc định 40 ký tự.
        /// Author       :   HangNTD - 06/05/2018 - create
        /// </summary>
        /// <param name="str">
        /// Chuỗi không trùng nhau sẽ cộng thêm vào token.
        /// </param>
        /// <param name="length">
        /// Dộ dài của token, mặc định 40 ký tự
        /// </param>
        /// <returns>
        /// Chuỗi token.
        /// </returns>
        public static string GetToken(string str, int length = 80)
        {
            string token = "";
            Random ran = new Random();
            string tmp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
            for (int i = 0; i < length; i++)
            {
                token += tmp.Substring(ran.Next(0, 63), 1);
            }
            token += str;
            return token;
        }

        /// <summary>
        /// Chuyển từ tiếng việt có dấu thành tiếng việt không dấu.
        /// Author       :   HangNTD - 06/05/2018 - create
        /// </summary>
        /// <param name="s">
        /// Chuỗi tiếng việt cần chuyển.
        /// </param>
        /// <returns>
        /// Kết quả sau khi chuyển.
        /// </returns>
        public static string ConvertToUnSign(string s)
        {
            Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
            string temp = s.Normalize(NormalizationForm.FormD);
            return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        }

        /// <summary>
        /// Lấy dữ liệu từ cookies theo khóa, nếu không có dữ liệu thì trả về theo dữ liệu mặc định truyền vào hoặc rỗng
        /// Author          : HangNTD - 27/05/2018 - create
        /// </summary>
        /// <param name="key">Khóa cần lấy dữ liệu trong cookie</param>
        /// <param name="returnDefault">Kết quả trả về mặc định nếu không có dữ lieeujt rong cookie, mặc định là chuỗi rỗng</param>
        /// <returns>Giá trị lưu trữ trong cookie</returns>
        public static string GetCookie(string key, string returnDefault = "")
        {
            try
            {
                var httpCookie = HttpContext.Current.Request.Cookies[key];
                if (httpCookie == null)
                {
                    return returnDefault;
                }
                return BaoMat.Base64Decode(HttpUtility.UrlDecode(httpCookie.Value));
            }
            catch
            {
                return returnDefault;
            }
        }

        
        
        /// <summary>
        /// Xóa file theo danh sách url đã cung cấp.
        /// Author       :   HangNTD - 18/07/2018 - create
        /// </summary>
        /// <param name="fileUrls">Danh sách url file sẽ xóa</param>
        /// <returns>True nếu xóa thành công tất cả ccs file. Exception nếu có lỗi.</returns>
        public static bool DeleteFile(List<string> fileUrls)
        {
            try
            {
                foreach (string fileUrl in fileUrls)
                {
                    string path = HostingEnvironment.MapPath("~" + fileUrl);
                    if (File.Exists(path))
                    {
                        File.Delete(path);
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static string SaveFileUpload(HttpPostedFileBase file, string folder = "/public/img/upload/", string fileName = "", List<string> typeFiles = null, int sizeFile = 10)
        {
            try
            {
                if (fileName == "")
                {
                    fileName = DateTime.Now.ToString("yyyyMMddHHmmss_") + file.FileName;
                }
                string path = HostingEnvironment.MapPath("~" + folder + fileName);
                int fileSize = file.ContentLength;
                string mimeType = Path.GetExtension(path);
                if (typeFiles != null && typeFiles.FirstOrDefault(x => x == mimeType) == null)
                {
                    return "1";
                }
                if (fileSize / 1024 / 1024 > Common.maxFileSize)
                {
                    return "2";
                }
                if (File.Exists(path))
                {
                    File.Delete(path);
                }
                file.SaveAs(path);
                return folder + fileName;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// get list các type trong ErrorMgs
        /// Author       :   HangNTD - 24/08/2018 - create
        /// </summary>
        ///
        public List<TypeError> getTypeErrors()
        {
            List<TypeError> types = new List<TypeError>();
            string[] typeMsg = { "", "Confirm", "Success", "Warning", "Error", "Info", "Alert" };
            for (int i = 1; i < 7; i++)
            {
                types.Add(new TypeError { type = i, typeMsg = typeMsg[i] });
            }
            return types;
        }


        /// <summary>
        /// Get list permission để kiểm tra hiển thị menu
        /// Author       :   HangNTD - 05/09/2018 - create
        /// <param name="idGroup">ID nhóm cần kiểm tra</param>
        /// <returns>list các permission đến view của các chức năng</returns>
        /// </summary>
        //public List<Permission> GetListPermission(int idGroup)
        //{
        //    return new DataContext().Permission.Where(x => !x.DelFlag && x.IdGroup == idGroup && x.ChucNang.ToViewIndex).Select(x => new Permission()
        //    {
        //        IsEnable = x.IsEnable,
        //        IdFunction = x.IdChucNang
        //    }).ToList();
        //}
    }

    /// <summary>
    /// class chứa các type trong ErrorMgs
    /// Author       :   HangNTD - 24/08/2018 - create
    /// </summary>
    public class TypeError
    {
        public int type { get; set; }
        public string typeMsg { get; set; }
    }

    /// <summary>
    /// Class dùng để chứa thông tin của một quyền thực hiện chức năng để kiểm tra hiện left menu
    /// Author       :   HangNTD - 05/09/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel.Models
    /// Copyright    :   Team Noname
    /// Version      :   1.0.0
    /// </remarks>
    public class Permission
    {
        public int Id { get; set; }

        public string IdFunction { get; set; }

        public bool IsEnable { get; set; }
    }
}