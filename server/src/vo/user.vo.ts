export class UserVo {
  id: number
  username: string
  constructor(args?: Partial<UserVo>) {
    Object.assign(this, args)
  }
}

export class AccessToken extends UserVo { }

// mock 数据
export const mockUser = new UserVo({
  id: 1,
  username: 'careteen'
});
