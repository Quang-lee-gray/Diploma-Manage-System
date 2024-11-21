import SearchDiplomaPage from "../pages/SearchDiplomaPage/SearchDiploma.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import LoginPage from "../pages/LoginPage/LoginPage.jsx";
import AdminPage from "../pages/AdminPage/AdminPage.jsx";
import ApproverPage from "../pages/ApproverPage/ApproverPage.jsx";
import StudentPage from "../pages/ManageStudentPage/StudentPage.jsx";
import ManageApproverPage from "../pages/ManageApproverPage/ManageApproverPage.jsx";
import AccountPage from "../pages/AccountPage/AccountPage.jsx";
import DiplomaPage from "../pages/DiplomaPage/DiplomaPage.jsx";
import ListPage from "../pages/ListDiplomaPage/ListPage.jsx";
import ApprovePage from "../pages/ApprovePage/ApprovePage.jsx";
import InstructionPage from "../pages/InstructionPage/InstructionPage.jsx";
import InstructionPageApprover from "../pages/InstructionPage/InstructionPageApprover.jsx";
import InfoDiplomaPage from "../pages/InfoDiplomaPage/InfoDiplomaPage.jsx";
import ReissuedPage from "../pages/ReissuedPage/ReissuedPage.jsx";
import ReissuedApproverPage from "../pages/ReissuedPage/ReissuedApproverPage.jsx";
const routes = [
  {
    path: "/",
    page: LoginPage,
    isShowHeader: true,
  },
  {
    path: "/dang-nhap",
    page: LoginPage,
    isShowHeader: true,
  },
  {
    path: "/thong-tin-van-bang",
    page: InfoDiplomaPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/nguoi-phe-duyet",
    page: ApproverPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/nguoi-phe-duyet/danh-sach",
    page: ListPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/nguoi-phe-duyet/phe-duyet",
    page: ApprovePage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/approver",
    page: ManageApproverPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/account",
    page: AccountPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/tra-cuu-van-bang",
    page: SearchDiplomaPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/student",
    page: StudentPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/reissued",
    page: ReissuedPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/admin/diploma",
    page: DiplomaPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/system/instruction",
    page: InstructionPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/nguoi-phe-duyet/instruction/",
    page: InstructionPageApprover,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "/nguoi-phe-duyet/cap-lai/",
    page: ReissuedApproverPage,
    isShowHeader: true,
    isAdmin: true,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: true,
  },
];

export default routes;
