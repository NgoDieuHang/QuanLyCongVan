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
}