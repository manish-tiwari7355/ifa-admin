import Dashboard from "Pages/Dashboard";
import Resources from "Pages/Resources";
import Testimonial from "../components/pages/Testimonial";
import AddTestimonial from "../components/pages//Testimonial/AddTestimonial";
import AddResource from "../components/pages/Resources/AddResource";
import Categories from "../components/pages/Categories";
import Projects from "../components/pages/Projects";
import AddProjects from "../components/pages/Projects/AddProjects";
import ViewFeed from "../components/ViewFeed";
import Courses from "../components/pages/Courses";
import AddCourses from "../components/pages/Courses/AddCourses";
import Competitions from "../components/pages/Competitions";
import AddCompetitions from "../components/pages/Competitions/AddCompetitions";
import Breakfast from "../components/pages/Breakfast";
import AddBreakfast from "../components/pages/Breakfast/AddBreakfast";
import View from "../components/pages/Competitions/view";
import Query from "../components/pages/Query";
import Products from "../components/pages/Products";
import AddProducts from "../components/pages/Products/AddProducts";
import ViewProject from "../components/ViewProject";
import Blogs from "../components/pages/Blogs";
import AddBlogs from "../components/pages/Blogs/AddBlogs/AddBlogs";
import RegisteredUser from "../components/pages/RegisteredUser/RegisteredUser";
import EditBlogs from "../components/pages/Blogs/EditBlogs/EditBlogs";
import Profile from "../components/pages/Profile/Profile";
import EditProfile from "../components/pages/Profile/EditProfile";
import Contact from "../components/pages/Contact/Contact";
import JobApplication from "../components/pages/JobApplication/JobApplication";
import JobApplicationDetails from "../components/pages/JobApplication/JobApplicationDetails";
import PasswordUpdate from "../components/pages/Login/PasswordUpdate";
import Awards from "../components/pages/Award";
import EditAwards from "../components/pages/EditAwards";
import ShowAward from "../components/pages/ShowAward";
import PrescribedBooks from "../components/pages/PrescribedBooks";
import Alumni from "../components/pages/Alumni";
import AddAlumni from "../components/AddAlumni";
import AddBooks from "../components/pages/PrescribedBooks/AddBooks/AddBooks";
import EditBook from "../components/pages/PrescribedBooks/EditBook/EditBook";
import Videos from "../components/pages/Videos";
import AddVideo from "../components/pages/Videos/AddVideo/AddVideo";

const navigationRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/blogs",
    component: Blogs,
  },
  {
    path: "/blogs/add",
    component: AddBlogs,
  },

  {
    path: "/blogs/edit",
    component: EditBlogs,
  },
  {
    path: "/awards",
    component: ShowAward,
  },
  {
    path: "/awards/add",
    component: Awards,
  },
  {
    path: "/videos",
    component: Videos,
  },
  {
    path: "/videos/add",
    component: AddVideo,
  },
  {
    path: "/prescribedBooks",
    component: PrescribedBooks,
  },
  {
    path: "/prescribedBooks/add",
    component: AddBooks,
  },
  {
    path: "/prescribedBooks/edit/:recordId",
    component: EditBook,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/jobApplication",
    component: JobApplication,
  },
  {
    path: "/jobApplication/details",
    component: JobApplicationDetails,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/profile/edit",
    component: EditProfile,
  },
  {
    path: "/resources",
    component: Resources,
  },
  {
    path: "/resource/add",
    component: AddResource,
  },
  {
    path: "/resources/:id",
    component: ViewFeed,
  },
  {
    path: "/resources/:id/edit",
    component: AddResource,
  },
  {
    path: "/categories",
    component: Categories,
  },
  {
    path: "/RegisteredUser",
    component: RegisteredUser,
  },
  {
    path: "/testimonials",
    component: Testimonial,
  },
  {
    path: "/testimonials/add",
    component: AddTestimonial,
  },
  {
    path: "/testimonials/edit/:id",
    component: AddTestimonial,
  },
  {
    path: "/projects",
    component: Projects,
  },
  {
    path: "/project/add",
    component: AddProjects,
  },
  {
    path: "/projects/:id",
    component: ViewProject,
  },
  {
    path: "/projects/:id/edit",
    component: AddProjects,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/product/add",
    component: AddProducts,
  },
  {
    path: "/products/:id",
    component: ViewFeed,
  },
  {
    path: "/products/:id/edit",
    component: AddProducts,
  },
  {
    path: "/courses",
    component: Courses,
  },
  {
    path: "/course/add",
    component: AddCourses,
  },
  {
    path: "/courses/:id",
    component: ViewFeed,
  },
  {
    path: "/courses/:id/edit",
    component: AddCourses,
  },
  {
    path: "/competitions",
    component: Competitions,
  },
  {
    path: "/competition/add",
    component: AddCompetitions,
  },
  {
    path: "/competitions/view/:id",
    component: View,
  },
  {
    path: "/competitions/:id/edit",
    component: AddCompetitions,
  },
  {
    path: "/breakfasts",
    component: Breakfast,
  },
  {
    path: "/breakfast/add",
    component: AddBreakfast,
  },
  {
    path: "/breakfasts/:id",
    component: ViewFeed,
  },
  {
    path: "/breakfasts/:id/edit",
    component: AddBreakfast,
  },
  {
    path: "/alumni/add",
    component: AddAlumni,
    hideInMenu: true,
  },
  {
    path: "/editawards/:id",
    component: EditAwards,
  },
  {
    path: "/queries",
    component: Query,
  },
  { path: "/alumni", component: Alumni },

  // {
  //   path: "/update-password",
  //   component: PasswordUpdate,
  // },
  // {
  //   path: "/founders",
  //   component: Founder,
  // },
  // {
  //   path: "/founders/add",
  //   component: AddFounder,
  // },
  // {
  //   path: "/founder/:id",
  //   component: ViewFeed,
  // },
  // {
  //   path: "/founder/:id/edit",
  //   component: AddFounder,
  // },
  // {
  //   path: "/appointments",
  //   component: Appointments
  // },
  // {
  //   path: "/appointments/settings",
  //   component: Advisor
  // },
  // {
  //   path: "/profile",
  //   component: Profile
  // },
  // {
  //   path: "/my-adviser",
  //   component: Advisor
  // },
  // {
  //   path: "/adviser",
  //   component: Advisor
  // },

  // {
  //   path: "/adviser/:adviserId",
  //   component: Advisor
  // },
  // {
  //   path: "/tasks",
  //   component: Tasks
  // },
  // {
  //   path: "/action-list",
  //   component: Tasks
  // },
  // {
  //   path: "/action-plan",
  //   component: Tasks
  // },
  // {
  //   path: "/timelog",
  //   component: TimeLog
  // },
  // {
  //   path: "/students",
  //   component: Student
  // },
  // {
  //   path: "/students/:studentId",
  //   component: Student
  // },
  // {
  //   path: "/location",
  //   component: Location
  // },
  // {
  //   path: "/actions",
  //   component: Tasks
  // },
  // {
  //   path: "/timelog/list",
  //   component: TimeLog
  // },
  // {
  //   path: "/students/:studentId/action-list",
  //   component: Tasks
  // },
  // {
  //   path: "/destination-tracker/",
  //   component: DestinationTracker
  // },
  // {
  //   path: "/destination-tracker/:trackPath",
  //   component: DestinationTracker
  // },
  // {
  //   path: "/reports/:reportPath",
  //   component: Reports
  // }
];

export { navigationRoutes };
