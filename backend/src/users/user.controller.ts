import { Request, Response } from 'express';
import { UserService } from './user.service';
import { createUserSchema, updateUserSchema } from './user.model';
import { asyncHandler, CustomError } from '../middlewares/errorHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Create new user
  createUser = asyncHandler(async (req: Request, res: Response) => {
    // Validate input
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const user = await this.userService.createUser(value);

    res.status(201).json({
      success: true,
      message: 'משתמש נוצר בהצלחה',
      data: user,
    });
  });

  // Get all users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    res.json({
      success: true,
      message: 'רשימת המשתמשים נטענה בהצלחה',
      data: users,
      count: users.length,
    });
  });

  // Get user by ID
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new CustomError('מזהה משתמש לא תקין', 400);
    }

    const user = await this.userService.getUserById(userId);

    res.json({
      success: true,
      message: 'משתמש נמצא בהצלחה',
      data: user,
    });
  });

  // Update user
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new CustomError('מזהה משתמש לא תקין', 400);
    }

    // Validate input
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const user = await this.userService.updateUser(userId, value);

    res.json({
      success: true,
      message: 'משתמש עודכן בהצלחה',
      data: user,
    });
  });

  // Delete user
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new CustomError('מזהה משתמש לא תקין', 400);
    }

    await this.userService.deleteUser(userId);

    res.json({
      success: true,
      message: 'משתמש נמחק בהצלחה',
    });
  });

  // Get user with learning history
  getUserWithHistory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      throw new CustomError('מזהה משתמש לא תקין', 400);
    }

    const user = await this.userService.getUserWithHistory(userId);

    res.json({
      success: true,
      message: 'היסטוריית למידה נטענה בהצלחה',
      data: user,
    });
  });

  // Login or get user by phone
  loginOrGetUser = asyncHandler(async (req: Request, res: Response) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    // Try to find existing user by phone
    let user = await this.userService.getUserByPhone(value.phone);

    // If user doesn't exist, create new one
    if (!user) {
      user = await this.userService.createUser(value);
    }

    res.json({
      success: true,
      message: user ? 'משתמש נמצא בהצלחה' : 'משתמש נוצר בהצלחה',
      data: user,
    });
  });
}