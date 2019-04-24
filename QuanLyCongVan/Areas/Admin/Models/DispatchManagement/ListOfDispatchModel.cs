using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Hosting;
using Z.EntityFramework.Plus;
using TblDispatch = QLCV.Database.CongVan;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement
{
    public class ListOfDispatchModel
    {
        DataContext context;
        public ListOfDispatchModel()
        {
            context = new DataContext();
        }
        /// <summary>
        /// Tìm kiếm các Dispatch theo điều kiện cho trước.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="condition">Đối tượng chứa điều kiện tìm kiếm</param>
        /// <returns>Danh sách các Dispatch đã tìm kiếm được. Exception nếu có lỗi</returns>
        public ListOfDispatch GetListOfDispatch(DispatchConditionSearch condition)
        {
            try
            {
                // Nếu không tồn tại điều kiện tìm kiếm thì khởi tạo giá trị tìm kiếm ban đầu
                if (condition == null)
                {
                    condition = new DispatchConditionSearch();
                }
                DateTime startDate = Convert.ToDateTime(condition.StartDate);
                DateTime endDate = Convert.ToDateTime(condition.EndDate);
                ListOfDispatch listOfDispatch = new ListOfDispatch();
                listOfDispatch.CoQuanBanHanhs = context.CoQuanBanHanhs.ToList().Select(x => new Schema.CoQuanBanHanh
                {
                    IdCoQuanBanHanh = x.Id,
                    TenCoQuanBanHanh = x.TenCoQuanBanHanh
                }).ToList();
                listOfDispatch.LoaiCongVans = context.LoaiCongVans.ToList().Select(x => new Schema.LoaiCongVan
                {
                    IdLoaiCongVan = x.Id,
                    TenLoaiCongVan = x.TenLoaiCongVan
                }).ToList();
                listOfDispatch.LoaiVanBans = context.LoaiVanBans.ToList().Select(x => new Schema.LoaiVanBan
                {
                    IdLoaiVanBan = x.Id,
                    TenLoaiVanBan = x.TenLoaiVanBan
                }).ToList();
                listOfDispatch.LinhVucs = context.LinhVucs.ToList().Select(x => new Schema.LinhVuc
                {
                    IdLinhVuc = x.Id,
                    TenLinhVuc = x.TenLinhVuc
                }).ToList();
                // Lấy các thông tin dùng để phân trang
                listOfDispatch.Paging = new Paging(context.CongVans.Count(x =>
                    (condition.SoKiHieu == null ||
                       (condition.SoKiHieu != null && x.SoKyHieu.Contains(condition.SoKiHieu)))
                    && (condition.TrichYeu == null ||
                       (condition.TrichYeu != null && x.TrichYeu.Contains(condition.TrichYeu)))
                    && (condition.SoCongVanDen == null ||
                       (condition.SoCongVanDen != null && x.SoCongVanDen == condition.SoCongVanDen))
                    && (condition.IdCoQuanBanHanh == 0 ||
                       (condition.IdCoQuanBanHanh != 0 && x.CoQuanBanHanh.Id == condition.IdCoQuanBanHanh))
                    && (condition.IdLoaiCongVan == 0 ||
                       (condition.IdLoaiCongVan != 0 && x.LoaiCongVan.Id == condition.IdLoaiCongVan))
                    && (condition.IdLoaiVanBan == 0 ||
                       (condition.IdLoaiVanBan != 0 && x.LoaiVanBan.Id == condition.IdLoaiVanBan))
                    && (condition.IdLinhVuc == 0 ||
                       (condition.IdLinhVuc != 0 && x.LinhVuc.Id == condition.IdLinhVuc))
                    && (condition.StartDate == null && condition.EndDate == null ||
                       (condition.StartDate == null && x.NgayBanHanh <= endDate) ||
                       (condition.EndDate == null && x.NgayBanHanh >= startDate) ||
                       (condition.StartDate != null && condition.EndDate != null &&
                        x.NgayBanHanh >= startDate && x.NgayBanHanh <= endDate))
                    && !x.DelFlag), condition.CurentPage, condition.PageSize);

                // Tìm kiếm và lấy dữ liệu theo trang
                listOfDispatch.DispatchList = context.CongVans.Where(x =>
                    (condition.SoKiHieu == null ||
                       (condition.SoKiHieu != null && x.SoKyHieu.Contains(condition.SoKiHieu)))
                    && (condition.TrichYeu == null ||
                       (condition.TrichYeu != null && x.TrichYeu.Contains(condition.TrichYeu)))
                    && (condition.SoCongVanDen == null ||
                       (condition.SoCongVanDen != null && x.SoCongVanDen == condition.SoCongVanDen))
                    && (condition.IdCoQuanBanHanh == 0 ||
                       (condition.IdCoQuanBanHanh != 0 && x.CoQuanBanHanh.Id == condition.IdCoQuanBanHanh))
                    && (condition.IdLoaiCongVan == 0 ||
                       (condition.IdLoaiCongVan != 0 && x.LoaiCongVan.Id == condition.IdLoaiCongVan))
                    && (condition.IdLoaiVanBan == 0 ||
                       (condition.IdLoaiVanBan != 0 && x.LoaiVanBan.Id == condition.IdLoaiVanBan))
                    && (condition.IdLinhVuc == 0 ||
                       (condition.IdLinhVuc != 0 && x.LinhVuc.Id == condition.IdLinhVuc))
                    && (condition.StartDate == null && condition.EndDate == null ||
                       (condition.StartDate == null && x.NgayBanHanh <= endDate) ||
                       (condition.EndDate == null && x.NgayBanHanh >= startDate) ||
                       (condition.StartDate != null && condition.EndDate != null &&
                        x.NgayBanHanh >= startDate && x.NgayBanHanh <= endDate))
                    && !x.DelFlag).OrderBy(x => x.Id)
                    .Skip((listOfDispatch.Paging.CurrentPage - 1) * listOfDispatch.Paging.NumberOfRecord)
                    .Take(listOfDispatch.Paging.NumberOfRecord).Select(x => new Schema.Dispatch
                    {
                        Id = x.Id,
                        SoKyHieu = x.SoKyHieu,
                        TenLoaiVanBan = x.LoaiVanBan.TenLoaiVanBan,
                        TenCoQuanBanHanh = x.CoQuanBanHanh.TenCoQuanBanHanh,
                        TenLoaiCongVan = x.LoaiCongVan.TenLoaiCongVan,
                        SoCongVanDen = x.SoCongVanDen,
                        NgayCongVanDen = x.NgayCongVanDen,
                        NgayBanHanh = x.NgayBanHanh,
                        TenLinhVuc = x.LinhVuc.TenLinhVuc,
                        TrichYeu = x.TrichYeu,
                        NoiDung = x.NoiDung,
                        FilePath = x.FilePath
                    }).OrderByDescending(x => x.NgayBanHanh).ToList();
                listOfDispatch.Condition = condition;
                return listOfDispatch;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string GetPathFileDispatch(string id)
        {
            try
            {
                int idDispatch = 0;
                try
                {
                    idDispatch = Convert.ToInt32(id);
                }
                catch { }
                string pathFile = HostingEnvironment.MapPath("~" + context.CongVans.FirstOrDefault(x => x.Id == idDispatch && !x.DelFlag).FilePath);
                return pathFile;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Xóa các Dispatch trong DB.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id của các Dispatch sẽ xóa</param>
        /// <returns>True nếu xóa thành công, False nếu không còn Dispatch được hiển thị trên trang chủ, Excetion nếu có lỗi</returns>
        public bool DeleteDispatchs(List<long> ids)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                bool result = true;
                context.CongVans.Where(x => ids.Contains(x.Id) && !x.DelFlag).Update(x => new TblDispatch
                {
                    DelFlag = true
                });
                context.SaveChanges();
                transaction.Commit();
                return result;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                throw e;
            }
        }

    }
}