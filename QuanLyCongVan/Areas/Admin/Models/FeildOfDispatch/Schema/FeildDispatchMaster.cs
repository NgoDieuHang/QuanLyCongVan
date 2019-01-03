using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QLCV.Common.Enum.ConstantsEnum;

namespace QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch.Schema
{
    /// <summary>
    /// Class dùng để chứa thông tin của của lĩnh vực,dùng để thêm hoặc sửa
    /// Author       :   HoangNM - 30/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class FeildDispatchMaster
    {
        public FeildDispatch feildOfDispatch { set; get; }
        public int Mode { set; get; }
        public FeildDispatchMaster()
        {
            Mode = (int)ModeMaster.Insert;
            feildOfDispatch = null;
        }
    }
}