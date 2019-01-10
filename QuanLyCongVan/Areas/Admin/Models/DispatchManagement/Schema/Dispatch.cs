using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema
{
    public class Dispatch
    {
        public long Id { get; set; }

        public string SoKyHieu { get; set; }

        public string TenLoaiVanBan { get; set; }

        public string TenCoQuanBanHanh { get; set; }

        public string TenLoaiCongVan { get; set; }

        public int? SoCongVanDen { get; set; }

        public DateTime? NgayCongVanDen { get; set; }

        public DateTime NgayBanHanh { get; set; }

        public string TenLinhVuc { get; set; }

        public string TrichYeu { get; set; }

        public string NoiDung { get; set; }

        public string FilePath { get; set; }
    }

    public class CoQuanBanHanh
    {
        public int IdCoQuanBanHanh { set; get; }
        public string TenCoQuanBanHanh { set; get; }
    }

    public class LoaiVanBan
    {
        public int IdLoaiVanBan { set; get; }
        public string TenLoaiVanBan { set; get; }
    }

    public class LoaiCongVan
    {
        public int IdLoaiCongVan { set; get; }
        public string TenLoaiCongVan { set; get; }
    }

    public class LinhVuc
    {
        public int IdLinhVuc { set; get; }
        public string TenLinhVuc { set; get; }
    }
}