using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema
{
    public class Organization
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TenCoQuanBanHanh { get; set; }

        [Required]
        [StringLength(10)]
        public string KiHieu { get; set; }
    }
    /// <summary>
    /// Class dùng để chứa thông tin tìm kiếm của danh sách organization
    /// Author       :   HangNTD - 27/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team Noname
    /// Version      :   1.0.0
    /// </remarks>
    public class OrganizationConditionSearch
    {
        public string KeySearch { set; get; }
        public bool? TrangThai { set; get; }
        public int CurentPage { set; get; }
        public int PageSize { set; get; }
        public OrganizationConditionSearch()
        {
            this.KeySearch = "";
            this.TrangThai = null;
            this.PageSize = 10;
            this.CurentPage = 1;
        }
    }
}