using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace QLCV.Database
{
    [Table("CoQuanBanHanh")]
    public partial class CoQuanBanHanh : Table
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CoQuanBanHanh()
        {
            CongVans = new HashSet<CongVan>();
        }

        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TenCoQuanBanHanh { get; set; }

        [Required]
        [StringLength(10)]
        public string KiHieu { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CongVan> CongVans { get; set; }
    }
}