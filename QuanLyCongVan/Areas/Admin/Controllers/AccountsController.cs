using QLCV.Database;
using System.Linq;
using System.Web.Mvc;

namespace QuanLyCongVan.Areas.Admin.Controllers
{
    public class AccountsController : Controller
    {
        private DataContext db = new DataContext();

        // GET: Admin/Accounts
        public ActionResult Index()
        {
            return View(db.Accounts.ToList());
        }

        // POST: Admin/Accounts/Delete/5
        public void DeleteConfirmed(long id)
        {
            Account account = db.Accounts.Find(id);
            account.DelFlag = true;
            db.SaveChanges();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}