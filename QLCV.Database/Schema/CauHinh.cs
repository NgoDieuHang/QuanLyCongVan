using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QLCV.Database
{
    [Table("CauHinh")]
    public class CauHinh : Table
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }
        [Required]
        public int SoLanChoPhepDangNhapSai { get; set; }
        [Required]
        public int ThoiGianKhoa { get; set; }
        [Required]
        public int ThoiGianTonTaiToken { get; set; }
    }
}