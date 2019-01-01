﻿using QLCV.Common;
using QLCV.Database;
using QuanLyCongVan.Areas.Admin.Models.DocumentManagement.Schema;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Z.EntityFramework.Plus;

namespace QuanLyCongVan.Areas.Admin.Models.DocumentManagement
{
    public class ListOfDocumentModel
    {
        DataContext context;
        public ListOfDocumentModel()
        {
            context = new DataContext();
        }

        public List<Document> GetListOfDocument()
        {
            try
            {


                List<Document> listOfDocument = new List<Document>();

                //.Where(x => !x.DelFlag)
                listOfDocument = context.LoaiVanBans
                    .Select(x => new Document
                    {
                        Id = x.Id,
                        tenLoaiVanBan = x.TenLoaiVanBan,
                        kyHieu = x.KiHieu
                    }).ToList();

                return listOfDocument;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        /// <summary>
        /// Xóa các loại văn bản trong DB.
        /// Author       :   HoangNM - 27/12/2018 - create
        /// </summary>
        /// <param name="ids">Danh sách id của các loại văn bản sẽ xóa</param>
        /// <returns>True nếu xóa thành công,  Excetion nếu có lỗi</returns>
        public bool DeleteDocument(List<int> ids)
        {
            DbContextTransaction transaction = context.Database.BeginTransaction();
            try
            {
                context.LoaiVanBans.Where(x => ids.Contains(x.Id)).Delete();
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