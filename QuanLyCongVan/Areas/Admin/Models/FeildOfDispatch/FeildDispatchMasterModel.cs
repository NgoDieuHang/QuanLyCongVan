using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Z.EntityFramework.Plus;
using static QLCV.Common.Enum.ConstantsEnum;
using tblLinhVuc = QLCV.Database.LinhVuc;

namespace QuanLyCongVan.Areas.Admin.Models.FeildOfDispatch
{
    /// <summary>
    /// Class dùng để xử lý các hoạt động liên quan đến thêm và sửa danh sách lĩnh vực.
    /// Author       :   HoangNM - 30/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class FeildDispatchMasterModel
    {
        DataContext context;
        public FeildDispatchMasterModel()
        {
            context = new DataContext();
        }

        /// <summary>
        /// Load thông tin lĩnh vực
        /// Author       :   HoàngNM - 30/12/2018 - create
        /// </summary>
        /// <param name="id">id của loại lĩnh vực</param>
        /// <returns>Thông tin của loại công văn theo id. Exception nếu có lỗi</returns>
        /// 

        public FeildDispatchMaster LoadFeildDispatch(string id)
        {
            try
            {
                FeildDispatchMaster feildDispatchMaster = new FeildDispatchMaster();
                int idFeildDispatch = 0;
                try
                {
                    idFeildDispatch = Convert.ToInt32(id);
                }
                catch { }
                tblLinhVuc feildDispatch = context.LinhVucs.FirstOrDefault(x => x.Id == idFeildDispatch && !x.DelFlag);
                if (feildDispatch != null)
                {
                    feildDispatchMaster.Mode = (int)ModeMaster.Update;
                    feildDispatchMaster.feildOfDispatch = new FeildDispatch();
                    feildDispatchMaster.feildOfDispatch.Id = feildDispatch.Id;
                    feildDispatchMaster.feildOfDispatch.tenLinhVuc = feildDispatch.TenLinhVuc;
                }
                return feildDispatchMaster;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để lưu thông tin lĩnh vực( dùng cho update hoặc add)
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="feilDispatch">một đối tượng của lĩnh vực</param>
        public ResponseInfo SaveFeildDispatch(FeildDispatch feilDispatch)
        {
            try
            {
                if (context.LinhVucs.FirstOrDefault(x => x.Id == feilDispatch.Id && !x.DelFlag) != null)
                {
                    return UpdateFeildDispatch(feilDispatch);
                }
                return AddFeildDispatch(feilDispatch);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để cập nhật thông tin lĩnh vực
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="feilDispatch">một đối tượng của lĩnh vực</param>
        public ResponseInfo UpdateFeildDispatch(FeildDispatch feilDispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                context.LinhVucs.Where(x => x.Id == feilDispatch.Id && !x.DelFlag)
                    .Update(x => new QLCV.Database.LinhVuc
                    {
                        TenLinhVuc = feilDispatch.tenLinhVuc

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
        /// dùng để thêm một lĩnh vực
        /// Author       :   HoangNM - 30/12/2018 - create
        /// </summary>
        /// <param name="feilDispatch">một đối tượng của lĩnh vực</param>
        public ResponseInfo AddFeildDispatch(FeildDispatch feilDispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                feilDispatch.Id = context.LinhVucs.Count() == 0 ? 1 : context.LinhVucs.Max(x => x.Id) + 1;

                context.LinhVucs.Add(new tblLinhVuc
                {
                    Id = feilDispatch.Id,
                    TenLinhVuc = feilDispatch.tenLinhVuc
                });

                context.SaveChanges();
                response.ThongTinBoSung1 = feilDispatch.Id + "";

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