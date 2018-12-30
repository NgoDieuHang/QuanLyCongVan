using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.DocumentManagement.Schema;
using System;
using System.Data.Entity;
using System.Linq;
using Z.EntityFramework.Plus;
using static QLCV.Common.Enum.ConstantsEnum;
using tblLoaiVanBan = QLCV.Database.LoaiVanBan;

namespace QuanLyCongVan.Areas.Admin.Models.DocumentManagement
{
    /// <summary>
    /// Class dùng để xử lý các hoạt động liên quan đến thêm và sửa danh sách loại văn bản.
    /// Author       :   HoangNM - 11/08/2018 - create
    /// </summary>
    /// <remarks>
    /// Package      :   Admin.Models
    /// Copyright    :   Team An_Hang_Hoang
    /// Version      :   1.0.0
    /// </remarks>
    public class DocumentMasterModel
    {
        DataContext context;
        public DocumentMasterModel()
        {
            context = new DataContext();
        }

        /// <summary>
        /// Load thông tin loại văn bản
        /// Author       :   HoàngNM - 27/12/2018 - create
        /// </summary>
        /// <param name="id">id của loại văn bản</param>
        /// <returns>Thông tin của loại văn bản theo id. Exception nếu có lỗi</returns>
        public DocumentMaster LoadDocument(string id)
        {
            try
            {
                DocumentMaster documentMaster = new DocumentMaster();
                int idDocument = 0;
                try
                {
                    idDocument = Convert.ToInt32(id);
                }
                catch { }
                tblLoaiVanBan document = context.LoaiVanBans.FirstOrDefault(x => x.Id == idDocument);
                if (document != null)
                {
                    documentMaster.Mode = (int)ModeMaster.Update;
                    documentMaster.Document = new Document();
                    documentMaster.Document.Id = document.Id;
                    documentMaster.Document.tenLoaiVanBan = document.TenLoaiVanBan;
                    documentMaster.Document.kyHieu = document.KiHieu;
                }
                return documentMaster;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để lưu thông tin loại văn bản ( dùng cho update hoặc add)
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="document">một đối tượng của loại văn bản</param>
        public ResponseInfo SaveDocument(Document document)
        {
            try
            {
                //if (context.LoaiVanBans.FirstOrDefault(x => x.Id == document.Id) != null)
                //{
                //    return UpdateDocument(document);
                //}
                return AddDocument(document);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// dùng để cập nhật thông tin văn bản
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="document">một đối tượng của loại văn bản</param>
        public ResponseInfo UpdateDocument(Document document)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                context.LoaiVanBans.Where(x => x.Id == document.Id)
                    .Update(x => new QLCV.Database.LoaiVanBan
                    {
                        TenLoaiVanBan = document.tenLoaiVanBan,
                        KiHieu = document.kyHieu

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
        /// dùng để thêm một loại văn bản
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="document">một đối tượng của loại văn bản</param>
        public ResponseInfo AddDocument(Document document)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                ResponseInfo response = new ResponseInfo();
                document.Id = context.LoaiVanBans.Count() == 0 ? 1 : context.LoaiVanBans.Max(x => x.Id) + 1;
                
                    context.LoaiVanBans.Add(new tblLoaiVanBan
                    {
                        Id = document.Id,
                        TenLoaiVanBan = document.tenLoaiVanBan,
                        KiHieu = document.kyHieu
                    });
                
                context.SaveChanges();
                response.ThongTinBoSung1 = document.Id + "";

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