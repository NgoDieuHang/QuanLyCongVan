using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch.Schema
{
    public class FeildDispatch
    {
        public int Id { set; get; }
        [Required]
        [StringLength(100)]
        public string tenLinhVuc { get; set; }
    }
}