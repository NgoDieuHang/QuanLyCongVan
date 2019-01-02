using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using QLCV.Common;
using QLCV.Common.Enum;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.DispatchManagement.Schema;
using Z.EntityFramework.Plus;

namespace QuanLyCongVan.Areas.Admin.Models.DispatchManagement
{
    public class DispatchMasterModel
    {
        private DataContext context;
        private List<string> typeFiles;

        public DispatchMasterModel()
        {
            context = new DataContext();
            typeFiles = new List<string>();
            typeFiles.Add(".pdf");
            typeFiles.Add(".doc");
        }

        public DispatchData GetDispatchData()
        {
            DispatchData data = new DispatchData();
            data.LoaiCongVans = context.LoaiCongVans.ToList();
            data.LoaiVanBans = context.LoaiVanBans.ToList();
            data.CoQuanBanHanhs = context.CoQuanBanHanhs.ToList();
            data.LinhVucs = context.LinhVucs.ToList();
            return data;
        }

        public List<LoaiCongVan> GetLoaiCongVan()
        {
            return context.LoaiCongVans.ToList();
        }

        public List<LinhVuc> GetLinhVuc()
        {
            return context.LinhVucs.ToList();
        }

        public List<CoQuanBanHanh> GetCoQuanBanHanh()
        {
            return context.CoQuanBanHanhs.ToList();
        }

        public ResponseInfo SaveDispatch(NewDispatch dispatch)
        {
            try
            {
                if (context.CongVans.FirstOrDefault(x => x.Id == dispatch.Id && !x.DelFlag) != null)
                {
                    return UpdateDispatch(dispatch);
                }
                return AddDispatch(dispatch);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public ResponseInfo UpdateDispatch(NewDispatch dispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                bool update = true;
                List<string> imgsDelete = new List<string>();
                if (dispatch.FileAttach != null)
                {
                    string filePath = Common.SaveFileUpload(dispatch.FileAttach, "/public/dispatch-file/", "", typeFiles);
                    if (filePath == "1")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.FileKhongDungDinhDang;
                        update = false;
                    }
                    else if (filePath == "2")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.DungLuongFileQuaLon;
                        update = false;
                    }
                    else if (filePath == "")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.TaiFileBiLoi;
                        update = false;
                    }
                    else
                    {
                        imgsDelete.Add(context.CongVans.FirstOrDefault(x => x.Id == dispatch.Id && !x.DelFlag).FilePath);
                        dispatch.FilePath = filePath;
                    }
                }
                if (update)
                {
                    context.CongVans.Where(x => x.Id == dispatch.Id && !x.DelFlag)
                        .Update(x => new CongVan()
                        {
                            FilePath = dispatch.FilePath,
                            IdCoQuanBanHanh = dispatch.IdCoQuanBanHanh,
                            IdLinhVuc = dispatch.IdLinhVuc,
                            IdLoaiCongVan = dispatch.IdLoaiCongVan,
                            IdLoaiVanBan = dispatch.IdLoaiVanBan,
                            NgayBanHanh = dispatch.NgayBanHanh,
                            NgayCongVanDen = dispatch.NgayCongVanDen,
                            NoiDung = dispatch.NoiDung,
                            SoCongVanDen = dispatch.SoCongVanDen,
                            SoKyHieu = dispatch.SoKyHieu,
                            TrichYeu = dispatch.TrichYeu,
                        });
                    context.SaveChanges();
                }
                transaction.Commit();
                Common.DeleteFile(imgsDelete);
                return response;
            }
            catch (Exception e)
            {
                transaction.Rollback();
                throw e;
            }
        }

        public ResponseInfo AddDispatch(NewDispatch dispatch)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                if (dispatch.FileAttach == null)
                {
                    response.Code = 202;
                    response.MsgNo = (int)MessageEnum.MsgNO.ChuaChonFile;
                }
                else
                {
                    dispatch.FilePath = Common.SaveFileUpload(dispatch.FileAttach, "/public/dispatch-file/", "", typeFiles);
                    if (dispatch.FilePath == "1")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.FileKhongDungDinhDang;
                    }
                    else if (dispatch.FilePath == "2")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.DungLuongFileQuaLon;
                    }
                    else if (dispatch.FilePath == "")
                    {
                        response.Code = 202;
                        response.MsgNo = (int)MessageEnum.MsgNO.TaiFileBiLoi;
                    }
                    else
                    {
                        context.CongVans.Add(new CongVan()
                        {
                            FilePath = dispatch.FilePath,
                            IdCoQuanBanHanh = dispatch.IdCoQuanBanHanh,
                            IdLinhVuc = dispatch.IdLinhVuc,
                            IdLoaiCongVan = dispatch.IdLoaiCongVan,
                            IdLoaiVanBan = dispatch.IdLoaiVanBan,
                            NgayBanHanh = dispatch.NgayBanHanh,
                            NgayCongVanDen = dispatch.NgayCongVanDen,
                            NoiDung = dispatch.NoiDung,
                            SoCongVanDen = dispatch.SoCongVanDen,
                            SoKyHieu = dispatch.SoKyHieu,
                            TrichYeu = dispatch.TrichYeu,
                        });
                        context.SaveChanges();
                        response.ThongTinBoSung1 = dispatch.Id + "";
                    }
                }
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