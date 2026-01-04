import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
} from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", {
    users: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;

  //handle create user
  await handleCreateUser(name, email, address);

  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await handleDeleteUser(id);
  return res.redirect("/");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handleViewUser(id);
  return res.render("view-user", {
    id: id,
    user: user,
  });
};
const postUpdateUser = async (req: Request, res: Response) => {
  const { id, name, address, email } = req.body;
  await updateUserById(id, email, address, name);
  return res.redirect("/");
};
export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
