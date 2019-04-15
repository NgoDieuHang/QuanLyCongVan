namespace QLCV.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTblCauHinh : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CauHinh",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        SoLanChoPhepDangNhapSai = c.Int(nullable: false),
                        ThoiGianKhoa = c.Int(nullable: false),
                        ThoiGianTonTaiToken = c.Int(nullable: false),
                        Created_at = c.DateTime(),
                        Created_by = c.Int(nullable: false),
                        Updated_at = c.DateTime(),
                        Updated_by = c.Int(),
                        DelFlag = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CauHinh");
        }
    }
}
