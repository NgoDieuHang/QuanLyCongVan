using QLCV.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QLCV.Common
{
    public class XacThuc
    {
     
        public static long GetIdAccount()
        {
            try
            {
                string token = Common.GetCookie("token");
                DataContext context = new DataContext();
                TokenLogin tokenLogin = context.TokenLogins.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
                if (tokenLogin == null)
                {
                    return 0;
                }
                return tokenLogin.Account.Id;
            }
            catch
            {
                return 0;
            }
        }
        
        public static Account GetAccount()
        {
            try
            {
                string token = Common.GetCookie("token");
                DataContext context = new DataContext();
                TokenLogin tokenLogin = context.TokenLogins.FirstOrDefault(x => x.Token == token && x.ThoiGianTonTai >= DateTime.Now && !x.DelFlag);
                if (tokenLogin == null)
                {
                    return null;
                }
                return tokenLogin.Account;
            }
            catch
            {
                return null;
            }
        }

      
    }
}