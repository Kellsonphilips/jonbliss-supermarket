import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const socialProviders = [
  { name: 'Google', id: 'google', color: 'bg-white text-gray-800 border', icon: (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.9 0 5.5 1 7.6 2.7l6.4-6.4C34.1 6.5 29.3 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c10.7 0 20-8.7 20-20 0-1.3-.1-2.7-.3-4z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14.5 24 14.5c2.9 0 5.5 1 7.6 2.7l6.4-6.4C34.1 6.5 29.3 4.5 24 4.5c-6.6 0-12 5.4-12 12 0 1.4.2 2.7.6 3.9z" fill="#FF3D00"/><path d="M24 45.5c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4C29.5 36.1 26.9 37 24 37c-5.7 0-10.5-3.7-12.2-8.8l-7 5.4C7.9 41.7 15.4 45.5 24 45.5z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C15.1 42.9 19.2 45.5 24 45.5c10.7 0 20-8.7 20-20 0-1.3-.1-2.7-.3-4z" fill="#1976D2"/></g></svg>
  ) },
  { name: 'Apple', id: 'apple', color: 'bg-black text-white', icon: (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M16.365 1.43c0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07zm4.13 4.13c-.41-.41-1.08-.41-1.49 0l-1.06 1.06c-.41.41-.41 1.08 0 1.49.41.41 1.08.41 1.49 0l1.06-1.06c.41-.41.41-1.08 0-1.49zm-8.26 0c-.41.41-.41 1.08 0 1.49l1.06 1.06c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49l-1.06-1.06c-.41-.41-1.08-.41-1.49 0zm8.26 8.26c.41-.41.41-1.08 0-1.49l-1.06-1.06c-.41-.41-1.08-.41-1.49 0-.41.41-.41 1.08 0 1.49l1.06 1.06c.41.41 1.08.41 1.49 0zm-8.26 0c.41-.41 1.08-.41 1.49 0l1.06 1.06c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49l-1.06-1.06c-.41-.41-1.08-.41-1.49 0zm4.13 4.13c0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07 0 1.14-.93 2.07-2.07 2.07-1.14 0-2.07-.93-2.07-2.07zm-4.13 0c0 1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07 0 1.14-.93 2.07-2.07-2.07-1.14 0-2.07.93-2.07 2.07z"/></svg>
  ) },
  { name: 'Microsoft', id: 'microsoft', color: 'bg-primary text-white', icon: (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#F35325" d="M1.5 1.5h10v10h-10z"/><path fill="#81BC06" d="M12.5 1.5h10v10h-10z"/><path fill="#05A6F0" d="M1.5 12.5h10v10h-10z"/><path fill="#FFBA08" d="M12.5 12.5h10v10h-10z"/></svg>
  ) },
];

export default function AdminLogin() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      setError('Invalid email or password');
    } else {
      setError(null);
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-xl w-full max-w-md" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Admin Login</h1>
        <form className="space-y-4" onSubmit={handleCredentialsLogin}>
          <input name="email" type="email" placeholder="Email" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white/60" />
          <input name="password" type="password" placeholder="Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white/60" />
          <button type="submit" className="w-full bg-primary/80 text-white py-2 rounded hover:bg-red-orange/90 transition shadow">Login</button>
        </form>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        <div className="my-6 flex items-center justify-center gap-2">
          <span className="h-px flex-1 bg-gray-300" />
          <span className="text-gray-500 text-sm">or continue with</span>
          <span className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="flex flex-col gap-3">
          {socialProviders.map(({ name, id, color, icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => signIn(id)}
              className={`flex items-center justify-center py-2 rounded shadow ${color} hover:opacity-90 transition font-medium`}
            >
              {icon} Continue with {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 