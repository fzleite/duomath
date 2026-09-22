import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PizinhoFace } from '../components/Pizinho'
import { useApp } from '../state/store'

const COLORS = ['#1a936f', '#3b7ba0', '#48bfe3', '#2a9d8f', '#4c9f70', '#5aa9e6']

export function ProfileSelect() {
  const navigate = useNavigate()
  const profiles = useApp((s) => s.profiles)
  const selectProfile = useApp((s) => s.selectProfile)
  const addProfile = useApp((s) => s.addProfile)

  const [creating, setCreating] = useState(profiles.length === 0)
  const [name, setName] = useState('')
  const [guardian, setGuardian] = useState('')
  const [color, setColor] = useState(COLORS[0])

  const enter = async (profileId: string) => {
    await selectProfile(profileId)
    navigate('/')
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    const profile = await addProfile({
      name: name.trim(),
      guardian: guardian.trim() || 'Responsável',
      color,
    })
    setName('')
    setGuardian('')
    setCreating(false)
    await enter(profile.id)
  }

  return (
    <main className="screen screen-center">
      {/* o nome do produto vive na barra de titulo da casca; aqui basta a pergunta */}
      <header className="brand">
        <PizinhoFace mood="neutro" size={64} />
        <h1>Quem vai estudar hoje?</h1>
      </header>

      <div className="profile-grid">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            type="button"
            className="profile-card"
            style={{ borderColor: profile.color }}
            onClick={() => void enter(profile.id)}
          >
            <span className="profile-initial" style={{ background: profile.color }}>
              {profile.name.slice(0, 1).toUpperCase()}
            </span>
            <strong>{profile.name}</strong>
            <small>{profile.guardian}</small>
          </button>
        ))}

        {!creating && (
          <button type="button" className="profile-card profile-card-new" onClick={() => setCreating(true)}>
            <span className="profile-initial profile-initial-new">+</span>
            <strong>Novo perfil</strong>
          </button>
        )}
      </div>

      {creating && (
        <form className="card form" onSubmit={submit}>
          <h2>Novo perfil</h2>
          <label>
            <span>Nome da criança</span>
            <input value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
          </label>
          <label>
            <span>Responsável</span>
            <input
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
              placeholder="quem acompanha este perfil"
            />
          </label>
          <fieldset className="color-picker">
            <legend>Cor</legend>
            {COLORS.map((option) => (
              <button
                key={option}
                type="button"
                className={`swatch ${option === color ? 'swatch-on' : ''}`}
                style={{ background: option }}
                aria-label={`cor ${option}`}
                onClick={() => setColor(option)}
              />
            ))}
          </fieldset>
          <div className="form-actions">
            {profiles.length > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              Criar e entrar
            </button>
          </div>
        </form>
      )}

      <Link className="link-quiet" to="/responsavel">
        Painel do responsável
      </Link>
    </main>
  )
}
