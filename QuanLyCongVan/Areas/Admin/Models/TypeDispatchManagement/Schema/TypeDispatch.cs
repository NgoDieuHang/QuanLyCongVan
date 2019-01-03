using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement.Schema
{
    public class TypeDispatch
    {
        public int Id { set; get; }
        [Required]
        [StringLength(100)]
        public string tenLoaiCongVan { get; set; }
        
    }
}