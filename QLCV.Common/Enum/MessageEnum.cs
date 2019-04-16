using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLCV.Common.Enum
{
    public class MessageEnum
    {
        public enum MsgNO
        {
            BatBuocNhap = 1,
            SaiMaxlength = 2,
            SaiMinLength = 3,
            SaiFormatNgayThang = 4,
            MatKhauSai = 20,
            KhongCoTaiKhoan = 28,
            TaiKhoanBiKhoa = 29,
            ChuaKichHoatTaiKhoan = 30,
            MatKhauKhongDung = 31,
            SaiQuaSoLanChoPhep = 32,
            TenDangNhapSai = 34,
            EmailKhongTonTai = 38,
            ChuaChonFile = 50,
            DungLuongFileQuaLon = 51,
            FileKhongDungDinhDang = 53,
            TaiFileBiLoi = 55,
            BanKhongCoQuyenDangNhap = 56,
            permissions = 57,
            ServerError = 100
        }
    }
}