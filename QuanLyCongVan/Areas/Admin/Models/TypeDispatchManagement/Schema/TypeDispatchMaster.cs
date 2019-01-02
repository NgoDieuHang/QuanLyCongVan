using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QLCV.Common.Enum.ConstantsEnum;

namespace QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement.Schema
{
    /// <summary>
    /// Class dùng để chứa thông tin của của loại công văn,dùng để thêm hoặc sửa
    /// Author       :   HoangNM - 27/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class TypeDispatchMaster
    {
        public TypeDispatch typeDispatch { set; get; }
        public int Mode { set; get; }
        public TypeDispatchMaster()
        {
            Mode = (int)ModeMaster.Insert;
            typeDispatch = null;
        }
    }
}