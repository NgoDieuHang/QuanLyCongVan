using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Z.EntityFramework.Plus;
using static QLCV.Common.Enum.ConstantsEnum;
using TblOrganization = QLCV.Database.CoQuanBanHanh;

namespace QuanLyCongVan.Areas.Admin.Models.OrganizationManagement
{
    /// <summary>
    /// Class chứa các phương thức liên quan đến xử lý Organiztion
    /// Author      : HangNTD - 27/12/2018 - create
    /// </summary>
    /// <remarks>
    /// Package     :   Admin.Models
    /// Version     :   1.0.0
    /// </remarks>
    public class OrganizationModel
    {
        DataContext context;
        public OrganizationModel()
        {
            context = new DataContext();
        }

        /// <summary>
        /// Tìm kiếm các organization theo điều kiện cho trước.
        /// Author       :   HangNTD - 27/12/2018 - create
        /// </summary>
        /// <param name="condition">Đối tượng chứa điều kiện tìm kiếm</param>
        /// <returns>Danh sách các organization đã tìm kiếm được. Exception nếu có lỗi</returns>
        public ListOfOrganization GetListOfOrganization(OrganizationConditionSearch condition)
        {
            try
            {
                // Nếu không tồn tại điều kiện tìm kiếm thì khởi tạo giá trị tìm kiếm ban đầu
                if (condition == null)
                {
                    condition = new OrganizationConditionSearch();
                }
                ListOfOrganization listOfOrganization = new ListOfOrganization();
                // Lấy các thông tin dùng để phân trang
                listOfOrganization.Paging = new Paging(context.CoQuanBanHanhs.Count(x =>
                    ((condition.KeySearch == null ||
                    (condition.KeySearch != null && (x.TenCoQuanBanHanh.Contains(condition.KeySearch))))
                    && !x.DelFlag)), condition.CurentPage, condition.PageSize);

                // Tìm kiếm và lấy dữ liệu theo trang
                listOfOrganization.OrganizationList = context.CoQuanBanHanhs.Where(x =>
                    (condition.KeySearch == null ||
                    (condition.KeySearch != null && (x.TenCoQuanBanHanh.Contains(condition.KeySearch))))
                    && !x.DelFlag).OrderBy(x => x.Id)
                    .Skip((listOfOrganization.Paging.CurrentPage - 1) * listOfOrganization.Paging.NumberOfRecord)
                    .Take(listOfOrganization.Paging.NumberOfRecord).Select(x => new Organization
                    {
                        Id = x.Id,
                        TenCoQuanBanHanh = x.TenCoQuanBanHanh,
                        KiHieu = x.KiHieu
                    }).ToList();
                listOfOrganization.Condition = condition;
                return listOfOrganization;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Lấy thông tin của 1 Organization
        /// Author       :   HangNTD - 27/08/2018 - create
        /// </summary>
        /// <param name="id">id của Organization sẽ được hiển thị</param>
        /// <returns>Thông tin của Organization</returns>
        public OrganizationMaster GetOrganization(string id)
        {
            try
            {
                OrganizationMaster organizationMaster = new OrganizationMaster();
                int idOrganization = 0;
                try
                {
                    idOrganization = Convert.ToInt32(id);
                }
                catch { }
                TblOrganization tblOrganization = context.CoQuanBanHanhs.FirstOrDefault(x => x.Id == idOrganization && !x.DelFlag);
                if (tblOrganization != null)
                {
                    organizationMaster.Mode = (int)ModeMaster.Update;
                    organizationMaster.Organization.Id = tblOrganization.Id;
                    organizationMaster.Organization.TenCoQuanBanHanh = tblOrganization.TenCoQuanBanHanh;
                    organizationMaster.Organization.KiHieu = tblOrganization.KiHieu;
                }
                else
                {
                    return null;
                }
                return organizationMaster;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Xóa các Organization trong DB.
        /// Author       :   HangNTD - 02/08/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id của các Organization sẽ xóa</param>
        /// <returns>True nếu xóa thành công, False nếu không còn Organization được hiển thị trên trang chủ, Excetion nếu có lỗi</returns>
        public bool DeleteOrganizations(List<int> ids)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                bool result = true;
                context.CoQuanBanHanhs.Where(x => ids.Contains(x.Id) && !x.DelFlag).Update(x => new TblOrganization
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
        /// <summary>
        /// Tạo hoặc cập nhật lại Organization từ thông tin mà người dùng gửi lên
        /// Author       :   HangNTD - 17/08/2018 - create
        /// </summary>
        /// <param name="course">Các thông tin của Organization muốn tạo hoặc cập nhật</param>
        /// <returns>Thông tin về việc tạo hoặc cập nhật Organization thành công hay thất bại</returns>
        public ResponseInfo SaveOrganization(Organization organization)
        {
            try
            {
                if (context.CoQuanBanHanhs.FirstOrDefault(x => x.Id == organization.Id && !x.DelFlag) != null)
                {
                    return UpadateOrganization(organization);
                }
                return AddOrganization(organization);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        /// <summary>
        /// Cập nhật lại  Organization từ thông tin mà người dùng gửi lên
        /// Author       :   HangNTD - 17/08/2018 - create
        /// </summary>
        /// <param name="course">Các thông tin của Organization muốn cập nhật</param>
        /// <returns>Thông tin về việc cập nhật Organization thành công hay thất bại</returns>
        public ResponseInfo UpadateOrganization(Organization organization)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                TblOrganization tblOrganization = context.CoQuanBanHanhs.Where(x => x.Id == organization.Id && !x.DelFlag).FirstOrDefault();
                tblOrganization.TenCoQuanBanHanh = organization.TenCoQuanBanHanh;
                tblOrganization.KiHieu = organization.KiHieu;
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
        /// Tạo  Organization từ thông tin mà người dùng gửi lên
        /// Author       :   HangNTD - 17/08/2018 - create
        /// </summary>
        /// <param name="course">Các thông tin của Organization muốn tạo</param>
        /// <returns>Thông tin về việc tạo  Organization thành công hay thất bại</returns>
        public ResponseInfo AddOrganization(Organization organization)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                organization.Id = context.CoQuanBanHanhs.Count() == 0 ? 1 : context.CoQuanBanHanhs.Max(x => x.Id) + 1;
                context.CoQuanBanHanhs.Add(new TblOrganization
                {
                    Id = organization.Id,
                    TenCoQuanBanHanh = organization.TenCoQuanBanHanh,
                    KiHieu = organization.KiHieu
                });
                context.SaveChanges();
                response.ThongTinBoSung1 = organization.Id + "";

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