using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QLCV.Common.Enum.ConstantsEnum;

namespace QuanLyCongVan.Areas.Admin.Models.DocumentManagement.Schema
{
    /// <summary>
    /// Class dùng để chứa thông tin của của loại văn bản,dùng để thêm hoặc sửa
    /// Author       :   HoangNM - 27/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class DocumentMaster
    {
        public Document Document { set; get; }
        public int Mode { set; get; }
        public DocumentMaster()
        {
            Mode = (int)ModeMaster.Insert;
            Document = null;
        }
    }
}