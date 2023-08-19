const endpoints = {
  getPostByCategory: "/api/v1/posts/?cat=",
  getPostByID: "/api/v1/post/",
  register: "/api/auth/register",
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  getAccessToken: "/api/auth/generateAccessToken",
  createPost: "/api/v1/createPost",
  editPost: "/api/v1/editPost",
  deletePost: "/api/v1/deletePost/",
  uploadFile: "/api/v1/uploadFile"
}
export default endpoints
