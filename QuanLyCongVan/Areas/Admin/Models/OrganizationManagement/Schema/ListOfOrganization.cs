using QLCV.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema
{
    /// <summary>
    /// Class dùng để lấy danh sách tin tức trả về cho trang danh sách tin tức
    /// Author       :   HangNTD - 20/07/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   ControlPanel.Models
    /// Copyright    :   Team Noname
    /// Version      :   1.0.0
    /// </remarks>
    public class ListOfOrganization
    {
        public List<Organization> OrganizationList { set; get; }
        public Paging Paging { set; get; }
        public OrganizationConditionSearch Condition { set; get; }
        public ListOfOrganization()
        {
            this.OrganizationList = new List<Organization>();
            this.Condition = new OrganizationConditionSearch();
            this.Paging = new Paging();
        }
    }
}