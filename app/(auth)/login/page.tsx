'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/auth/AuthLayout'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await login(email, password)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout leftImage="/assets/images/login.png">
      <p className="_social_login_content_para _mar_b8">Welcome back</p>
      <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="_social_login_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Email</label>
              <input
                type="email"
                className="form-control _social_login_input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8">Password</label>
              <input
                type="password"
                className="form-control _social_login_input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="_social_login_form_btn _mar_t40 _mar_b60">
          <button type="submit" className="_social_login_form_btn_link _btn1" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login now'}
          </button>
        </div>
      </form>
      <div className="_social_login_bottom_txt">
        <p className="_social_login_bottom_txt_para">
          Don't have an account?{' '}
          <Link href="/register">Create New Account</Link>
        </p>
      </div>
    </AuthLayout>
  )
}