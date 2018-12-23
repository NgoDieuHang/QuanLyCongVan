namespace QLCV.Database
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DataContext : DbContext
    {
        public DataContext()
            //@"Data Source=103.95.197.121;Initial Catalog=TrungTamTinHoc_DEV;User Id=sa;Password=Admin@123;MultipleActiveResultSets=True;"
            //@"Data Source=NGOCQUY\SQLEXPRESS;Initial Catalog=TrungTamTinHoc_DEV;Integrated Security=True;"
            //: base(@"Data Source=103.95.197.121;Initial Catalog=TrungTamTinHoc_DEV;User Id=sa;Password=Admin@123;MultipleActiveResultSets=True;")
            : base(@"Data Source=178.128.114.26;Initial Catalog=QuanLyCongVan;Integrated Security=True;User Id=sa;Password=MinhAn@2003")

        {
            Database.SetInitializer<DataContext>(new CreateDatabaseIfNotExists<DataContext>());
        }

        public virtual DbSet<CongVan> CongVans { get; set; }
        public virtual DbSet<CoQuanBanHanh> CoQuanBanHanhs { get; set; }
        public virtual DbSet<LinhVuc> LinhVucs { get; set; }
        public virtual DbSet<LoaiCongVan> LoaiCongVans { get; set; }
        public virtual DbSet<LoaiVanBan> LoaiVanBans { get; set; }
        public virtual DbSet<TinTuc> TinTucs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CoQuanBanHanh>()
                .HasMany(e => e.CongVans)
                .WithRequired(e => e.CoQuanBanHanh)
                .HasForeignKey(e => e.IdCoQuanBanHanh)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LinhVuc>()
                .HasMany(e => e.CongVans)
                .WithRequired(e => e.LinhVuc)
                .HasForeignKey(e => e.IdLinhVuc)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LoaiCongVan>()
                .HasMany(e => e.CongVans)
                .WithRequired(e => e.LoaiCongVan)
                .HasForeignKey(e => e.IdLoaiCongVan)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LoaiVanBan>()
                .HasMany(e => e.CongVans)
                .WithRequired(e => e.LoaiVanBan)
                .HasForeignKey(e => e.IdLoaiVanBan)
                .WillCascadeOnDelete(false);
        }
    }
}
