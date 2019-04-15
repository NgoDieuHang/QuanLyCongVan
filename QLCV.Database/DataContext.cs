namespace QLCV.Database
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Data.Entity.Infrastructure;
    using Z.EntityFramework.Plus;

    public partial class DataContext : DbContext
    {
        public DataContext()
            //@"Data Source=103.95.197.121;Initial Catalog=TrungTamTinHoc_DEV;User Id=sa;Password=Admin@123;MultipleActiveResultSets=True;"
            //@"Data Source=NGOCQUY\SQLEXPRESS;Initial Catalog=TrungTamTinHoc_DEV;Integrated Security=True;"
            //: base(@"Data Source=103.95.197.121;Initial Catalog=TrungTamTinHoc_DEV;User Id=sa;Password=Admin@123;MultipleActiveResultSets=True;")
            //: base(@"Data Source=103.95.197.121;Initial Catalog=QuanLyCongVan;Integrated Security=True;User Id=sa;Password=Server2019@)!(")
            : base(@"Data Source=103.95.197.121;Initial Catalog=QuanLyCongVan;User Id=sa;Password=Server2019@)!(;MultipleActiveResultSets=True;")

        {
        }

        public virtual DbSet<CongVan> CongVans { get; set; }
        public virtual DbSet<CoQuanBanHanh> CoQuanBanHanhs { get; set; }
        public virtual DbSet<LinhVuc> LinhVucs { get; set; }
        public virtual DbSet<LoaiCongVan> LoaiCongVans { get; set; }
        public virtual DbSet<LoaiVanBan> LoaiVanBans { get; set; }
        public virtual DbSet<TinTuc> TinTucs { get; set; }
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<TokenLogin> TokenLogins { get; set; }
        public virtual DbSet<CauHinh> CauHinhs { get; set; }

        public override int SaveChanges()
        {
            try
            {
                if (ChangeTracker.HasChanges())
                {
                    foreach (var entry
                        in ChangeTracker.Entries())
                    {
                        try
                        {
                            var root = (Table)entry.Entity;
                            var now = DateTime.Now;
                            switch (entry.State)
                            {
                                case EntityState.Added:
                                    {
                                        root.Created_at = now;
                                        root.Created_by = 1;
                                        root.Updated_at = null;
                                        root.Updated_by = null;
                                        root.DelFlag = false;
                                        break;
                                    }
                                case EntityState.Modified:
                                    {
                                        root.Updated_at = now;
                                        root.Updated_by = 1;
                                        break;
                                    }
                            }
                        }
                        catch { }
                    }
                    var audit = new Audit();
                    audit.PreSaveChanges(this);
                    var rowAffecteds = base.SaveChanges();
                    audit.PostSaveChanges();

                    if (audit.Configuration.AutoSavePreAction != null)
                    {
                        audit.Configuration.AutoSavePreAction(this, audit);
                    }
                    return base.SaveChanges();
                }
                return 0;
            }
            catch (DbUpdateException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

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

            modelBuilder.Entity<Account>()
               .HasMany(e => e.TokenLogin)
               .WithRequired(e => e.Account)
               .HasForeignKey(e => e.IdAccount)
               .WillCascadeOnDelete(false);
        }
    }
}