using QLCV.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema
{
    public class ListOfDispatch
    {
        public List<Dispatch> DispatchList { set; get; }
        public List<CoQuanBanHanh> CoQuanBanHanhs { get; set; }
        public List<LoaiVanBan> LoaiVanBans { get; set; }
        public List<LoaiCongVan> LoaiCongVans { get; set; }
        public List<LinhVuc> LinhVucs { get; set; }

        public Paging Paging { set; get; }
        public DispatchConditionSearch Condition { set; get; }
        public ListOfDispatch()
        {
            this.DispatchList = new List<Dispatch>();
            this.Condition = new DispatchConditionSearch();
            this.Paging = new Paging();
        }
    }

    public class DispatchConditionSearch
    {
        public string SoKiHieu { set; get; }
        public int IdCoQuanBanHanh { get; set; }
        public string TrichYeu { get; set; }
        public int IdLoaiVanBan { get; set; }
        public int IdLoaiCongVan { get; set; }
        public int? SoCongVanDen { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int IdLinhVuc { get; set; }
        public int CurentPage { set; get; }
        public int PageSize { set; get; }
        public DispatchConditionSearch()
        {
            this.SoKiHieu = null;
            this.IdCoQuanBanHanh = 0;
            this.TrichYeu = null;
            this.IdLoaiVanBan = 0;
            this.IdLoaiCongVan = 0;
            this.SoCongVanDen = null;
            this.EndDate = null;
            this.StartDate = null;
            this.IdLinhVuc = 0;
            this.PageSize = 10;
            this.CurentPage = 1;
        }
    }
}