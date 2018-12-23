using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace QLCV.Database
{
    [Table("TinTuc")]
    public partial class TinTuc : Table
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TieuDe { get; set; }

        [Required]
        public string TomTat { get; set; }

        [Required]
        public string NoiDung { get; set; }
    }
}
