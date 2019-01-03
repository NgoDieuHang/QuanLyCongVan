using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Z.EntityFramework.Plus;

namespace QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch
{
    public class ListFeildOfDispatchModel
    {
        DataContext context;
        public ListFeildOfDispatchModel()
        {
            context = new DataContext();
        }

        public List<FeildDispatch> GetListOfFeildDispatch()
        {
            try
            {
                List<FeildDispatch> listOfFeildDispatch = new List<FeildDispatch>();
                listOfFeildDispatch = context.LinhVucs.Where(x=>!x.DelFlag)
                    .Select(x => new FeildDispatch
                    {
                        Id = x.Id,
                        tenLinhVuc = x.TenLinhVuc
                    }).ToList();

                return listOfFeildDispatch;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Xóa các lĩnh vực trong DB.
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id của các lĩnh vực sẽ xóa</param>
        /// <returns>True nếu xóa thành công,  Excetion nếu có lỗi</returns>
        public bool DeleteFeildDispatch(List<int> ids)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                context.LinhVucs.Where(x => ids.Contains(x.Id)).Delete();
                context.SaveChanges();

                transaction.Commit();
                return true;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                throw e;
            }
        }
    }
}