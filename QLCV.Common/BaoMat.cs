﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace QLCV.Common
{
    public class BaoMat
    {
        public static string GetMD5(string str)
        {
            str = "TRUNGTAMTINHOC" + str + "TRUNGTAMTINHOC";
            string str_md5 = "";
            byte[] mang = System.Text.Encoding.UTF8.GetBytes(str);
            MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
            mang = my_md5.ComputeHash(mang);
            foreach (byte b in mang)
            {
                str_md5 += b.ToString("x2");
            }
            return str_md5;
        }
        /// <summary>
        /// Chuyển mã base64 về chuỗi trước khi mã hóa.
        /// Author       :   HangNTD - 28/05/2018 - create
        /// </summary>
        /// <param name="base64EncodedData">Chuỗi mã hóa</param>
        /// <returns>Chuỗi sau khi giải mã</returns>
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}