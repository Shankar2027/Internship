import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { PageHeader } from '@/components/ui'
import {
  User, KeyRound, Server, Cpu, CheckCircle2, Info, Zap, Globe, RotateCcw,
  ShieldCheck, Activity, FileText, Code2
} from 'lucide-react'
import clsx from 'clsx'

export default function SettingsPage() {
  const { user, setUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'pipeline' | 'system'>('profile')

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <PageHeader title="Platform Settings" subtitle="Manage your account, API configurations, and telemetry." />

      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-48 flex-shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide min-w-full md:min-w-max flex-nowrap pr-4">
            {[
              { id: 'profile', icon: User, label: 'Identity & Access' },
              { id: 'pipeline', icon: Cpu, label: 'RAG Pipeline' },
              { id: 'system', icon: Server, label: 'System Telemetry' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0',
                  activeTab === id
                    ? 'bg-brand-indigo text-white shadow-glow-indigo'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover bg-bg-secondary md:bg-transparent'
                )}
              >
                <Icon className={clsx("w-4 h-4 flex-shrink-0", activeTab === id ? "text-white" : "text-brand-indigo-light")} /> {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 w-full">
          {activeTab === 'profile' && <ProfileSettings user={user} setUser={setUser} />}
          {activeTab === 'pipeline' && <PipelineSettings />}
          {activeTab === 'system' && <SystemInfo />}
        </div>
      </div>
    </div>
  )
}

function ProfileSettings({ user, setUser }: { user: any; setUser: (u: any) => void }) {
  const [form, setForm] = useState({ full_name: user?.full_name || '', email: user?.email || '' })
  const [pwForm, setPwForm] = useState({ current: '', new: '', confirm: '' })
  const [pwResetSent, setPwResetSent] = useState(false)

  const handlePwReset = () => setPwForm({ current: '', new: '', confirm: '' })

  const handleForgotPassword = () => {
    // Trigger your forgot-password flow here (e.g. send reset email)
    setPwResetSent(true)
    setTimeout(() => setPwResetSent(false), 4000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
      {/* Profile Card */}
      <div className="card p-5 md:p-6 w-full">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-brand-indigo-light flex-shrink-0" />
          <h2 className="font-bold text-text-primary text-lg tracking-tight">Profile Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input className="input" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Email address</label>
            <input type="email" className="input bg-bg-primary/50 text-text-muted" value={form.email} disabled />
          </div>
        </div>
      </div>

      {/* Security Card — improved password reset */}
      <div className="card p-5 md:p-6 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-brand-indigo-light flex-shrink-0" />
            <h2 className="font-bold text-text-primary text-lg tracking-tight">Security & Passwords</h2>
          </div>
          <button
            onClick={handlePwReset}
            className="text-xs flex items-center gap-1.5 text-text-muted hover:text-brand-red transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            className="input"
            placeholder="Current password"
            value={pwForm.current}
            onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
          />
          <input
            type="password"
            className="input"
            placeholder="New password"
            value={pwForm.new}
            onChange={(e) => setPwForm({ ...pwForm, new: e.target.value })}
          />
          <input
            type="password"
            className="input"
            placeholder="Confirm new password"
            value={pwForm.confirm}
            onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
          />

          {/* Action row: Save + Reset Password button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-indigo text-white text-sm font-semibold hover:bg-brand-indigo/90 transition-colors shadow-glow-indigo"
            >
              <ShieldCheck className="w-4 h-4" />
              Save Password
            </button>

            <button
              onClick={handleForgotPassword}
              className={clsx(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                pwResetSent
                  ? 'border-brand-green/40 text-brand-green bg-brand-green/10'
                  : 'border-bg-border text-text-secondary hover:text-text-primary hover:border-brand-indigo/40 hover:bg-bg-hover'
              )}
            >
              {pwResetSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Reset link sent!
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" /> Reset via Email
                </>
              )}
            </button>
          </div>

          <div className="p-3 bg-brand-indigo-dim/50 border border-brand-indigo/20 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-brand-indigo-light flex-shrink-0 mt-0.5" />
            <p className="text-text-muted text-xs leading-relaxed">
              Use <span className="text-brand-indigo-light font-medium">Reset via Email</span> to receive a secure password reset link to your registered address.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PipelineSettings() {
  const [settings, setSettings] = useState({
    embedding_model: 'all-MiniLM-L6-v2',
    chunk_size: 512,
    chunk_overlap: 50,
    top_k: 15,
    rerank_top_n: 5,
    llm_provider: 'ollama',
    llm_model: 'llama3.2',
  })
  const set = (k: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setSettings((s) => ({ ...s, [k]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
      <div className="card p-5 md:p-6 w-full">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="w-5 h-5 text-brand-cyan flex-shrink-0" />
          <h2 className="font-bold text-text-primary text-lg tracking-tight">Embedding Engine</h2>
        </div>
        <div className="space-y-5">
          <select className="input cursor-pointer" value={settings.embedding_model} onChange={set('embedding_model')}>
            <option value="all-MiniLM-L6-v2">all-MiniLM-L6-v2 (Fast)</option>
            <option value="all-mpnet-base-v2">all-mpnet-base-v2 (Accurate)</option>
          </select>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input type="number" className="input" value={settings.chunk_size} onChange={set('chunk_size')} placeholder="Chunk Size" />
            <input type="number" className="input" value={settings.chunk_overlap} onChange={set('chunk_overlap')} placeholder="Overlap" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SystemInfo() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { dashboardApi } = await import('@/api/dashboard')
      return dashboardApi.getStats()
    },
  })

  const cards = [
    {
      icon: Code2,
      label: 'Frontend',
      value: 'React 18 + Vite',
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10',
      border: 'border-brand-cyan/20',
    },
    {
      icon: Server,
      label: 'Backend',
      value: 'FastAPI',
      color: 'text-brand-indigo-light',
      bg: 'bg-brand-indigo-dim/50',
      border: 'border-brand-indigo/20',
    },
    {
      icon: FileText,
      label: 'Documents',
      value: stats?.total_documents ?? '0',
      color: 'text-brand-green',
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/20',
    },
    {
      icon: Activity,
      label: 'Status',
      value: 'Operational',
      color: 'text-brand-green',
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/20',
    },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full space-y-4">
      {/* Header */}
      <div className="card px-5 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-brand-indigo-light flex-shrink-0" />
          <h2 className="font-bold text-text-primary text-lg tracking-tight">System Telemetry</h2>
        </div>
        <span className="badge bg-brand-green/10 text-brand-green border border-brand-green/20 px-3 py-1.5 text-xs font-semibold rounded-full">
          Operational
        </span>
      </div>

      {/*
        Mobile: horizontal scroll row of compact cards
        Desktop: 2-column grid
      */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
        {cards.map(({ icon: Icon, label, value, color, bg, border }) => (
          <div
            key={label}
            className={clsx(
              // mobile: fixed-width card that snaps; desktop: full width in grid
              'flex-shrink-0 w-[160px] snap-start md:w-auto',
              'card p-4 border flex flex-col gap-3 transition-all hover:shadow-md',
              border
            )}
          >
            <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', bg)}>
              <Icon className={clsx('w-4 h-4', color)} />
            </div>
            <div className="min-w-0">
              <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest mb-1 truncate">{label}</p>
              <p className={clsx('text-sm font-mono font-semibold truncate', color)}>{String(value)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}