using System.Collections.Generic;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema
{
    public class DispatchData
    {
        public Dispatch Dispatch { get; set; }
        public List<QLCV.Database.LoaiCongVan> LoaiCongVans { get; set; }
        public List<QLCV.Database.LoaiVanBan> LoaiVanBans { get; set; }
        public List<QLCV.Database.LinhVuc> LinhVucs { get; set; }
        public List<QLCV.Database.CoQuanBanHanh> CoQuanBanHanhs { get; set; }

        public DispatchData()
        {
            LoaiCongVans = new List<QLCV.Database.LoaiCongVan>();
            LoaiVanBans = new List<QLCV.Database.LoaiVanBan>();
            LinhVucs = new List<QLCV.Database.LinhVuc>();
            CoQuanBanHanhs = new List<QLCV.Database.CoQuanBanHanh>();
        }
    }
}