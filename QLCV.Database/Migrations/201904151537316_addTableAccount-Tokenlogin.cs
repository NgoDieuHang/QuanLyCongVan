namespace QLCV.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTableAccountTokenlogin : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Account",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Username = c.String(maxLength: 50),
                        Password = c.String(maxLength: 50),
                        Ho = c.String(nullable: false, maxLength: 50),
                        Ten = c.String(nullable: false, maxLength: 50),
                        Avatar = c.String(nullable: false, maxLength: 255),
                        GioiTinh = c.Boolean(nullable: false),
                        Email = c.String(maxLength: 255),
                        NgaySinh = c.DateTime(storeType: "date"),
                        SoDienThoai = c.String(maxLength: 15),
                        TokenActive = c.String(maxLength: 100),
                        TimeOfToken = c.DateTime(),
                        IsActived = c.Boolean(nullable: false),
                        IsActiveEmail = c.Boolean(nullable: false),
                        SoLanDangNhapSai = c.Int(nullable: false),
                        KhoaTaiKhoanDen = c.DateTime(nullable: false),
                        ResetPasswordCode = c.String(maxLength: 100),
                        Created_at = c.DateTime(),
                        Created_by = c.Int(nullable: false),
                        Updated_at = c.DateTime(),
                        Updated_by = c.Int(),
                        DelFlag = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TokenLogin",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        IdAccount = c.Long(nullable: false),
                        Token = c.String(nullable: false, maxLength: 100),
                        ThoiGianTonTai = c.DateTime(nullable: false),
                        Created_at = c.DateTime(),
                        Created_by = c.Int(nullable: false),
                        Updated_at = c.DateTime(),
                        Updated_by = c.Int(),
                        DelFlag = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Account", t => t.IdAccount)
                .Index(t => t.IdAccount);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TokenLogin", "IdAccount", "dbo.Account");
            DropIndex("dbo.TokenLogin", new[] { "IdAccount" });
            DropTable("dbo.TokenLogin");
            DropTable("dbo.Account");
        }
    }
}
