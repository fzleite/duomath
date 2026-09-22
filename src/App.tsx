import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell'
import { ApoioEtapa, ApoioModulo } from './screens/Apoio'
import { ExercisePlayer } from './screens/ExercisePlayer'
import { GameScreen } from './screens/GameScreen'
import { ModuleHub } from './screens/ModuleHub'
import { ParentDashboard } from './screens/ParentDashboard'
import { ProfileSelect } from './screens/ProfileSelect'
import { Sobre } from './screens/Sobre'
import { StageList } from './screens/StageList'
import { useApp } from './state/store'

/** Sem perfil ativo nao ha o que medir: toda tela de crianca passa por aqui. */
function RequireProfile({ children }: { children: React.ReactNode }) {
  const activeProfileId = useApp((s) => s.activeProfileId)
  return activeProfileId ? <>{children}</> : <Navigate to="/perfis" replace />
}

/** A casca (barra de titulo fixa + navegacao por assunto) envolve toda pagina do app. */
function Page({ children, nav = true }: { children: React.ReactNode; nav?: boolean }) {
  return <AppShell showNav={nav}>{children}</AppShell>
}

export default function App() {
  const ready = useApp((s) => s.ready)
  const init = useApp((s) => s.init)

  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <main className="screen screen-center">Carregando…</main>

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/perfis"
          element={
            <Page nav={false}>
              <ProfileSelect />
            </Page>
          }
        />
        <Route
          path="/sobre"
          element={
            <Page>
              <Sobre />
            </Page>
          }
        />
        <Route
          path="/responsavel"
          element={
            <Page>
              <ParentDashboard />
            </Page>
          }
        />
        <Route
          path="/"
          element={
            <RequireProfile>
              <Page>
                <ModuleHub />
              </Page>
            </RequireProfile>
          }
        />
        <Route
          path="/modulo/:moduleId"
          element={
            <RequireProfile>
              <Page>
                <StageList />
              </Page>
            </RequireProfile>
          }
        />
        <Route
          path="/modulo/:moduleId/:stageId"
          element={
            <RequireProfile>
              <Page>
                <ExercisePlayer />
              </Page>
            </RequireProfile>
          }
        />
        <Route
          path="/jogo/:moduleId"
          element={
            <RequireProfile>
              <Page>
                <GameScreen />
              </Page>
            </RequireProfile>
          }
        />
        {/* material de apoio: consultavel fora do fluxo de exercicio */}
        <Route
          path="/apoio/:moduleId"
          element={
            <Page>
              <ApoioModulo />
            </Page>
          }
        />
        <Route
          path="/apoio/:moduleId/:stageId"
          element={
            <Page>
              <ApoioEtapa />
            </Page>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
