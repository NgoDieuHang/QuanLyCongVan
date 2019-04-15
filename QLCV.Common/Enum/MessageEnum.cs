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
            SaiQuaSoLanChoPhep = 32,
            TenDangNhapSai = 34,
            EmailKhongTonTai = 38,
            MatKhauSai = 20,
            ChuaChonFile = 50,
            DungLuongFileQuaLon = 51,
            FileKhongDungDinhDang = 53,
            TaiFileBiLoi = 55,
            BanKhongCoQuyenDangNhap = 56,
            ServerError = 100,
            permissions = 57
        }
    }
}