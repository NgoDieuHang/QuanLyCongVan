using QLCV.Database;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace QLCV.Database
{
    [Table("CongVan")]
    public partial class CongVan : Table
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string SoKyHieu { get; set; }

        public int IdLoaiVanBan { get; set; }

        public int IdCoQuanBanHanh { get; set; }

        public int IdLoaiCongVan { get; set; }

        public int? SoCongVanDen { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? NgayCongVanDen { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime NgayBanHanh { get; set; }

        public int IdLinhVuc { get; set; }

        [Required]
        [StringLength(500)]
        public string TrichYeu { get; set; }

        [Required]
        [StringLength(500)]
        public string NoiDung { get; set; }

        [Required]
        [StringLength(500)]
        public string FilePath { get; set; }

        public virtual LoaiVanBan LoaiVanBan { get; set; }

        public virtual CoQuanBanHanh CoQuanBanHanh { get; set; }

        public virtual LoaiCongVan LoaiCongVan { get; set; }

        public virtual LinhVuc LinhVuc { get; set; }
    }
}