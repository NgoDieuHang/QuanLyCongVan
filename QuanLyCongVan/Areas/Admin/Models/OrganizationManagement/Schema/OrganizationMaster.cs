using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static QLCV.Common.Enum.ConstantsEnum;

namespace QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema
{
    public class OrganizationMaster
    {
        public Organization Organization{ set; get; }
        public int Mode { set; get; }
        public OrganizationMaster()
        {
            Mode = (int)ModeMaster.Insert;
            Organization = new Organization();
        }
    }
}