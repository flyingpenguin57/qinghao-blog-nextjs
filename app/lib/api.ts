// 统一响应结构
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

// 工具类
export class ResponseUtil {
  static ok<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static fail(message: string, code: number = 500): ApiResponse<null> {
    return {
      success: false,
      message,
      code,
    };
  }
}
