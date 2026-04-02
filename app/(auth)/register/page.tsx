'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import AuthLayout from '@/components/auth/AuthLayout'

export default function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.repeatPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout leftImage="/assets/images/registration.png">
      <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
      <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="_social_registration_form" onSubmit={handleSubmit}>
        <div className="row">
          {[
            { label: 'First Name', name: 'firstName', type: 'text' },
            { label: 'Last Name',  name: 'lastName',  type: 'text' },
            { label: 'Email',      name: 'email',     type: 'email' },
            { label: 'Password',   name: 'password',  type: 'password' },
            { label: 'Repeat Password', name: 'repeatPassword', type: 'password' },
          ].map(field => (
            <div className="col-xl-12" key={field.name}>
              <div className="_social_registration_form_input _mar_b14">
                <label className="_social_registration_label _mar_b8">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className="form-control _social_registration_input"
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <div className="_social_registration_form_btn _mar_t40 _mar_b60">
          <button type="submit" className="_social_registration_form_btn_link _btn1" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register now'}
          </button>
        </div>
      </form>
      <div className="_social_registration_bottom_txt">
        <p className="_social_registration_bottom_txt_para">
          Already have an account?{' '}
          <Link href="/login">Login</Link>
        </p>
      </div>
    </AuthLayout>
  )
}