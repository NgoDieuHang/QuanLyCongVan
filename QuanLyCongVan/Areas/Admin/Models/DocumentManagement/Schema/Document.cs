using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.DocumentManagement.Schema
{
    public class Document
    {
        public int Id { set; get; }
        [Required]
        [StringLength(100)]
        public string tenLoaiVanBan { get; set; }

        [StringLength(10)]
        public string kyHieu { get; set; }
    }

    
}