using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QLCV.Database
{
    [Table("TokenLogin")]
    public partial class TokenLogin : Table
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }

        public long IdAccount { get; set; }

        [Required]
        [StringLength(100)]
        public string Token { get; set; }

        public DateTime ThoiGianTonTai { get; set; }

        public virtual Account Account { get; set; }
    }
}