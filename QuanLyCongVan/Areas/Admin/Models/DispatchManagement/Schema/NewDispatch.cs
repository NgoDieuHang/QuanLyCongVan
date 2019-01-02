using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema
{
    public class NewDispatch
    {
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string SoKyHieu { get; set; }

        [Required]
        public int IdLoaiVanBan { get; set; }

        [Required]
        public int IdCoQuanBanHanh { get; set; }

        [Required]
        public int IdLoaiCongVan { get; set; }

        public int? SoCongVanDen { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCongVanDen { get; set; }

        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime NgayBanHanh { get; set; }

        [Required]
        public int IdLinhVuc { get; set; }

        [Required]
        [StringLength(500)]
        public string TrichYeu { get; set; }

        [Required]
        [StringLength(500)]
        public string NoiDung { get; set; }

        public HttpPostedFileBase FileAttach { get; set; }

        public string FilePath { get; set; }
    }
}