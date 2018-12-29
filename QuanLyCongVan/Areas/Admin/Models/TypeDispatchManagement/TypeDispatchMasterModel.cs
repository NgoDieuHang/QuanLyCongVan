using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Z.EntityFramework.Plus;
using static QLCV.Common.Enum.ConstantsEnum;
using tblLoaiCongVan = QLCV.Database.LoaiCongVan;

namespace QuanLyCongVan.Areas.Admin.Models.TypeDispatchManagement
{
    /// <summary>
    /// Class dùng để xử lý các hoạt động liên quan đến thêm và sửa danh sách loại công văn.
    /// Author       :   HoangNM - 11/08/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class TypeDispatchMasterModel
    {
        DataContext context;
        public TypeDispatchMasterModel()
        {
            context = new DataContext();
        }

        /// <summary>
        /// Load thông tin loại công văn
        /// Author       :   HoàngNM - 29/12/2018 - create
        /// </summary>
        /// <param name="id">id của loại công văn</param>
        /// <returns>Thông tin của loại công văn theo id. Exception nếu có lỗi</returns>
        /// 
        public TypeDispatchMaster LoadTypeDispatch(string id)
        {
            try
            {
                TypeDispatchMaster typeDispatchMaster = new TypeDispatchMaster();
                int idTypeDispatch = 0;
                try
                {
                    idTypeDispatch = Convert.ToInt32(id);
                }
                catch { }
                tblLoaiCongVan typeDispatch = context.LoaiCongVans.FirstOrDefault(x => x.Id == idTypeDispatch);
                if (typeDispatch != null)
                {
                    typeDispatchMaster.Mode = (int)ModeMaster.Update;
                    typeDispatchMaster.typeDispatch = new TypeDispatch();
                    typeDispatchMaster.typeDispatch.Id = typeDispatch.Id;
                    typeDispatchMaster.typeDispatch.tenLoaiCongVan = typeDispatch.TenLoaiCongVan;
                }
                return typeDispatchMaster;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để lưu thông tin loại công văn ( dùng cho update hoặc add)
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="typeDispatch">một đối tượng của công văn</param>
        public ResponseInfo SaveTypeDispatch(TypeDispatch typeDispatch)
        {
            try
            {
                if (context.LoaiCongVans.FirstOrDefault(x => x.Id == typeDispatch.Id) != null)
                {
                    return UpdateTypeDisPatch(typeDispatch);
                }
                return AddTypeDispatch(typeDispatch);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để cập nhật thông tin công văn
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="typeDispatch">một đối tượng của loại công văn</param>
        public ResponseInfo UpdateTypeDisPatch(TypeDispatch typeDispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                context.LoaiCongVans.Where(x => x.Id == typeDispatch.Id)
                    .Update(x => new QLCV.Database.LoaiCongVan
                    {
                        TenLoaiCongVan = typeDispatch.tenLoaiCongVan

                    });

                context.SaveChanges();
                transaction.Commit();
                return response;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                throw e;
            }
        }
        /// <summary>
        /// dùng để thêm một loại công văn
        /// Author       :   HoangNM - 29/12/2018 - create
        /// </summary>
        /// <param name="typeDispatch">một đối tượng của loại công văn</param>
        public ResponseInfo AddTypeDispatch(TypeDispatch typeDispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                typeDispatch.Id = context.LoaiVanBans.Count() == 0 ? 1 : context.LoaiVanBans.Max(x => x.Id) + 1;

                context.LoaiCongVans.Add(new tblLoaiCongVan
                {
                    Id = typeDispatch.Id,
                    TenLoaiCongVan = typeDispatch.tenLoaiCongVan
                });

                context.SaveChanges();
                response.ThongTinBoSung1 = typeDispatch.Id + "";

                transaction.Commit();
                return response;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                throw e;
            }
        }

    }
}