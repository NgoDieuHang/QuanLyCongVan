using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace QLCV.Database
{
    [Table("LinhVuc")]
    public partial class LinhVuc : Table
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public LinhVuc()
        {
            CongVans = new HashSet<CongVan>();
        }

        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TenLinhVuc { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CongVan> CongVans { get; set; }
    }
}