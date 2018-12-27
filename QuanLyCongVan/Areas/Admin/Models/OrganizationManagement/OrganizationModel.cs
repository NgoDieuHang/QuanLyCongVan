using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.OrganizationManagement.Schema;
using System;
using System.Linq;
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
            context=new DataContext();
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
                    (condition.KeySearch == null ||
                    (condition.KeySearch != null && (x.TenCoQuanBanHanh.Contains(condition.KeySearch))))
                    && (condition.TrangThai == null || (condition.TrangThai != null && x.DelFlag == condition.TrangThai.Value))
                    ), condition.CurentPage, condition.PageSize);

                // Tìm kiếm và lấy dữ liệu theo trang
                listOfOrganization.OrganizationList = context.CoQuanBanHanhs.Where(x =>
                    (condition.KeySearch == null ||
                    (condition.KeySearch != null && (x.TenCoQuanBanHanh.Contains(condition.KeySearch))))
                    && (condition.TrangThai == null || (condition.TrangThai != null &&
                                                       x.DelFlag == condition.TrangThai.Value))).OrderBy(x => x.Id)
                    .Skip((listOfOrganization.Paging.CurrentPage - 1) * listOfOrganization.Paging.NumberOfRecord)
                    .Take(listOfOrganization.Paging.NumberOfRecord).Select(x => new Organization
                    {
                        Id = x.Id,
                        TenCoQuanBanHanh=x.TenCoQuanBanHanh,
                        KiHieu=x.KiHieu
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
        public Organization GetOrganization(string id)
        {
            try
            {
                Organization organization = new Organization();
                int idOrganization = 0;
                try
                {
                    idOrganization = Convert.ToInt32(id);
                }
                catch { }
                TblOrganization tblOrganization = context.CoQuanBanHanhs.FirstOrDefault(x => x.Id == idOrganization && !x.DelFlag);
                if (tblOrganization != null)
                {
                    organization.Id = tblOrganization.Id;
                    organization.TenCoQuanBanHanh = tblOrganization.TenCoQuanBanHanh;
                    organization.KiHieu = tblOrganization.KiHieu;
                }
                else
                {
                    return null;
                }
                return organization;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}