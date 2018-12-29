using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Z.EntityFramework.Plus;

namespace QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement
{
    public class ListOfTypeDispatchModel
    {
        DataContext context;
        public ListOfTypeDispatchModel()
        {
            context = new DataContext();
        }

        public List<TypeDispatch> GetListOfTypeDispatch()
        {
            try
            {
                List<TypeDispatch> listOfDispatch = new List<TypeDispatch>();
                listOfDispatch = context.LoaiCongVans
                    .Select(x => new TypeDispatch
                    {
                        Id = x.Id,
                        tenLoaiCongVan = x.TenLoaiCongVan
                    }).ToList();

                return listOfDispatch;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Xóa các loại công văn trong DB.
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id của các loại công văn sẽ xóa</param>
        /// <returns>True nếu xóa thành công,  Excetion nếu có lỗi</returns>
        public bool DeleteTypeDispatch(List<int> ids)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                context.LoaiCongVans.Where(x => ids.Contains(x.Id)).Delete();
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