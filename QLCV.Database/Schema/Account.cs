using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QLCV.Database
{
    [Table("Account")]
    public partial class Account : Table
    {
        [Key]
        [Column(Order = 0)]
        public long Id { get; set; }

        public Account()
        {
            TokenLogin = new HashSet<TokenLogin>();
        }

        [StringLength(50)]
        public string Username { get; set; }

        [StringLength(50)]
        public string Password { get; set; }
        [Required]
        [StringLength(50)]
        public string Ho { get; set; }
        [Required]
        [StringLength(50)]
        public string Ten { get; set; }

        [Required]
        [StringLength(255)]
        public string Avatar { get; set; }

        public bool GioiTinh { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [Column(TypeName = "date")]
        public DateTime? NgaySinh { get; set; }

        [StringLength(15)]
        public string SoDienThoai { get; set; }

        [StringLength(100)]
        public string TokenActive { get; set; }

        public DateTime? TimeOfToken { set; get; }

        public bool IsActived { get; set; }

        public bool IsActiveEmail { get; set; }

        public int SoLanDangNhapSai { get; set; }

        public DateTime KhoaTaiKhoanDen { get; set; }

        [StringLength(100)]
        public string ResetPasswordCode { get; set; }

        public virtual ICollection<TokenLogin> TokenLogin { get; set; }
    }
}