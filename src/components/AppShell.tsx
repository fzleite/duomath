import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { contentModules, gameModules } from '../modules/registry'
import { useActiveProfile } from '../state/store'
import { PizinhoFace } from './Pizinho'

/**
 * Casca constante do DuoMath: barra de titulo fixa no topo em todas as paginas e a navegacao
 * por assunto — barra lateral fixa em tela de computador, menu hamburguer em celular (a
 * mesma marcacao; quem decide e o CSS, nao um segundo componente).
 *
 * A outra metade da navegacao dupla sao as abas por ano escolar, que vivem no hub porque
 * so fazem sentido junto da lista de etapas daquele ano.
 */
export function AppShell({ children, showNav = true }: { children: React.ReactNode; showNav?: boolean }) {
  const profile = useActiveProfile()
  const [menuOpen, setMenuOpen] = useState(false)

  // no celular o drawer cobre a tela: clicar num item fecha, no proprio evento de navegacao
  const close = () => setMenuOpen(false)

  return (
    <div className="app">
      <header className="titlebar">
        {showNav && (
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Fechar menu de assuntos' : 'Abrir menu de assuntos'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}

        <Link to={showNav ? '/' : '/perfis'} className="brand-link">
          <PizinhoFace mood="neutro" size={30} />
          <span className="brand-name">DuoMath</span>
        </Link>

        <div className="titlebar-right">
          {profile ? (
            <Link to="/perfis" className="titlebar-profile">
              <span className="profile-initial profile-initial-xs" style={{ background: profile.color }}>
                {profile.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="titlebar-profile-name">{profile.name}</span>
            </Link>
          ) : (
            <Link to="/sobre" className="link-quiet">
              Sobre
            </Link>
          )}
        </div>
      </header>

      <div className="app-body">
        {showNav && (
          <>
            <nav className={`subject-nav ${menuOpen ? 'subject-nav-open' : ''}`} aria-label="Assuntos">
              <p className="nav-group">Assuntos</p>
              {contentModules().map((module) => (
                <div className="nav-grupo" key={module.id}>
                  <NavLink
                    to={`/modulo/${module.id}`}
                    className={({ isActive }) => `nav-item ${isActive ? 'nav-item-on' : ''}`}
                    onClick={close}
                  >
                    <span className="nav-dot" style={{ background: module.accent }} />
                    {module.title}
                    {module.status === 'soon' && <span className="badge badge-sm">em breve</span>}
                  </NavLink>
                  {/* sub-opcao ao lado dos exercícios, como o spec pede */}
                  {module.apoio?.length ? (
                    <NavLink
                      to={`/apoio/${module.id}`}
                      className={({ isActive }) => `nav-sub ${isActive ? 'nav-item-on' : ''}`}
                      onClick={close}
                    >
                      Material de apoio
                    </NavLink>
                  ) : null}
                </div>
              ))}

              <p className="nav-group">Jogos</p>
              {gameModules().map((module) => (
                <NavLink
                  key={module.id}
                  to={`/jogo/${module.id}`}
                  className={({ isActive }) => `nav-item ${isActive ? 'nav-item-on' : ''}`}
                  onClick={close}
                >
                  <span className="nav-dot" style={{ background: module.accent }} />
                  {module.title}
                </NavLink>
              ))}

              <p className="nav-group">DuoMath</p>
              <NavLink to="/responsavel" className="nav-item" onClick={close}>
                Painel do responsável
              </NavLink>
              <NavLink to="/sobre" className="nav-item" onClick={close}>
                Sobre
              </NavLink>
            </nav>

            {menuOpen && <button type="button" className="nav-backdrop" aria-hidden onClick={close} />}
          </>
        )}

        <div className="app-main">{children}</div>
      </div>
    </div>
  )
}
