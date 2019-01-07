using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QLCV.Database;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema
{
    public class DispatchData
    {
        public Dispatch Dispatch { get; set; }
        public List<LoaiCongVan> LoaiCongVans { get; set; }
        public List<LoaiVanBan> LoaiVanBans { get; set; }
        public List<LinhVuc> LinhVucs { get; set; }
        public List<CoQuanBanHanh> CoQuanBanHanhs { get; set; }

        public DispatchData()
        {
            LoaiCongVans = new List<LoaiCongVan>();
            LoaiVanBans = new List<LoaiVanBan>();
            LinhVucs = new List<LinhVuc>();
            CoQuanBanHanhs = new List<CoQuanBanHanh>();
        }
    }
}