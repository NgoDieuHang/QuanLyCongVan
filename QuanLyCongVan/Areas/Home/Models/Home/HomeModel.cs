using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QLCV.Database;
using QuanLyCongVan.Areas.Home.Models.Home.Schema;

namespace QuanLyCongVan.Areas.Home.Models.Home
{
    public class HomeModel
    {
        DataContext context;
        public HomeModel()
        {
            context = new DataContext();
        }

        /// <summary>
        /// Lấy danh sách thông tin của công văn
        /// Author       :   HoangNM - 13/04/2019 - create
        /// </summary>
        /// <returns>Danh sách công văn,  Excetion nếu có lỗi</returns>

        public List<HienThiCongVan> GetDispatchList()
        {
            try
            {
                List<HienThiCongVan> listCongVan = new List<HienThiCongVan>();
                listCongVan = context.CongVans.Where(x => !x.DelFlag)
                    .Select(x => new HienThiCongVan
                    {
                        Id = x.Id,
                        TrichYeu = x.TrichYeu,
                        NoiDung=x.NoiDung,
                        NgayBanHanh=x.NgayBanHanh,
                        FilePath=x.FilePath
                    }).ToList();

                return listCongVan;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Lấy thông tin công văn theo Id
        /// Author       :   HoangNM - 13/04/2019 - create
        /// </summary>
        /// <returns>Thông tin chi tiết công văn,  Excetion nếu có lỗi</returns>

        public HienThiCongVan GetDispatch(long Id)
        {
            try
            {
                HienThiCongVan CongVan = new HienThiCongVan();
                CongVan = context.CongVans.Where(x => !x.DelFlag && x.Id==Id)
                    .Select(x => new HienThiCongVan
                    {
                        Id = x.Id,
                        TrichYeu = x.TrichYeu,
                        NoiDung = x.NoiDung,
                        NgayBanHanh = x.NgayBanHanh,
                        FilePath = x.FilePath
                    }).FirstOrDefault();

                return CongVan;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}