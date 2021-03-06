namespace QLCV.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdddDatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CongVan",
                c => new
                    {
                        Id = c.Long(nullable: false),
                        SoKyHieu = c.String(nullable: false, maxLength: 50),
                        IdLoaiVanBan = c.Int(nullable: false),
                        IdCoQuanBanHanh = c.Int(nullable: false),
                        IdLoaiCongVan = c.Int(nullable: false),
                        SoCongVanDen = c.Int(),
                        NgayCongVanDen = c.DateTime(precision: 7, storeType: "datetime2"),
                        NgayBanHanh = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        IdLinhVuc = c.Int(nullable: false),
                        TrichYeu = c.String(nullable: false, maxLength: 500),
                        NoiDung = c.String(nullable: false, maxLength: 500),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CoQuanBanHanh", t => t.IdCoQuanBanHanh)
                .ForeignKey("dbo.LinhVuc", t => t.IdLinhVuc)
                .ForeignKey("dbo.LoaiCongVan", t => t.IdLoaiCongVan)
                .ForeignKey("dbo.LoaiVanBan", t => t.IdLoaiVanBan)
                .Index(t => t.IdLoaiVanBan)
                .Index(t => t.IdCoQuanBanHanh)
                .Index(t => t.IdLoaiCongVan)
                .Index(t => t.IdLinhVuc);
            
            CreateTable(
                "dbo.CoQuanBanHanh",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        TenCoQuanBanHanh = c.String(nullable: false, maxLength: 100),
                        KiHieu = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LinhVuc",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        TenLinhVuc = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LoaiCongVan",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        TenLoaiCongVan = c.String(nullable: false, maxLength: 100),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LoaiVanBan",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        TenLoaiVanBan = c.String(nullable: false, maxLength: 100),
                        KiHieu = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TinTuc",
                c => new
                    {
                        Id = c.Long(nullable: false),
                        TieuDe = c.String(nullable: false, maxLength: 100),
                        TomTat = c.String(nullable: false),
                        NoiDung = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CongVan", "IdLoaiVanBan", "dbo.LoaiVanBan");
            DropForeignKey("dbo.CongVan", "IdLoaiCongVan", "dbo.LoaiCongVan");
            DropForeignKey("dbo.CongVan", "IdLinhVuc", "dbo.LinhVuc");
            DropForeignKey("dbo.CongVan", "IdCoQuanBanHanh", "dbo.CoQuanBanHanh");
            DropIndex("dbo.CongVan", new[] { "IdLinhVuc" });
            DropIndex("dbo.CongVan", new[] { "IdLoaiCongVan" });
            DropIndex("dbo.CongVan", new[] { "IdCoQuanBanHanh" });
            DropIndex("dbo.CongVan", new[] { "IdLoaiVanBan" });
            DropTable("dbo.TinTuc");
            DropTable("dbo.LoaiVanBan");
            DropTable("dbo.LoaiCongVan");
            DropTable("dbo.LinhVuc");
            DropTable("dbo.CoQuanBanHanh");
            DropTable("dbo.CongVan");
        }
    }
}
