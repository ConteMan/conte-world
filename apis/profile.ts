export default new class Profile {
  async index(): Promise<Profile.Data> {
    const res = await useHttp('/profile')
    return res.data ?? {}
  }
}