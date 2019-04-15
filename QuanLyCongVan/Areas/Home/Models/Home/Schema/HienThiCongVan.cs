using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Home.Models.Home.Schema
{
    public class HienThiCongVan
    {
     
        public long Id { get; set; }

        public string TrichYeu { get; set; }

        public string NoiDung { get; set; }

        public DateTime NgayBanHanh { get; set; }

        public string FilePath { get; set; }

        public string CoQuanToChu { get; set; }

    }
}