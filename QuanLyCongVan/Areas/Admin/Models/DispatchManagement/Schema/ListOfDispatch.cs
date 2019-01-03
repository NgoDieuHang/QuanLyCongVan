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
        public string KeySearch { set; get; }
        public int CurentPage { set; get; }
        public int PageSize { set; get; }
        public DispatchConditionSearch()
        {
            this.KeySearch = "";
            this.PageSize = 10;
            this.CurentPage = 1;
        }
    }
}