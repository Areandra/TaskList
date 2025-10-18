import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(1).maxLength(255),
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().minLength(8),
    role: vine.enum(['admin', 'user']),
  })
)

export const createUserMessages = {
  'username.required': 'Nama wajib diisi',
  'username.minLength': 'Nama minimal 1 karakter',
  'username.maxLength': 'Nama maksimal 255 karakter',

  'email.required': 'Email wajib diisi',
  'email.email': 'Email tidak valid',
  'email.maxLength': 'Email maksimal 255 karakter',

  'password.required': 'Password wajib diisi',
  'password.minLength': 'Password minimal 6 karakter',

  'role.required': 'Role wajib diisi',
  'role.enum': 'Role harus salah satu dari admin atau user',
}