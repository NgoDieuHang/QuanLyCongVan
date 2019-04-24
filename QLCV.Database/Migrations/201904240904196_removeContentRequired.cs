namespace QLCV.Database.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeContentRequired : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CongVan", "NoiDung", c => c.String(maxLength: 500));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CongVan", "NoiDung", c => c.String(nullable: false, maxLength: 500));
        }
    }
}
