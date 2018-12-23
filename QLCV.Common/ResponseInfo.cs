using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QLCV.Common.Enum.ConstantsEnum;

namespace QLCV.Common
{
    public class ResponseInfo
    {
        // 200: Thành công
        // 201: Validate sai
        // 500: Lỗi server
        // 403: Không có quyền truy cập
        public int Code { set; get; }
        public int MsgNo { set; get; }
        public Dictionary<string, string> ListError { set; get; }
        public string ThongTinBoSung1 { set; get; }
        public string ThongTinBoSung2 { set; get; }
        public string ThongTinBoSung3 { set; get; }
        public List<object> ThongTinBoSung4 { get; set; }
        public object ThongTinBoSung5 { get; set; }
        public ResponseInfo()
        {
            Code = (int)CodeResponse.OK;
            MsgNo = 0;
        }
    }
}