export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const BASE_URL = import.meta.env.VITE_API_BASE_URL;


//verify api
export const USER_VERIFY = "/api/auth/verify";

//company
export const COMPANY_LIST = "/api/company/all";
export const FETCH_COMPANY_BY_QUERY = "/api/company/search";
export const ADD_COMPANY = "/api/company/add";
//interview experience
export const INTERVIEW_EXP_BY_COMPANYID = "/api/interviewExperience";

//user profile
export const USERPROFILE = "/api/userProfile"

//specialization path docs
export const DOCUMENTATION = "/api/documentation"


//leaderboard
export const LEADERBOARD = "/api/leaderboard"

//social handles
export const WHATSAPP_LINK = "https://chat.whatsapp.com/J3ibXsmI0tq4blRBZkNxjw"
export const INSTAGRAM_LINK = "https://www.instagram.com/the_codex_hub/"

//feedback
export const FEEDBACK = "/api/feedback"

//payments
export const PAYMENT = "/api/payments"
export const PAYMENT_STATUS = "/api/payments/user"
//cloudinary imag upload
export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/drkhfntxp/image/upload"