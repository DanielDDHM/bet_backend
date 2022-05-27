import { AddressFinder, AppError, PasswordCrypt } from "../helpers";
import { prisma } from "../config";
import { usersCreateValidation } from "../validations";
import { StatusCode, UserCreateDTO, UserUpdateDTO, UserPatchDTO, UserDeleteDTO, UserGetDTO } from "../types";
export default class UserService {
  params: UserCreateDTO | UserUpdateDTO
  constructor(params: UserCreateDTO | UserUpdateDTO) {
    this.params = params
  }

  async get(params = this.params) {
    const { email, nick } = params
    try {
      const user = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { nick }
          ]
        }
      });
      return user
    } catch (error: any) {
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  async createService(params = this.params) {
    try {
      const {
        name,
        nick,
        password,
        contact,
        email,
        address,
        // photo,
        // isActive,
        // isConfirmed,
        // isStaff,
      } = usersCreateValidation.parse(params)

      const { zipCode, streetNumber } = address
      const [existUser, existAddress] = await Promise.all([
        await prisma.users.findFirst({
          where: {
            OR: [
              { email },
              { nick }
            ]
          }
        }),
        await prisma.address.findFirst({
          where: {
            zipCode,
            streetNumber
          }
        })
      ])

      console.log(existAddress)

      if (existUser) {
        throw new AppError('USER EXISTS', StatusCode.BAD_REQUEST)
      }

      if (!existAddress) {
        const { data } = await new AddressFinder(address.zipCode).check()
        const { logradouro, bairro, localidade, uf } = data
        const addressCreated = await prisma.address.create({
          data: {
            ...address,
            street: logradouro,
            neighborhood: bairro,
            city: localidade,
            state: uf
          }
        });
        const userCreated = await prisma.users.create({
          data: {
            name,
            nick,
            password: await new PasswordCrypt(password).crypt(),
            email,
            contact,
            addressId: addressCreated.id
          }
        });
        return userCreated
      }

      const userCreated = await prisma.users.create({
        data: {
          name,
          nick,
          password: await new PasswordCrypt(password).crypt(),
          email,
          contact,
          addressId: existAddress.id
        }
      });
      return userCreated
    } catch (error: any) {
      if (error instanceof AppError) throw new AppError(String(error.message), error.statusCode)
      throw new AppError(String(error.message), StatusCode.INTERNAL_SERVER_ERROR)
    }
  }

  // TODO: Terminar user services
  async create(params = this.params) {
    console.log('create')
  }

  async update(params = this.params) {
    console.log('update')
  }

  async patch(params = this.params) {
    console.log('patch')
  }

  async delete(params = this.params) {
    console.log('delete')
  }

}
